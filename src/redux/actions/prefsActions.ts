import { Dispatch } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";
import { UPDATE_LANGUAGE, TOGGLE_THEME, SET_THEME, UPDATE_PERIODS } from "../constants/prefs";
import { LanguageType, PeriodsType } from "../types/prefs";

export const updateLanguageAction =
  (language: LanguageType) => (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_LANGUAGE, language });
  };

export const toggleThemeAction = () => (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_THEME });
};

export const setThemeAction = (theme: ColorSchemeName) => (dispatch: Dispatch) => {
  dispatch({ type: SET_THEME, theme });
};

export const updatePeriodsAction = (periods: PeriodsType) => (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_PERIODS, periods });
};
