import { Action } from "@reduxjs/toolkit";
import { ListObject } from "../../types/global/ListObject";
import { RepeatingPeriodTypes } from "../../types/global/Periods";

export type TimeType = "day" | "time";

export type TaskData = {
  time?: number;
  timeType?: TimeType;
  remindTime?: number;
  isRegular?: boolean;
};

export type TaskState = {
  tasks: Array<TaskType>;
  isTaskAddingAnimated: boolean | undefined;
  positions: ListObject;
  calendarChoosedDate: number | undefined;
  taskToEdit: TaskType | undefined;
  newTaskData: TaskData;
};

export interface TaskAction extends Action {
  task: TaskType;
  time: number;
  timeType: TimeType;
  remindTime: number | undefined;
  notificationId: number;
  newTaskData: TaskData;
  tasks: Array<TaskType>;
  positions: ListObject;
  newCompletionStatus: number;
  completionTime?: number;
  isCompleted: number;
  isExpired: number;
  id: number;
  calendarChoosedDate: number | undefined;
  isRegular: boolean;
  isTaskAddingAnimated: boolean | undefined;
}

export interface TaskType {
  id: number;
  task: string;
  description?: string;
  time: number;
  timeType: TimeType;
  isCompleted: number;
  isExpired: number;
  completionTime?: number;
  remindTime?: number;
  notificationId?: string;
  folderId?: number;
  isRegular?: number;
}
