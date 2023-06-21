import { Action } from "@reduxjs/toolkit";
import { TaskType, TimeType } from "./task";
import { LangObjectType, TextGetterType } from "../../types/global/LangObject";

export type TaskData = {
  time: number;
  timeType: TimeType;
  remindTime?: number;
  isRegular?: boolean;
};

export type AddTaskPopupVisibleType = {
  task: boolean;
  time: boolean;
  reminder: boolean;
};

export type MessageType = {
  title?: LangObjectType;
  body?: LangObjectType;
};

export type PopupsState = {
  message: MessageType;
  addTaskPopupVisibilities: AddTaskPopupVisibleType | undefined;
  languagePopupVisible: boolean;
  taskToEdit?: TaskType;
  taskData: TaskData;
  calendarChoosedDate?: number;
};

export interface PopupsActionType extends Action {
  task: undefined | TaskType;
  taskData: undefined | TaskData;
  time: number;
  timeType: TimeType | null;
  remindTime: number;
  isRegular: boolean;
  visible: boolean;
  date: number | undefined;
  autoReminder?: boolean;
  message?: MessageType;
}
