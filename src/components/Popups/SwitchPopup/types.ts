import { Dispatch, SetStateAction } from "react";
import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export type SwitchPopupStateType = {
  [key: string]: boolean
}

export interface SwitchPopupPropType extends BottomPopupPropType {
  list: null;
  state: SwitchPopupStateType;
  updateState: Dispatch<SetStateAction<SwitchPopupStateType>>;
}