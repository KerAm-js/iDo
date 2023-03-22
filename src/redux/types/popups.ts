import { Action } from "@reduxjs/toolkit";
import { TaskType } from "./task";

export type TimeType = "day" | "time";

export type TaskData = {
  time?: number;
  timeType?: TimeType;
  remindTime?: number;
  isRegular?: boolean;
};

export type AddTaskPopupVisibleType = {
  task: boolean,
  time: boolean,
  reminder: boolean,
}

export type PopupsState = {
  addTaskPopupVisibilities: AddTaskPopupVisibleType | undefined,
  languagePopupVisible: boolean,
  taskToEdit?: TaskType,
  taskData?: TaskData,
}

export interface PopupsActionType extends Action {
  taskToEdit: undefined | TaskType,
  taskData: undefined | TaskData,
  time: number,
  timeType: TimeType,
  remindTime: number,
  isRegular: boolean,
  visible: boolean,
}