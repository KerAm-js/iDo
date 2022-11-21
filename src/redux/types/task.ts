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
  newTaskData: TaskData;
  tasks: Array<TaskType>;
  positions: GesturePositionsType;
  id: string;
}

export interface TaskType {
  id: string;
  task: string;
  isCompleted: boolean;
  completingTime?: number,
  time: number;
  timeType: TimeType,
  isExpired: boolean,
  remindTime?: number,
  description?: string;
  folder?: string,
};
