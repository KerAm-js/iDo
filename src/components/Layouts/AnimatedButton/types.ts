import { ViewStyle } from "react-native"

export type AnimatedButtonPropTypes = {
  children: Array<JSX.Element> | JSX.Element,
  style?: ViewStyle | undefined | Array<ViewStyle | undefined>
  disabled?: boolean,
  onPress: () => void,
}