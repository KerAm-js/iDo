import { Action } from "@reduxjs/toolkit";

export type LanguageType = "en" | "ru" | "de" | "ch";
export type ThemeType = "light" | "dark";

export type PrefsState = {
  language: LanguageType;
  theme: ThemeType;
  autoReminder: boolean;
  completedTasksRemindersDisabled: boolean;
};

export interface PrefsAction extends Action {
  language: LanguageType;
  theme: ThemeType;
  autoReminder: boolean;
  prefs: PrefsState;
  completedTasksRemindersDisabled: boolean
}
