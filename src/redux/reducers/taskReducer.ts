import { TaskType } from "./../types/task";
import {
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASKS,
  COMPLETE_TASK,
  SET_TASK_EXPIRATION,
  UPDATE_POSITIONS,
} from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";
import { ListObject } from "../../types/global/ListObject";

const initialState: TaskState = {
  tasks: [],
  positions: {},
  isTaskAddingAnimated: false,
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
        isTaskAddingAnimated: action.isTaskAddingAnimated,
      };
    }
    case DELETE_TASK: {
      let tasks: Array<TaskType> = [];
      let positions: ListObject = {};

      state.tasks.forEach((task) => {
        if (task.id !== action.task.id) {
          tasks.push(task);
          positions[task.id] = state.positions[task.id];
        }
      });

      return {
        ...state,
        tasks,
        positions,
      };
    }
    case EDIT_TASK: {
      const tasks = state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      return {
        ...state,
        tasks,
        isTaskAddingAnimated: false,
      };
    }
    case COMPLETE_TASK: {
      const tasks = state.tasks.map((el) => {
        if (el.id === action.id) {
          return {
            ...el,
            isCompleted: action.isCompleted,
            completionTime: action.completionTime,
            isExpired: action.isExpired,
            notificationId: action.notificationId
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
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: [...action.tasks],
      };
    }
    case UPDATE_POSITIONS: {
      return {
        ...state,
        positions: {
          ...state.positions,
          ...action.positions,
        },
      };
    }
    case SET_TASK_EXPIRATION: {
      const tasks = state.tasks.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            isExpired: 1,
          };
        } else {
          return task;
        }
      });
      return {
        ...state,
        tasks,
      };
    }
    default:
      return state;
  }
};
