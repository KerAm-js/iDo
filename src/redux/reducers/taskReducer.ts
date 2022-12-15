import {
  UPDATE_GESTURE_POSITIONS,
  CHOOSE_TASK_TO_EDIT,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_TIME,
  UPDATE_TASK_REMIND_TIME,
  UPDATE_TASKS,
  COMPLETE_TASK,
  SET_TASK_EXPIRATION,
} from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";

const initialState: TaskState = {
  tasks: [],
  gesturePositions: {},
  taskToEdit: undefined,
  newTaskData: {
    time: undefined,
    timeType: undefined,
    remindTime: undefined,
  },
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
        newTaskData: { ...initialState.newTaskData },
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
        taskToEdit: undefined,
        newTaskData: { ...initialState.newTaskData },
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
    case UPDATE_TASK_TIME: {
      return {
        ...state,
        newTaskData: {
          ...state.newTaskData,
          time: action.time,
          timeType: action.timeType,
        },
      };
    }
    case UPDATE_TASK_REMIND_TIME: {
      return {
        ...state,
        newTaskData: {
          ...state.newTaskData,
          remindTime: action.remindTime,
        },
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
    case SET_TASK_EXPIRATION: {
      const tasks = state.tasks.map((task) => {
        const isCompletedInTime = task.completionTime && task.completionTime < task.time;
        if (task.id === action.id && !task.isExpired && !isCompletedInTime) {
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

// const tasks = [
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:38 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача",
//     time: 1669582799999,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:39 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669569400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:40 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669578400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:41 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669579400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:42 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669580000000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:43 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669581400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:44 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:45 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669583400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:46 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669583900000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:47 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669584400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:48 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669585400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:49 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669586400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:50 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669587400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:51 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669588400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:52 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669589400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:53 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669590400000,
//     timeType: "time",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:54 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:55 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:56 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:26:59 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:00 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:01 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:02 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:03 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:04 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:05 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:06 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача 1",
//     time: 1669582799999,
//     timeType: "day",
//   },
//   {
//     description: "",
//     folder: "3",
//     id: "Sun Nov 27 2022 13:27:07 GMT+0300 (Москва, стандартное время)",
//     isCompleted: false,
//     isExpired: false,
//     remindTime: undefined,
//     task: "Задача",
//     time: 1669582799999,
//     timeType: "day",
//   },
// ]
