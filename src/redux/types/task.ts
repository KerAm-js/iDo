import { Action } from "@reduxjs/toolkit";
import { ListObject } from "../../types/global/ListObject";
import { RepeatingPeriodTypes } from "../../types/global/Periods";

export type TimeType = "day" | "time";

export type TaskData = {
  time?: number;
  timeType?: TimeType;
  remindTime?: number;
  isHabit?: boolean;
};

export type HabitType = {
  id: number;
  task: string;
  description?: string;
  time: string;
  timeType: TimeType;
  remindTime?: string;
  repeatingPeriod?: RepeatingPeriodTypes;
  repeatingFrequency?: number;
  repeatingWeekDays?: Array<number>;
};

export type TaskState = {
  tasks: Array<TaskType>;
  positions: ListObject;
  calendarChoosedDate: number | undefined;
  taskToEdit: TaskType | undefined;
  newTaskData: TaskData;
  habits: {
    [key: number]: HabitType | undefined;
  };
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
  isHabit: boolean;
  habitId: number;
  habit?: HabitType;
  oldHabitId?: number;
  habitsObj: {[key: number]: HabitType}
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
  habitId?: number;
}
