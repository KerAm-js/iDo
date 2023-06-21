import { RootState } from "../types/rootState";

export const prefsSelector = (state: RootState) => state.prefs;
export const languageSelector = (state: RootState) => state.prefs.language;
export const autoReminderSelector = (state: RootState) =>
  state.prefs.autoReminder;
