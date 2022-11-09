import { CHANGE_GESTURE_POSITIONS, CHOOSE_TASK_TO_EDIT, DELETE_TASK, EDIT_TASK, UPDATE_NEW_TASK_DATA, UPDATE_TASKS } from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";
import { addTaskWithSorting } from '../../utils/utils';

const initialState: TaskState = {
  tasks: [
    // {
    //   id: new Date('2022-11-02T03:24:01').toString(),
    //   task: '1',
    //   description: '',
    //   isCompleted: true,
    // },
    // {
    //   id: new Date('2022-11-02T03:25:01').toString(),
    //   task: '2',
    //   description: '',
    //   isCompleted: false,
    // },
    // {
    //   id: new Date('2022-11-02T03:26:01').toString(),
    //   task: '3',
    //   description: '',
    //   isCompleted: true,
    // },
    // {
    //   id: new Date('2022-11-02T03:27:01').toString(),
    //   task: '4',
    //   description: '',
    //   isCompleted: false,
    // },
  ],
  gesturePositions: {},
  taskToEdit: undefined,
  newTaskData: {
    time: undefined
  }
};

export const taskReducer = (
  state: TaskState = initialState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case ADD_TASK: {
      const updatedTasks = addTaskWithSorting(action.task, state.tasks);
      return {
        ...state,
        tasks: updatedTasks,
      };
    };
    case DELETE_TASK: {
      const tasks = state.tasks.filter(task => task.id !== action.id);
      return {
        ...state,
        tasks,
      }
    };
    case EDIT_TASK: {
      const tasks = state.tasks.map(task => task.id === action.task.id ? action.task : task); 
      return {
        ...state,
        tasks
      }
    };
    case UPDATE_NEW_TASK_DATA: {
      return {
        ...state,
        newTaskData: action.newTaskData
      }
    };
    case CHOOSE_TASK_TO_EDIT: {
      return {
        ...state,
        taskToEdit: action.task 
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
