import { SET_THEME, UPDATE_LANGUAGE, UPDATE_PREFS } from "./../constants/prefs";
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
    case UPDATE_PREFS: {
      return {
        ...state,
        ...action.prefs,
      };
    }
    case UPDATE_LANGUAGE: {
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
    default: {
      return state;
    }
  }
};
