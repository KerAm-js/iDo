import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";
import { HomePropType } from "../../Screens/Home/types";

export type rootTabNavigatorParamList = {
  Home: HomePropType;
  Folders: undefined;
  Stats: undefined;
  Prefs: undefined;
};

export type TabNavigatorPropTypes = {
  openAddTaskModal: () => void;
  openModal: () => void;
  openLanguageModal: () => void;
  periodsState: SwitchPopupStateType;
};
