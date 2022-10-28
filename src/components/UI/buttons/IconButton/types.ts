import { ViewStyle } from "react-native";

export type iconButtonProps = {
  xml: string,
  style?: ViewStyle,
  align?: 'start' | 'center' | 'end',
  justify?: 'start' | 'center' | 'end',
  iconWidth?: number,
  iconHeight?: number,
  onClick?: () => void,
}