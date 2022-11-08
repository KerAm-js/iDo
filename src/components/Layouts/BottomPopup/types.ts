export interface BottomPopupPropType {
  visible: boolean,
  title?: string,
  children?: JSX.Element | null | Array<JSX.Element | null>,
  handleKeyboard?: boolean
}
