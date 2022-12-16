import { SET_THEME, TOGGLE_THEME, UPDATE_PERIODS } from "./../constants/prefs";
import { UPDATE_LANGUAGE } from "../constants/prefs";
import { PrefsAction, PrefsState } from "../types/prefs";
import { EXPIRED, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../utils/constants/periods";

const initialState: PrefsState = {
  language: "ru",
  theme: "light",
  periods: {
    [EXPIRED]: false,
    [FOR_TODAY]: true,
    [FOR_TOMORROW]: false,
    [FOR_WEEK]: false,
  }
};

export const prefsReducer = (
  state: PrefsState = initialState,
  action: PrefsAction
): PrefsState => {
  switch (action.type) {
    case UPDATE_LANGUAGE: {
      return {
        ...state,
        language: action.language,
      };
    }
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    }
    case SET_THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case UPDATE_PERIODS: {
      return {
        ...state,
        periods: action.periods
      }
    }
    default: {
      return state;
    }
  }
};
