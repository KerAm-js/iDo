import { FlexAlignType } from "react-native";

export type iconButtonProps = {
  xml: string,
  align?: 'start' | 'center' | 'end',
  justify?: 'start' | 'center' | 'end',
  iconWidth?: number,
  iconHeight?: number,
  onClick?: () => void,
}