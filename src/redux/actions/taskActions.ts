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
import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { Dispatch } from "@reduxjs/toolkit";
import { ADD_TASK, UPDATE_GESTURE_POSITIONS } from "../constants/task";
import { LocalDB } from "../../backend/sqlite";

export const getTasksFromLocalDB = () => async (dispatch: Dispatch) => {
  const tasks = await LocalDB.getTasks();
  dispatch({ type: UPDATE_TASKS, tasks });
  tasks.forEach(task => scheduleTaskExpiration(task, dispatch));
}

export const scheduleTaskExpiration = (task: TaskType, dispatch: Dispatch) => {
  if (!task.isExpired) {
    const currTime = new Date().valueOf();
    const timeToCheck = task.completionTime ? task.completionTime : task.time;

    if (timeToCheck <= currTime) {
      dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
    } else {
      const timeDiff = timeToCheck- currTime;
      setTimeout(() => {
        dispatch({ type: SET_TASK_EXPIRATION, id: task.id });
      }, timeDiff);
    }
  }
};

export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  const taskId = await LocalDB.addTask(task)
  const addedTask: TaskType = { ...task, id: taskId };
  if (task.remindTime) {
    const currentDate = new Date().valueOf();
    const notificationTime = Math.round((task.remindTime - currentDate) / 1000);
    // const notificationId = await setNotification(
    //   "Напоминание",
    //   `${task.task}`,
    //   notificationTime
    // );
  }
  scheduleTaskExpiration(addedTask, dispath);
  dispath({ type: ADD_TASK, task: addedTask });
};

export const editTaskAction = (task: TaskType) => async (dispatch: Dispatch) => {
  scheduleTaskExpiration(task, dispatch);
  dispatch({ type: EDIT_TASK, task });
};

export const deleteTaskAction = (id: string) => async (dispatch: Dispatch) => {
  await LocalDB.deleteTask(id);
  dispatch({ type: DELETE_TASK, id });
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

export const completeTaskAction = (task: TaskType) => async (dispatch: Dispatch) => {
  const isCompleted = task.isCompleted ? 0 : 1;
  const completionTime = isCompleted ? new Date().valueOf() : null; // it is needed to set the same time to redux store and local db;
  const isExpired = isCompleted ? task.isExpired : (new Date().valueOf() > task.time ? 1 : 0); 

  await LocalDB.completeTask(task.id, isCompleted, isExpired, completionTime);
  dispatch({ type: COMPLETE_TASK, id: task.id, isCompleted, isExpired, completionTime });
};

export const updateGesturePositionsAction =
  (positions: GesturePositionsType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_GESTURE_POSITIONS, positions });
  };
