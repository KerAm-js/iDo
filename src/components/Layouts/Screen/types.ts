export type ScreenLayoutProps = {
  children: Array<JSX.Element> | JSX.Element;
  title: string;
  headingRight?: JSX.Element,
  onMount?: () => void,
  onUnmount?: () => void,
  subtitle?: string,
  subtitleComponent?: JSX.Element,
};