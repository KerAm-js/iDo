import { TimeType } from './../../../redux/types/task';
import { FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../types/constants";

export type TaskPropTypes = {
  id: string;
  task: string;
  description: string;
  time: number;
  timeType: TimeType,
  sectionType?: FOR_TODAY | FOR_TOMORROW | FOR_WEEK;
  isCompleted: boolean;
  folder?: string,
  remindTime?: number,
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
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
