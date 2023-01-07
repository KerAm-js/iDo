import { ListObject } from '../../../types/global/ListObject';
import { HomePeriodsKeys } from '../../../types/global/Periods';
import { TaskType } from './../../../redux/types/task';

export type HomePropType = {
}

export type SectionsType = {
  title: HomePeriodsKeys,
  list: Array<TaskType>,
  positions: ListObject,
}

export type SectionsObjectType = {
  [key: string]: SectionsType
}