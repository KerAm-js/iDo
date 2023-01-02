import { ViewStyle } from "react-native";
import { CalendarDateIconPropType } from '../../PopupItems/types';

export type iconButtonProps = {
  xml: string,
  style?: ViewStyle | Array<ViewStyle>,
  align?: 'start' | 'center' | 'end',
  justify?: 'start' | 'center' | 'end',
  iconWidth?: number,
  iconHeight?: number,
  onClick?: () => void,
}

export interface CalendarIconPropType extends CalendarDateIconPropType {
  onPress?: () => void,
}