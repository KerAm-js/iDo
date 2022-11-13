import { TaskData } from "./../types/task";
import {
  CHOOSE_TASK_TO_EDIT,
  COMPLETE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_DEFAULT_TASK_DATA,
  UPDATE_TASK_DATA,
} from "./../constants/task";
import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { Dispatch } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  UPDATE_GESTURE_POSITIONS,
} from "../constants/task";
import { TaskType } from "./../../components/UI/Task/types";

export const addTaskAction = (task: TaskType) => (dispath: Dispatch) => {
  dispath({ type: ADD_TASK, task });
};

export const deleteTaskAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TASK, id });
};

export const editTaskAction = (task: TaskType) => (dispatch: Dispatch) => {
  dispatch({ type: EDIT_TASK, task });
};

export const updateNewTaskDataAction = (newTaskData: TaskData) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_DATA, newTaskData });
  };

export const setDefaultTaskDataAction = () => (dispatch: Dispatch) => {
  dispatch({ type: SET_DEFAULT_TASK_DATA });
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
