import { dynamicPropObject } from './../../../types/global/dynamicPropObject';
import { TaskPropTypes, TaskType } from "../Task/types";
import { FC } from 'react';

export type SectionProps = {
  title: string,
  list: Array<TaskType>,
}

export type MovableItemProps = {
  id: string,
  positions: {value: dynamicPropObject<number>},
  itemHeight: number,
  component: FC<TaskPropTypes>,
  componentProps: TaskPropTypes,
}