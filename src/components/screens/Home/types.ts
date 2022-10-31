import { SwitchPopupStateType } from './../../Popups/SwitchPopup/types';
import { TaskType } from './../../UI/Task/types';
import { HomePeriodsKeys } from '../../../types/constants';

export type HomePropType = {
  periodsState: SwitchPopupStateType,
  showSettingModal: () => void,
}

export type SectionsType = {
  title: HomePeriodsKeys,
  list: Array<TaskType>
}