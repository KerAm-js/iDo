import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { Action } from "@reduxjs/toolkit";

export type TimeType = 'day' | 'time';

export type TaskData = {
  time?: number,
  timeType?: TimeType,
  remindTime?: number,
}

export type TaskState = {
  tasks: Array<TaskType>;
  gesturePositions: GesturePositionsType;
  taskToEdit: TaskType | undefined;
  newTaskData: TaskData;
};

export interface TaskAction extends Action {
  task: TaskType;
  time: number,
  timeType: TimeType,
  remindTime: number,
  notificationId: number,
  newTaskData: TaskData;
  tasks: Array<TaskType>;
  positions: GesturePositionsType;
  newCompletionStatus: number,
  completionTime?: number,
  isCompleted: number,
  isExpired: number,
  id: number;
}

export interface TaskType {
  id: number;
  task: string;
  description?: string;
  time: number;
  timeType: TimeType,
  isCompleted: number;
  isExpired: number,
  completionTime?: number,
  remindTime?: number,
  notificationId?: string,
  folder?: string,
};
