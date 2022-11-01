import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../types/constants";

export type TaskPropTypes = {
  id: string;
  task: string;
  description: string;
  time?: Date;
  timeType?: FOR_TODAY | FOR_TOMORROW | FOR_WEEK | FOR_MONTH;
  isCompleted: boolean;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

export type TaskType = {
  id: string;
  task: string;
  isCompleted: boolean;
  time?: Date;
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
