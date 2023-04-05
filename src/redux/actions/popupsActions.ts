import { Dispatch } from "@reduxjs/toolkit";
import {
  SET_TASK_TO_EDIT,
  SET_DEFAULT_TASK_DATA,
  TOGGLE_IS_TASK_REGULAR,
  SET_TASK_REMINDER,
  SET_TASK_TIME,
  SET_TASK_POPUP_VISIBLE,
  SET_TIME_POPUP_VISIBLE,
  SET_REMINDER_POPUP_VISIBLE,
  SET_LANGUAGE_POPUP_VISIBLE,
  SET_CALENDAR_CHOOSED_DATE,
} from "../constants/popups";
import { TaskType, TimeType } from "../types/task";

export const setTaskPopupVisibleAction =
  (visible: boolean, autoReminder?: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_TASK_POPUP_VISIBLE, visible, autoReminder });
  };

export const setTimePopupVisibleAction =
  (visible: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_TIME_POPUP_VISIBLE, visible });
  };

export const setReminderPopupVisibleAction =
  (visible: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_REMINDER_POPUP_VISIBLE, visible });
  };

export const setLanguagePopupVisibleAction =
  (visible: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_LANGUAGE_POPUP_VISIBLE, visible });
  };

export const toggleIsTaskRegularAction = () => (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_IS_TASK_REGULAR });
};

export const setCalendarChoosedDateAction =
  (date: number | undefined, autoReminder?: boolean) =>
  (dispatch: Dispatch) => {
    dispatch({ type: SET_CALENDAR_CHOOSED_DATE, date, autoReminder });
  };

export const setTaskToEditAction =
  (task: TaskType | undefined) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_TASK_TO_EDIT,
      task: { ...task, remindTime: task?.remindTime || undefined },
    });
  };

export const setTaskRemindTimeAction =
  (remindTime: number | undefined) => (dispatch: Dispatch) => {
    dispatch({ type: SET_TASK_REMINDER, remindTime });
  };

export const setDefaultTaskDataAction =
  (autoReminder?: boolean) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_DEFAULT_TASK_DATA,
      autoReminder,
    });
  };

export const setTaskTimeAction =
  (time: number, timeType: TimeType | null, autoReminder: boolean) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: SET_TASK_TIME,
      time,
      timeType,
      autoReminder,
    });
  };
