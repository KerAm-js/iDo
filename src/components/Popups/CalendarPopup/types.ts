import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface CalendarPopupPropType extends BottomPopupPropType {
  isReminderChoosing?: boolean,
  hasDeleteButton?: boolean,
  closePopup: () => void,
  setDefaultsFlag: {current: boolean},
}