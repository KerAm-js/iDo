import {
  UPDATE_GESTURE_POSITIONS,
  CHOOSE_TASK_TO_EDIT,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_DATA,
  UPDATE_TASKS,
  SET_DEFAULT_TASK_DATA,
  COMPLETE_TASK,
} from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";

const initialState: TaskState = {
  tasks: [
  ],
  gesturePositions: {},
  taskToEdit: undefined,
  newTaskData: undefined
};

export const taskReducer = (
  state: TaskState = initialState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case ADD_TASK: {
      const tasks = [action.task, ...state.tasks];
      return {
        ...state,
        tasks,
      };
    }
    case DELETE_TASK: {
      const tasks = state.tasks.filter((task) => task.id !== action.id);
      return {
        ...state,
        tasks,
      };
    }
    case EDIT_TASK: {
      const tasks = state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      return {
        ...state,
        tasks,
      };
    }
    case COMPLETE_TASK: {
      const tasks = state.tasks.map((el) => {
        if (el.id === action.id) {
          return {
            ...el,
            isCompleted: !el.isCompleted,
            completingTime: new Date().valueOf(),
          };
        } else {
          return el;
        }
      });
      return {
        ...state,
        tasks,
      };
    }
    case UPDATE_TASK_DATA: {
      return {
        ...state,
        newTaskData: action.newTaskData,
      };
    }
    case SET_DEFAULT_TASK_DATA: {
      return {
        ...state,
        newTaskData: undefined
      };
    }
    case CHOOSE_TASK_TO_EDIT: {
      return {
        ...state,
        taskToEdit: action.task,
      };
    }
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: [...action.tasks],
      };
    }
    case UPDATE_GESTURE_POSITIONS: {
      return {
        ...state,
        gesturePositions: { ...action.positions },
      };
    }
    default:
      return state;
  }
};
