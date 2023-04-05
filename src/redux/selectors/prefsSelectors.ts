import { RootState } from "../types/rootState";

export const prefsSelector = (state: RootState) => state.prefs;
export const autoReminderSelector = (state: RootState) =>
  state.prefs.autoReminder;
