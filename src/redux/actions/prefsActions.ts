import { Dispatch } from "@reduxjs/toolkit";
import { UPDATE_LANGUAGE, TOGGLE_THEME } from "../constants/prefs";
import { LanguageType } from "../types/prefs";

export const updateLanguageAction =
  (language: LanguageType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_LANGUAGE, language });
  };

export const toggleThemeAction = () => (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_THEME });
};
