import { HomePeriodsKeys } from './../../../types/constants';
import { TimeType, TaskType } from './../../../redux/types/task';

export type TaskPropTypes = {
  taskObject: TaskType,
  sectionType?: HomePeriodsKeys;
  completeTask: (task: TaskType) => void;
  deleteTask: (id: string) => void;
};

export type CompletedMarkerPropTypes = {
  onPress: () => void;
  completedListOpacity: { value: number };
  top: { value: number };
  opacity: { value: number };
};