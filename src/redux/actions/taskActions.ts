import { DELETE_TASK } from './../constants/task';
import { GesturePositionsType } from './../../types/global/GesturePositions';
import { Dispatch } from '@reduxjs/toolkit';
import { ADD_TASK, CHANGE_GESTURE_POSITIONS, UPDATE_TASKS } from '../constants/task';
import { TaskType } from './../../components/UI/Task/types';

export const addTaskAction = (task: TaskType) => (dispath: Dispatch) => {
  dispath({ type: ADD_TASK, task });
}

export const deleteTaskAction = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TASK, id });
}

export const completeTaskAction = (tasks: Array<TaskType>, id: string) => (dispatch: Dispatch) => {
  const tasksCopy = tasks.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        isCompleted: !el.isCompleted,
      };
    } else {
      return el;
    }
  });
  dispatch({ type: UPDATE_TASKS, tasks: tasksCopy });
}

export const changeGesturePositionsAction = (positions: GesturePositionsType) => (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_GESTURE_POSITIONS, positions, });
}