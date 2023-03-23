import {
  SET_TASK_TO_EDIT,
  SET_TASK_TIME,
  SET_TASK_REMINDER,
  SET_DEFAULT_TASK_DATA,
  TOGGLE_IS_TASK_REGULAR,
  DELETE_TASK_REMINDER,
  SET_TASK_POPUP_VISIBLE,
  SET_TIME_POPUP_VISIBLE,
  SET_REMINDER_POPUP_VISIBLE,
  SET_LANGUAGE_POPUP_VISIBLE,
  SET_CALENDAR_CHOOSED_DATE,
} from "./../constants/popups";
import { PopupsActionType, PopupsState, TaskData } from "../types/popups";

const initialState: PopupsState = {
  addTaskPopupVisibilities: undefined,
  languagePopupVisible: false,
  taskToEdit: undefined,
  taskData: undefined,
  calendarChoosedDate: undefined,
};

export const popupsReducer = (
  state: PopupsState = initialState,
  action: PopupsActionType
): PopupsState => {
  switch (action.type) {
    case SET_TASK_TO_EDIT: {
      let taskData: TaskData | undefined = undefined;
      if (action.task) {
        const { time, timeType, isRegular, remindTime } = action.task;
        taskData = {
          time,
          timeType,
          isRegular: Boolean(isRegular),
          remindTime,
        };
      }
      return {
        ...state,
        taskToEdit: action.task,
        taskData,
        addTaskPopupVisibilities: {
          task: true,
          time: false,
          reminder: false,
        },
      };
    }
    case SET_TASK_TIME: {
      return {
        ...state,
        taskData: {
          ...state.taskData,
          time: action.time,
          timeType: action.timeType || state.taskData?.timeType || "day",
        },
      };
    }
    case SET_TASK_REMINDER: {
      return {
        ...state,
        taskData: {
          ...state?.taskData,
          remindTime: action.remindTime,
        },
      };
    }
    case SET_DEFAULT_TASK_DATA: {
      return {
        ...state,
        taskData: undefined,
      };
    }
    case TOGGLE_IS_TASK_REGULAR: {
      return {
        ...state,
        taskData: {
          ...state?.taskData,
          isRegular: !state.taskData?.isRegular,
        },
      };
    }
    case DELETE_TASK_REMINDER: {
      return {
        ...state,
        taskData: {
          ...state?.taskData,
          remindTime: undefined,
        },
      };
    }
    case SET_CALENDAR_CHOOSED_DATE: {
      return {
        ...state,
        calendarChoosedDate: action.date,
        taskData: action.date
          ? { ...state.taskData, time: action.date, timeType: "day" }
          : undefined,
      };
    }
    case SET_TASK_POPUP_VISIBLE: {
      const taskData: TaskData | undefined = state.calendarChoosedDate
        ? state.taskData
        : action.visible
        ? { time: new Date().setHours(23, 59, 59, 999), timeType: "day" }
        : undefined;
      return {
        ...state,
        taskData,
        taskToEdit: undefined,
        addTaskPopupVisibilities: action.visible
          ? {
              task: true,
              time: false,
              reminder: false,
            }
          : undefined,
      };
    }
    case SET_TIME_POPUP_VISIBLE: {
      return {
        ...state,
        addTaskPopupVisibilities: {
          task: !action.visible,
          time: action.visible,
          reminder: false,
        },
      };
    }
    case SET_REMINDER_POPUP_VISIBLE: {
      return {
        ...state,
        addTaskPopupVisibilities: {
          task: !action.visible,
          reminder: action.visible,
          time: false,
        },
      };
    }
    case SET_LANGUAGE_POPUP_VISIBLE: {
      return {
        ...state,
        languagePopupVisible: !state.languagePopupVisible,
      };
    }
    default: {
      return state;
    }
  }
};