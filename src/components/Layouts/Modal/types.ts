import { ViewStyle } from "react-native";

export type ModalLayoutPropType = {
  children: JSX.Element | Array<JSX.Element>,
  visible: boolean,
  close: () => void;
}

export type BackdropPropType = {
  opacity: { value: number }
}