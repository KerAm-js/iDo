import { TaskType } from './../../UI/Task/types';
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from '../../../types/constants';
import { HomePeriodsState } from '../../UI/PopupItems/types';
export type HomePropType = {
  periodsState: HomePeriodsState,
  showSettingModal: () => void,
}

export type SectionsType = {
  title: FOR_TODAY | FOR_TOMORROW | FOR_WEEK | FOR_MONTH,
  list: Array<TaskType>
}