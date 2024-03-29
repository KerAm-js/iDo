import { ListObject } from "./../../../types/global/ListObject";

import { TaskType } from "../../../redux/types/task";
import { HomePeriodsKeys } from "../../../types/global/Periods";
import { SectionVisibilityValueType } from "../../../redux/types/interface";

export type SectionProps = {
  title: HomePeriodsKeys;
  list: Array<TaskType>;
  initPositions: ListObject;
  disableAnimationsTrigger?: any;
  visibilities?: SectionVisibilityValueType;
};

export type MovableItemProps = {
  taskObject: TaskType;
  isInsertingAnimated?: boolean;
  id: number;
  index: number;
  positions: { value: ListObject };
  updatePositions: (positions: ListObject) => void;
  opacity: { value: number };
  itemHeight: number;
  completeTask: (task: TaskType) => void;
  deleteTask: (task: TaskType) => void;
  sectionTitle: HomePeriodsKeys;
  upperBound: { current: number };
};

export type ContextType = {
  startPositionsObject: ListObject;
  startPosition: number;
  isMovingDisabled: boolean;
};
