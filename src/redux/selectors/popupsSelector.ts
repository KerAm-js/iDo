import { RootState } from "../types/rootState";

export const popupsSelector = (state: RootState) => state.popups;
export const languagePopupVisibleSelector = (state: RootState) =>
  state.popups.languagePopupVisible;
export const addTaskPopupVisibilitiesSelector = (state: RootState) =>
  state.popups.addTaskPopupVisibilities;
export const taskTimePopupVisibilitySelector = (state: RootState) => !!state.popups.addTaskPopupVisibilities?.time;
export const taskReminderPopupVisibilitySelector = (state: RootState) => !!state.popups.addTaskPopupVisibilities?.reminder;
export const taskDataSelector = (state: RootState) => state.popups.taskData;
export const taskToEditSelector = (state: RootState) => state.popups.taskToEdit;
export const messageSelector = (state: RootState) => state.popups.message;
export const calendarChoosedDateSelector = (state: RootState) => state.popups.calendarChoosedDate;
