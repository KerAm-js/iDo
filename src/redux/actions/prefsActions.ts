import { SET_AUTO_REMINDER } from "./../constants/prefs";
import { Dispatch } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";
import { getPrefsFromAS } from "../../backend/asyncStorage/prefs";
import { lagnuages } from "../../utils/languageTexts";
import { SET_LANGUAGE, SET_THEME, UPDATE_PREFS } from "../constants/prefs";
import { store } from "../store";
import { LanguageType, ThemeType } from "../types/prefs";

export const getAutoReminderSetting = () => {
  return store.getState().prefs.autoReminder;
};

export const updateLanguageAction =
  (language: LanguageType) => (dispatch: Dispatch) => {
    dispatch({ type: SET_LANGUAGE, language });
  };

export const loadPrefsFromASAction =
  (colorScheme: ColorSchemeName, locale: string) =>
  async (dispatch: Dispatch) => {
    try {
      const prefs = await getPrefsFromAS();
      if (prefs) {
        dispatch({ type: UPDATE_PREFS, prefs });
      } else {
        const langCode = locale.slice(0, 2);
        const languageStrings: Array<string> = lagnuages;
        const language = languageStrings.includes(langCode) ? langCode : "en";
        const theme: ThemeType =
          colorScheme === "dark" || colorScheme === "light"
            ? colorScheme
            : "light";
        dispatch({
          type: UPDATE_PREFS,
          prefs: { theme, language, autoReminder: false },
        });
      }
    } catch (error) {
      console.log("getPrefsFromASAction", error);
    }
  };

export const setThemeAction = (theme: ThemeType) => (dispatch: Dispatch) => {
  dispatch({ type: SET_THEME, theme });
};

export const setAutoReminderAction =
  (autoReminder: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: SET_AUTO_REMINDER, autoReminder });
  };
