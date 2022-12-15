import { GesturePositionsType } from '../../../types/global/GesturePositions';
import { ListObject } from './../../../types/global/ListObject';
import { TaskPropTypes } from "../Task/types";
import { FC } from 'react';
import { HomePeriodsKeys } from '../../../types/constants';
import { TaskType } from '../../../redux/types/task';

export type SectionProps = {
  title: HomePeriodsKeys,
  list: Array<TaskType>,
}

export type MovableItemProps = {
  taskObject: TaskType,
  id: string,
  index: number,
  positions: {value: ListObject},
  opacity: {value: number},
  gesturePositions: { value: GesturePositionsType},
  itemHeight: number,
  component: FC<TaskPropTypes>,
  completeTask: (task: TaskType) => void,
  deleteTask: (id: string) => void,
  sectionType: HomePeriodsKeys,
  upperBound: number,
}

export type ContextType = {
  startPositionsObject: ListObject,
  startPosition: number,
  isMovingDisabled: boolean,
}