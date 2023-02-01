import { RootState } from "../types/rootState";

export const getPrefs = (state: RootState) => state.prefs;
export const getTheme = (state: RootState) => state.prefs.theme;
export const getAutoReminder = (state: RootState) => state.prefs.autoReminder;
export const getLanguage = (state: RootState) => state.prefs.language;
