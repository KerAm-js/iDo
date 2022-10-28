import { Dispatch, SetStateAction } from "react";
import { Languages } from "../../../types/data/languageTexts";
import { BottomPopupPropType } from "../../Layouts/BottomPopup/types";

export interface CheckPopupPropType extends BottomPopupPropType {
  listType: 'check';
  list: Array<keyof Languages>;
  state: string;
  updateState: Dispatch<SetStateAction<keyof Languages>>;
}