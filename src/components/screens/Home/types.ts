import { TaskType } from './../../../redux/types/task';
import { HomePeriodsKeys } from '../../../redux/types/prefs'; 

export type HomePropType = {
}

export type SectionsType = {
  title: HomePeriodsKeys,
  list: Array<TaskType>
}

export type SectionsObjectType = {
  [key: string]: SectionsType
}