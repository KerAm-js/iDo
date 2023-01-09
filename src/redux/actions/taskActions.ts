import { TaskType, TimeType } from "./../types/task";
import {
  CHOOSE_TASK_TO_EDIT,
  COMPLETE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_TIME,
  UPDATE_TASK_REMIND_TIME,
  SET_TASK_EXPIRATION,
  UPDATE_TASKS,
  SET_DEFAULT_NEW_TASK_DATA,
  CALENDAR_CHOOSED_DATE,
  CLEAR_REMINDER,
  UPDATE_POSITIONS,
} from "./../constants/task";
import { Dispatch } from "@reduxjs/toolkit";
import { ADD_TASK } from "../constants/task";
import { LocalDB } from "../../backend/sqlite/sqlite";
import {
  deleteAllNotifications,
  deleteNotification,
  setNotification,
} from "../../native/notifications";
import { store } from "../store";
import { toLocaleStateString } from "../../utils/date";
import { ListObject } from "../../types/global/ListObject";
import { getPositionsFromAS } from "../../backend/asyncStorage/positions";

export const scheduleTaskExpiration = async (
  task: TaskType,
  dispatch: Dispatch
) => {
  try {
    if (!task.isExpired) {
      const currTime = new Date().valueOf();
      const isCompletedInTime =
        task.isCompleted &&
        task.completionTime &&
        task.completionTime < task.time;

      if (!isCompletedInTime && !task.isExpired && task.time <= currTime) {
        await LocalDB.setTaskExpiration(task.id);
        dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
      } else {
        const timeDiff = task.time - currTime;
        setTimeout(async () => {
          console.log("time is outed");
          const expiredTask = store.getState().tasks.tasks.find((item) => {
            const isItemCompletedInTime =
              item.completionTime && item.completionTime < item.time;
            return (
              item.id === task.id &&
              !item.isExpired &&
              !isItemCompletedInTime &&
              task.time === item.time
            );
          });
          if (expiredTask) {
            console.log("expired");
            await LocalDB.setTaskExpiration(expiredTask?.id);
            dispatch({ type: SET_TASK_EXPIRATION, id: expiredTask.id });
          }
        }, timeDiff);
      }
    }
  } catch (error) {
    console.log("scheduleTaskExpiration", error);
  }
};

export const loadTasksFromLocalDB = () => async (dispatch: Dispatch) => {
  try {
    const currDate = new Date().setHours(0, 0, 0, 0);
    const tasks = await LocalDB.getTasks();
    console.log(tasks.map((task) => [task.task, task.isExpired]));
    await deleteAllNotifications();
    const notificationsUpdatedTasks = await Promise.all(
      tasks.map(async (task) => {
        await scheduleTaskExpiration(task, dispatch);
        const notificationId = await scheduleReminder(
          task,
          dispatch,
          task.notificationId
        );
        return {
          ...task,
          notificationId,
        };
      })
    );
    const filteredTasks = notificationsUpdatedTasks.filter(
      (task) => task.time >= currDate || !task.isCompleted
    );
    filteredTasks.reverse();
    dispatch({ type: UPDATE_TASKS, tasks: filteredTasks });
  } catch (error) {
    console.log("getTasksFromLocalDB", error);
  }
};

export const scheduleReminder = async (
  task: TaskType,
  dispatch: Dispatch,
  oldNotificationId?: string
): Promise<string | undefined> => {
  if (oldNotificationId) {
    await deleteNotification(oldNotificationId);
  }
  if (task.remindTime) {
    const currentDate = new Date().valueOf();
    const notificationTime = Math.round((task.remindTime - currentDate) / 1000);
    const { language } = store.getState().prefs;
    if (notificationTime > 0) {
      const notificationId = await setNotification(
        "🔔 " + task.task,
        `⏰ ${toLocaleStateString({
          dateValue: task.time,
          timeType: task.timeType,
          language,
        })}`,
        notificationTime
      );
      setTimeout(() => {
        dispatch({
          type: CLEAR_REMINDER,
          id: task.id,
          remindTime: task.remindTime,
        });
      }, notificationTime * 1000);
      return notificationId;
    } else {
      await LocalDB.clearTaskReminder(task.id);
      dispatch({
        type: CLEAR_REMINDER,
        id: task.id,
        remindTime: task.remindTime,
      });
      return undefined;
    }
  }
};

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  try {
    const taskId = await LocalDB.addTask(task);
    const addedTask: TaskType = { ...task, id: taskId };
    await scheduleTaskExpiration(addedTask, dispath);
    const notificationId = await scheduleReminder(task, dispath);
    addedTask.notificationId = notificationId;
    dispath({ type: ADD_TASK, task: addedTask });
  } catch (error) {
    console.log("addTaskAction", error);
  }
};

export const editTaskAction =
  (task: TaskType, oldNotificationId?: string) =>
  async (dispatch: Dispatch) => {
    try {
      await LocalDB.editTask(task);
      await scheduleTaskExpiration(task, dispatch);
      const notificationId = await scheduleReminder(
        task,
        dispatch,
        oldNotificationId
      );
      dispatch({ type: EDIT_TASK, task: { ...task, notificationId } });
    } catch (error) {
      console.log("editTaskAction", error);
    }
  };

export const deleteTaskAction =
  (id: number, notificationId?: string) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.deleteTask(id);
      if (notificationId) {
        await deleteNotification(notificationId);
      }
      dispatch({ type: DELETE_TASK, id });
    } catch (error) {
      console.log("deleteTaskAction", error);
    }
  };

export const updateNewTaskTimeAction =
  (time: number, timeType: TimeType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_TIME, time, timeType });
  };

export const updateNewTaskRemindTimeAction =
  (remindTime: number | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_REMIND_TIME, remindTime });
  };

export const setDefaultNewTaskDataAction = () => (dispatch: Dispatch) => {
  dispatch({ type: SET_DEFAULT_NEW_TASK_DATA });
};

export const chooseCalendarDate =
  (value: number | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: CALENDAR_CHOOSED_DATE, calendarChoosedDate: value });
  };

export const chooseTaskToEditAction =
  (task: TaskType | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: CHOOSE_TASK_TO_EDIT, task });
  };

export const completeTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      const isCompleted = task.isCompleted ? 0 : 1;
      const completionTime = isCompleted ? new Date().valueOf() : null;
      const isExpired = isCompleted
        ? task.isExpired
        : new Date().valueOf() > task.time
        ? 1
        : 0;
      await LocalDB.completeTask(
        task.id,
        isCompleted,
        isExpired,
        completionTime
      );
      dispatch({
        type: COMPLETE_TASK,
        id: task.id,
        isCompleted,
        isExpired,
        completionTime,
      });
    } catch (error) {
      console.log("completeTaskAction", error);
    }
  };

export const updatePositionsAction =
  (positions: ListObject) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_POSITIONS, positions });
  };

export const loadPositionsFromASAction = () => async (dispatch: Dispatch) => {
  const positions = await getPositionsFromAS();
  if (positions) {
    dispatch({ type: UPDATE_POSITIONS, positions });
  }
};
