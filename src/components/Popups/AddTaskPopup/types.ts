import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface AddTaskPopupPropType extends BottomPopupPropType {
  openReminderModal: () => void,
  openCalendar: () => void
}