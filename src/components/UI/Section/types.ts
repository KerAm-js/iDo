import { GesturePositionsType } from '../../../types/global/GesturePositions';
import { ListObject } from './../../../types/global/ListObject';
import { TaskPropTypes } from "../Task/types";
import { FC } from 'react';
import { HomePeriodsKeys } from '../../../redux/types/prefs';
import { TaskType } from '../../../redux/types/task';

export type SectionProps = {
  title: HomePeriodsKeys,
  list: Array<TaskType>,
  visible: boolean,
}

export type MovableItemProps = {
  taskObject: TaskType,
  id: number,
  index: number,
  positions: {value: ListObject},
  opacity: {value: number},
  gesturePositions: { value: GesturePositionsType},
  itemHeight: number,
  component: FC<TaskPropTypes>,
  completeTask: (task: TaskType) => void,
  deleteTask: (id: number) => void,
  sectionType: HomePeriodsKeys,
  upperBound: number,
}

export type ContextType = {
  startPositionsObject: ListObject,
  startPosition: number,
  isMovingDisabled: boolean,
}