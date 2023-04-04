import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";

export interface BottomPopupPropType {
  visible: boolean;
  title?: LangObjectType | TextGetterType;
  children?: JSX.Element | null | Array<JSX.Element | null>;
  keyboardHeight?: number;
  rightButtonTitle?: LangObjectType | false;
  rightButtonColor?: string;
  onRightButtonPress?: (() => void) | false;
  onCloseAnimationEnd?: () => void;
}
