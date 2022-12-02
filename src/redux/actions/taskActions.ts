import { TaskType, TimeType } from "./../types/task";
import {
  CHOOSE_TASK_TO_EDIT,
  COMPLETE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_TIME,
  UPDATE_TASK_REMIND_TIME,
} from "./../constants/task";
import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { Dispatch } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  UPDATE_GESTURE_POSITIONS,
} from "../constants/task";
import { setNotification } from "../../native/notifications";


export const addTaskAction = (task: TaskType) => async (dispath: Dispatch) => {
  if (task.remindTime) {
    const currentDate = new Date().valueOf();
    const notificationTime = Math.round((task.remindTime - currentDate) / 1000);
    // const notificationId = await setNotification(
    //   "Напоминание", 
    //   `${task.task}`, 
    //   notificationTime
    // );
  }
  dispath({ type: ADD_TASK, task });
};

export const deleteTaskAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TASK, id });
};

export const editTaskAction = (task: TaskType) => (dispatch: Dispatch) => {
  dispatch({ type: EDIT_TASK, task });
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

export const completeTaskAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: COMPLETE_TASK, id, });
};

export const updateGesturePositionsAction = (positions: GesturePositionsType) => (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_GESTURE_POSITIONS, positions });
};
