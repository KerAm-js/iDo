import { ViewStyle } from 'react-native';

type Element = JSX.Element | false

export type ListItemPopupStyles = {
  children: Element | Array<Element>,
  isCardColor?: boolean,
  borderRadius?: number,
  style?: ViewStyle,
}