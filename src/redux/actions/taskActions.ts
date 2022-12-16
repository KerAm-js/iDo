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
import { LocalDB } from "../../backend/sqlite";
import { getGesturePositionsFromAS } from "../../utils/section/gesturePostions";

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
    console.log(error);
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
    filteredTasks.forEach((task) => scheduleTaskExpiration(task, dispatch));
  } catch (error) {
    console.log(error);
  }
};

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  try {
    const taskId = await LocalDB.addTask(task);
    const addedTask: TaskType = { ...task, id: taskId };
    if (task.remindTime) {
      const currentDate = new Date().valueOf();
      const notificationTime = Math.round(
        (task.remindTime - currentDate) / 1000
      );
      // const notificationId = await setNotification(
      //   "Напоминание",
      //   `${task.task}`,
      //   notificationTime
      // );
    }
    await scheduleTaskExpiration(addedTask, dispath);
    dispath({ type: ADD_TASK, task: addedTask });
  } catch (error) {}
};

export const editTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      await LocalDB.editTask(task);
      scheduleTaskExpiration(task, dispatch);
      dispatch({ type: EDIT_TASK, task });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteTaskAction = (id: number) => async (dispatch: Dispatch) => {
  try {
    await LocalDB.deleteTask(id);
    dispatch({ type: DELETE_TASK, id });
  } catch (error) {
    console.log(error);
  }
};

export const updateNewTaskTimeAction =
  (time: number, timeType: TimeType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_TIME, time, timeType });
  };

export const updateNewTaskRemindTimeAction =
  (remindTime: number) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_REMIND_TIME, remindTime });
  };

export const chooseTaskToEditAction =
  (task: TaskType | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: CHOOSE_TASK_TO_EDIT, task });
  };

export const completeTaskAction =
  (task: TaskType) => async (dispatch: Dispatch) => {
    try {
      const isCompleted = task.isCompleted ? 0 : 1;
      const completionTime = isCompleted ? new Date().valueOf() : null; // it is needed to set the same time to redux store and local db;
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
      console.log(error);
    }
  };

export const getGesturePositionsFromAsyncStorage =
  () => async (dispatch: Dispatch) => {
    try {
      const positions = await getGesturePositionsFromAS();
      dispatch({ type: UPDATE_GESTURE_POSITIONS, positions });
    } catch (error) {
      console.log(error);
    }
  };
