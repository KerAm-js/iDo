import { ViewStyle } from "react-native"

export type AnimatedButtonPropTypes = {
  children: Array<JSX.Element> | JSX.Element,
  style?: ViewStyle | Array<ViewStyle>
  onPress: () => void,
}