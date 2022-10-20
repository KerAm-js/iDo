import { PositionsObject } from './../../../types/global/PositionsObject';
import { ListObject } from './../../../types/global/ListObject';
import { TaskPropTypes, TaskType } from "../Task/types";
import { FC } from 'react';

export type SectionProps = {
  title: string,
  list: Array<TaskType>,
}

export type MovableItemProps = {
  id: string,
  positions: {value: ListObject},
  opacity: {value: number},
  completedMarkerTop: {value: number},
  markerOpacity: {value: number},
  positionsState: PositionsObject,
  itemHeight: number,
  component: FC<TaskPropTypes>,
  componentProps: TaskPropTypes,
  upperBound: number,
  updatePositionsState: (list: PositionsObject) => void,
  updateUpperBound: (newUpperBound: number) => void,
}