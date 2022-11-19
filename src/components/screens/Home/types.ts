import { TaskType } from './../../../redux/types/task';
import { SwitchPopupStateType } from './../../Popups/SwitchPopup/types';
import { HomePeriodsKeys } from '../../../types/constants';

export type HomePropType = {
  periodsState: SwitchPopupStateType,
  showSettingModal: () => void,
}

export type SectionsType = {
  title: HomePeriodsKeys,
  list: Array<TaskType>
}