import { GesturePositionsType } from '../../../types/global/GesturePositions';
import { ListObject } from './../../../types/global/ListObject';
import { TaskPropTypes, TaskType } from "../Task/types";
import { FC } from 'react';
import { HomePeriodsKeys } from '../../../types/constants';

export type SectionProps = {
  title: HomePeriodsKeys,
  list: Array<TaskType>,
}

export type MovableItemProps = {
  id: string,
  index: number,
  positions: {value: ListObject},
  opacity: {value: number},
  positionsState: GesturePositionsType,
  itemHeight: number,
  component: FC<TaskPropTypes>,
  componentProps: TaskPropTypes,
  upperBound: number,
  updatePositionsState: (list: GesturePositionsType) => void,
}