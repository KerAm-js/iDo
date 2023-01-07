import { Action } from "@reduxjs/toolkit";
import { ListObject } from "../../types/global/ListObject";

export type TimeType = "day" | "time";

export type TaskData = {
  time?: number;
  timeType?: TimeType;
  remindTime?: number;
};

export type TaskState = {
  tasks: Array<TaskType>;
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
  calendarChoosedDate: number | undefined,
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
  folder?: string;
}
