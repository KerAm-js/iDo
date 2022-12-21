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
} from "./../constants/task";
import { Dispatch } from "@reduxjs/toolkit";
import { ADD_TASK, UPDATE_GESTURE_POSITIONS } from "../constants/task";
import { LocalDB } from "../../backend/sqlite/sqlite";
import { getGesturePositionsFromAS } from "../../backend/asyncStorage/gesturePositions";
import { deleteNotification, setNotification } from "../../native/notifications";
import { store } from "../store";
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
      } else {
        const timeDiff = task.time - currTime;
        setTimeout(() => {
          dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
        }, timeDiff);
      }
    }
  } catch (error) {
    console.log('scheduleTaskExpiration', error);
  }
};

export const getTasksFromLocalDB = () => async (dispatch: Dispatch) => {
  try {
    const currDate = new Date().setHours(0, 0, 0, 0);
    const tasks = await LocalDB.getTasks();
    tasks.reverse();
    const filteredTasks = tasks.filter(
      (task) => task.time >= currDate || !task.isCompleted
    );
    dispatch({ type: UPDATE_TASKS, tasks: filteredTasks });
    filteredTasks.forEach((task) => {
      scheduleTaskExpiration(task, dispatch);
      scheduleReminder(task);
    });
  } catch (error) {
    console.log('getTasksFromLocalDB', error);
  }
};

export const scheduleReminder = async (task: TaskType, oldNotificationId?: string): Promise<string | undefined> => {
  if (task.remindTime) {
    const currentDate = new Date().valueOf();
    const notificationTime = Math.round(
      (task.remindTime - currentDate) / 1000
    );
    if (oldNotificationId) {
      await deleteNotification(oldNotificationId);
    }
    const { language } = store.getState().prefs
    const notificationId = await setNotification(
      languageTexts[language].notifications.taskReminder.title,
      `${task.task}`,
      notificationTime
    );
    return notificationId
  }
}

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  try {
    const taskId = await LocalDB.addTask(task);
    const addedTask: TaskType = { ...task, id: taskId };
    await scheduleTaskExpiration(addedTask, dispath);
    const notificationId = await scheduleReminder(task);
    addedTask.notificationId = notificationId;
    dispath({ type: ADD_TASK, task: addedTask });
  } catch (error) {
    console.log('addTaskAction', error)
  }
};

export const editTaskAction = (task: TaskType, oldNotificationId?: string) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.editTask(task);
      await scheduleTaskExpiration(task, dispatch);
      const notificationId = await scheduleReminder(task, oldNotificationId);
      dispatch({ type: EDIT_TASK, task: { ...task, notificationId } });
    } catch (error) {
      console.log('editTaskAction', error);
    }
  };

export const deleteTaskAction = (id: number, notificationId?: string) => async (dispatch: Dispatch) => {
  try {
    await LocalDB.deleteTask(id);
    if (notificationId) {
      await deleteNotification(notificationId);
    }
    dispatch({ type: DELETE_TASK, id });
  } catch (error) {
    console.log('deleteTaskAction', error);
  }
};

export const updateNewTaskTimeAction = (time: number, timeType: TimeType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_TIME, time, timeType });
  };

export const updateNewTaskRemindTimeAction = (remindTime: number) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_REMIND_TIME, remindTime });
  };

export const chooseTaskToEditAction = (task: TaskType | undefined) => (dispatch: Dispatch) => {
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
      console.log('completeTaskAction', error);
    }
  };

export const getGesturePositionsFromASAction =
  () => async (dispatch: Dispatch) => {
    try {
      const positions = await getGesturePositionsFromAS();
      dispatch({ type: UPDATE_GESTURE_POSITIONS, positions });
    } catch (error) {
      console.log('getGesturePositionsFromASAction', error);
    }
  };
