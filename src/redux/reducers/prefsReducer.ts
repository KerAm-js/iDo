import { SET_THEME, TOGGLE_THEME } from "./../constants/prefs";
import { UPDATE_LANGUAGE } from "../constants/prefs";
import { PrefsAction, PrefsState } from "../types/prefs";

const initialState: PrefsState = {
  language: "ru",
  theme: "light",
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
    default: {
      return state;
    }
  }
};
