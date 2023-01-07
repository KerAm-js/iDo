import { Dispatch } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";
import {
  getPrefsFromAS,
  savePrefsToAS,
} from "../../backend/asyncStorage/prefs";
import { lagnuages } from "../../utils/languageTexts";
import { UPDATE_LANGUAGE, SET_THEME, UPDATE_PREFS } from "../constants/prefs";
import { store } from "../store";
import { LanguageType, ThemeType } from "../types/prefs";

export const updateLanguageAction =
  (language: LanguageType) => async (dispatch: Dispatch) => {
    const prefsState = store.getState().prefs;
    await savePrefsToAS({ ...prefsState, language });
    dispatch({ type: UPDATE_LANGUAGE, language });
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
        dispatch({ type: UPDATE_PREFS, prefs: { theme, language } });
      }
    } catch (error) {
      console.log("getPrefsFromASAction", error);
    }
  };

export const setThemeAction =
  (theme: ThemeType) => async (dispatch: Dispatch) => {
    const prefsState = store.getState().prefs;
    await savePrefsToAS({ ...prefsState, theme });
    dispatch({ type: SET_THEME, theme });
  };
