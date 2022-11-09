import { TimeType } from './../../../redux/types/task';
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../types/constants";

export type TaskPropTypes = {
  id: string;
  task: string;
  description: string;
  time?: string;
  timeType?: TimeType,
  sectionType?: FOR_TODAY | FOR_TOMORROW | FOR_WEEK | FOR_MONTH;
  isCompleted: boolean;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

export interface TaskType {
  id: string;
  task: string;
  isCompleted: boolean;
  time?: string;
  timeType?: TimeType,
  description: string;
};

export type CompletedMarkerPropTypes = {
  onPress: () => void;
  completedListOpacity: { value: number };
  top: { value: number };
  opacity: { value: number };
};

export type CompletedMarkerType = {
  isMarker: boolean;
};
