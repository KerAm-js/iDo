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
  UPDATE_POSITIONS,
  SET_IS_NEW_TASK_REGULAR,
} from "./../constants/task";
import { Dispatch } from "@reduxjs/toolkit";
import { ADD_TASK } from "../constants/task";
import { LocalDB } from "../../backend/sqlite/sqlite";
import {
  deleteAllNotifications,
  deleteNotification,
  presentNotification,
  setNotification,
} from "../../native/notifications";
import { store } from "../store";
import { getNextDate, toLocaleStateString } from "../../utils/date";
import { ListObject } from "../../types/global/ListObject";
import { getPositionsFromAS } from "../../backend/asyncStorage/positions";
import { languageTexts } from "../../utils/languageTexts";

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
        await addRegularTask(dispatch, task);
      } else {
        const timeDiff = task.time - currTime;
        setTimeout(() => {
          const currentTask = store.getState().tasks.tasks.find((item) => {
            return item.id === task.id;
          });
          if (currentTask) {
            const isItemCompletedInTime =
              currentTask.completionTime &&
              currentTask.completionTime < currentTask.time;
            const isExpired =
              !currentTask.isExpired &&
              task.time === currentTask.time &&
              !isItemCompletedInTime;
            const isTaskUpdated =
              currentTask.task === task.task &&
              currentTask.description === task.description &&
              currentTask.remindTime === task.remindTime &&
              currentTask.time === task.time &&
              currentTask.timeType === task.timeType &&
              currentTask.folderId === task.folderId;

            if (currentTask.isRegular && isTaskUpdated) {
              addRegularTask(dispatch, currentTask);
            }
            if (isExpired) {
              LocalDB.setTaskExpiration(currentTask?.id);
              dispatch({ type: SET_TASK_EXPIRATION, id: currentTask.id });
            }
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

    await deleteAllNotifications();
    const notificationsUpdatedTasks = await Promise.all(
      tasks.map(async (task) => {
        await scheduleTaskExpiration(task, dispatch);
        const notificationId = await scheduleReminder(
          task,
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
        task.task,
        "",
        `${toLocaleStateString({
          defaultDate: task.remindTime,
          dateValue: task.time,
          timeType: task.timeType,
          language,
        })}`,
        notificationTime
      );
      return notificationId;
    }
  }
};

export const addRegularTask = async (dipatch: Dispatch, task: TaskType) => {
  try {
    const time = getNextDate(task.time);
    const remindTime = task.remindTime
      ? getNextDate(task.remindTime)
      : undefined;
    const regularTask: TaskType = {
      ...task,
      time,
      remindTime,
      isRegular: 1,
      completionTime: undefined,
      isCompleted: 0,
      isExpired: time > new Date().valueOf() ? 0 : 1,
    }
    await addTask(dipatch, regularTask, false);
  } catch (error) {
    console.log("addRegularTask");
  }
};

export const addTask = async (dispath: Dispatch, addedTask: TaskType, isTaskAddingAnimated?: boolean) => {
  const taskId = await LocalDB.addTask(addedTask);
  if (taskId) {
    addedTask.id = taskId;
    await scheduleTaskExpiration(addedTask, dispath);
    const notificationId = await scheduleReminder(addedTask);
    addedTask.notificationId = notificationId;
    dispath({
      type: ADD_TASK,
      task: addedTask,
      isTaskAddingAnimated
    });
  }
};

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  try {
    const addedTask: TaskType = { ...task };
    await addTask(dispath, addedTask, true);
    if (addedTask.isRegular) {
      const { language } = store.getState().prefs;
      const { title, body } =
        languageTexts[language].notifications.regularTaskIsAdded;
      presentNotification(title, `"${addedTask.task}"`, body);
    }
  } catch (error) {
    console.log("addTaskAction", error);
  }
};

export const editTaskAction =
  (editedTask: TaskType, prevTask: TaskType) =>
  async (dispatch: Dispatch) => {
    try {
      await LocalDB.editTask(editedTask);
      const { language } = store.getState().prefs;
      if (editedTask.isRegular && !prevTask.isRegular) {
        const { title, body } =
          languageTexts[language].notifications.regularTaskIsAdded;
        presentNotification(title, `"${editedTask.task}"`, body);
      } else if (!editedTask.isRegular && prevTask.isRegular && !prevTask.isExpired) {
        const { title } =
        languageTexts[language].notifications.regularTaskRemoved;
        presentNotification(title, `"${editedTask.task}"`, '');
      }
      await scheduleTaskExpiration(editedTask, dispatch);
      const notificationId = await scheduleReminder(
        editedTask,
        prevTask.notificationId
      );
      dispatch({ type: EDIT_TASK, task: { ...editedTask, notificationId } });
    } catch (error) {
      console.log("editTaskAction", error);
    }
  };

export const deleteTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.deleteTask(task.id);
      const { language } = store.getState().prefs;
      if (task.notificationId) {
        await deleteNotification(task.notificationId);
      }
      if (task.isRegular && !task.isExpired) {
        const { title } =
        languageTexts[language].notifications.regularTaskRemoved;
        presentNotification(title, '', `"${task.task}"`);
      }
      dispatch({ type: DELETE_TASK, task });
    } catch (error) {
      console.log("deleteTaskAction", error);
    }
  };

export const updateNewTaskTimeAction =
  (time: number, timeType: TimeType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_TIME, time, timeType });
  };

export const setIsNewTaskRegularAction =
  (isRegular: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_IS_NEW_TASK_REGULAR, isRegular });
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
