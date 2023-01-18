import { TaskType } from "./../types/task";
import {
  CHOOSE_TASK_TO_EDIT,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK_TIME,
  UPDATE_TASK_REMIND_TIME,
  UPDATE_TASKS,
  COMPLETE_TASK,
  SET_TASK_EXPIRATION,
  SET_DEFAULT_NEW_TASK_DATA,
  CALENDAR_CHOOSED_DATE,
  CLEAR_REMINDER,
  UPDATE_POSITIONS,
  SET_IS_NEW_TASK_HABIT,
} from "./../constants/task";
import { ADD_TASK } from "../constants/task";
import { TaskAction, TaskState } from "../types/task";
import { ListObject } from "../../types/global/ListObject";

const initialState: TaskState = {
  tasks: [],
  positions: {},
  habits: {},
  calendarChoosedDate: undefined,
  taskToEdit: undefined,
  newTaskData: {
    time: undefined,
    timeType: undefined,
    remindTime: undefined,
    isHabit: undefined,
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
        habits: action.habit
          ? {
              ...state.habits,
              [action.habit.id]: action.habit,
            }
          : state.habits,
        newTaskData: !!state.calendarChoosedDate
          ? {
              time: new Date(state.calendarChoosedDate).setHours(
                23,
                59,
                59,
                999
              ),
              timeType: "day",
              remindTime: undefined,
            }
          : {
              ...initialState.newTaskData,
              time: new Date().setHours(23, 59, 59, 999),
              timeType: "day",
            },
      };
    }
    case DELETE_TASK: {
      const habitId = action.task.habitId;
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
        habits: habitId
          ? {
              ...state.habits,
              [habitId]: undefined,
            }
          : state.habits,
      };
    }
    case EDIT_TASK: {
      const habitId = action.task?.habitId || action.habit?.id || action.oldHabitId;
      const tasks = state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      return {
        ...state,
        tasks,
        taskToEdit: undefined,
        habits: habitId ? {
          ...state.habits,
          [habitId]: action.habit,
        } : state.habits,
        newTaskData: !!state.calendarChoosedDate
          ? {
              time: new Date(state.calendarChoosedDate).setHours(
                23,
                59,
                59,
                999
              ),
              timeType: "day",
              remindTime: undefined,
            }
          : { ...initialState.newTaskData },
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
          remindTime: undefined,
        },
      };
    }
    case SET_IS_NEW_TASK_HABIT: {
      let { remindTime } = state.newTaskData;
      let { time } = state.newTaskData;
      if (
        action.isHabit &&
        remindTime &&
        time &&
        new Date(remindTime).setHours(0, 0, 0, 0) !==
          new Date(time).setHours(0, 0, 0, 0)
      ) {
        remindTime = undefined;
      }

      return {
        ...state,
        newTaskData: {
          ...state.newTaskData,
          isHabit: action.isHabit,
          remindTime,
        },
      };
    }
    case CLEAR_REMINDER: {
      const tasks = state.tasks.map((el) => {
        if (el.id === action.id && el.remindTime === action.remindTime) {
          return {
            ...el,
            remindTime: undefined,
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
    case UPDATE_TASK_REMIND_TIME: {
      return {
        ...state,
        newTaskData: {
          ...state.newTaskData,
          remindTime: action.remindTime,
        },
      };
    }
    case SET_DEFAULT_NEW_TASK_DATA: {
      return {
        ...state,
        newTaskData: {
          time: undefined,
          timeType: undefined,
          remindTime: undefined,
        },
      };
    }
    case CHOOSE_TASK_TO_EDIT: {
      return {
        ...state,
        taskToEdit: action?.task,
        newTaskData:
          state.calendarChoosedDate && !action?.task
            ? {
                time: new Date(state.calendarChoosedDate).setHours(
                  23,
                  59,
                  59,
                  999
                ),
                timeType: "day",
                remindTime: undefined,
              }
            : {
                time: action.task?.time,
                timeType: action.task?.timeType,
                remindTime: action.task?.remindTime,
                isHabit: Boolean(action.task?.habitId),
              },
      };
    }
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: [...action.tasks],
        habits: action.habitsObj
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
      const habit = action.task
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
    case CALENDAR_CHOOSED_DATE: {
      return {
        ...state,
        calendarChoosedDate: action.calendarChoosedDate,
      };
    }
    default:
      return state;
  }
};
