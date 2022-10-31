import { GesturePositionsType } from './../../types/global/GesturePositions';
import { CHANGE_GESTURE_POSITIONS, DELETE_TASK, UPDATE_TASKS } from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";

const initialState: TaskState = {
  tasks: [],
  gesturePositions: {},
};

export const taskReducer = (
  state: TaskState = initialState,
  action: TaskAction
) => {
  switch (action.type) {
    case ADD_TASK: {
      const newGesturePositions: GesturePositionsType = {};
      for (let key in state.gesturePositions) {
        newGesturePositions[key] = state.gesturePositions[key] + 1;
      }
      newGesturePositions[action.task.id] = 0;
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        gesturePositions: newGesturePositions
      };
    };
    case DELETE_TASK: {
      const tasks = state.tasks.filter(task => task.id !== action.id);
      return {
        ...state,
        tasks,
      }
    };
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: [...action.tasks]
      }
    };
    case CHANGE_GESTURE_POSITIONS: {
      return {
        ...state,
        gesturePositions: { ...action.positions },
      };
    };
    default:
      return state;
  }
};
