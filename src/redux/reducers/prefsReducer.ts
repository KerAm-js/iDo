import {
  SET_THEME,
  SET_LANGUAGE,
  UPDATE_PREFS,
  SET_AUTO_REMINDER,
} from "./../constants/prefs";
import { PrefsAction, PrefsState } from "../types/prefs";

const initialState: PrefsState = {
  language: "ru",
  theme: "light",
  autoReminder: false,
  completedTasksRemindersDisabled: true,
};

export const prefsReducer = (
  state: PrefsState = initialState,
  action: PrefsAction
): PrefsState => {
  switch (action.type) {
    case UPDATE_PREFS: {
      return {
        ...state,
        ...action.prefs,
      };
    }
    case SET_LANGUAGE: {
      return {
        ...state,
        language: action.language,
      };
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case SET_AUTO_REMINDER: {
      return {
        ...state,
        autoReminder: action.autoReminder,
      };
    }
    default: {
      return state;
    }
  }
};
