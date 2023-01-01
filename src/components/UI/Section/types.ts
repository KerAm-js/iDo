import { GesturePositionsType } from "../../../types/global/GesturePositions";
import { ListObject } from "./../../../types/global/ListObject";
import { TaskPropTypes } from "../Task/types";
import { FC } from "react";

import { TaskType } from "../../../redux/types/task";
import { HomePeriodsKeys } from "../../../types/global/Periods";
import { SectionVisibilityValueType } from "../../../redux/types/interface";

export type SectionProps = {
  title: HomePeriodsKeys;
  list: Array<TaskType>;
  initialGesturePositions: GesturePositionsType;
  visibilities: SectionVisibilityValueType;
};

export type MovableItemProps = {
  taskObject: TaskType;
  id: number;
  index: number;
  positions: { value: ListObject };
  opacity: { value: number };
  gesturePositions: { value: GesturePositionsType };
  itemHeight: number;
  component: FC<TaskPropTypes>;
  completeTask: (task: TaskType) => void;
  deleteTask: (id: number, notificationId?: string) => void;
  sectionTitle: HomePeriodsKeys;
  upperBound: number;
};

export type ContextType = {
  startPositionsObject: ListObject;
  startGesturePositionsObject: GesturePositionsType;
  startPosition: number;
  isMovingDisabled: boolean;
};
