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
  positions: {value: ListObject},
  opacity: {value: number},
  completedMarkerTop: {value: number},
  markerOpacity: {value: number},
  positionsState: GesturePositionsType,
  itemHeight: number,
  component: FC<TaskPropTypes>,
  componentProps: TaskPropTypes,
  upperBound: number,
  upperBoundMax: number,
  updatePositionsState: (list: GesturePositionsType) => void,
  updateUpperBound: (newUpperBound: number) => void,
}