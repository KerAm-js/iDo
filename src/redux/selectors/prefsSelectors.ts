import { RootState } from "../types/rootState";

export const getPrefs = (state: RootState) => state.prefs;
export const getLanguage = (state: RootState) => state.prefs.language;
export const getTheme = (state: RootState) => state.prefs.theme;
export const getPeriods = (state: RootState) => state.prefs.periods;