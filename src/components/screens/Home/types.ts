import { GesturePositionsType } from '../../../types/global/GesturePositions';
import { HomePeriodsKeys } from '../../../types/global/Periods';
import { TaskType } from './../../../redux/types/task';

export type HomePropType = {
}

export type SectionsType = {
  title: HomePeriodsKeys,
  list: Array<TaskType>,
  gesturePositions: GesturePositionsType,
}

export type SectionsObjectType = {
  [key: string]: SectionsType
}