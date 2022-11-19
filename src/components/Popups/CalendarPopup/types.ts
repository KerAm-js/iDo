import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface CalendarPopupPropType extends BottomPopupPropType {
  isReminderChoosing?: boolean,
  closePopup: () => void
}