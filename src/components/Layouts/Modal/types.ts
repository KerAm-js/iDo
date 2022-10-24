export type ModalLayoutPropType = {
  children: JSX.Element | Array<JSX.Element>,
  visible: boolean,
  close: () => void;
}