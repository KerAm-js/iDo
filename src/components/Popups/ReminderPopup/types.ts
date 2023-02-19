import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface ReminderPopupPropType extends BottomPopupPropType {
  hasDeleteButton?: boolean,
  closePopup: () => void,
  setDefaultsFlag: {current: boolean},
}