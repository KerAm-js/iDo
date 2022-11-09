import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { Action } from "@reduxjs/toolkit";
import { TaskType } from "../../components/UI/Task/types";

export type TimeType = 'day' | 'time';

export type TaskData = {
  time?: string,
  timeType?: TimeType,
}

export type TaskState = {
  tasks: Array<TaskType>;
  gesturePositions: GesturePositionsType;
  taskToEdit: TaskType | undefined;
  newTaskData: TaskData;
};

export interface TaskAction extends Action {
  task: TaskType;
  newTaskData: TaskData;
  tasks: Array<TaskType>;
  positions: GesturePositionsType;
  id: string;
}
