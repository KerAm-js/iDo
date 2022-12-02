import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface CheckPopupPropType extends BottomPopupPropType {
  list: Array<{ title: string, value: any }>;
  state: string;
  updateState: ((value: any) => void);
}