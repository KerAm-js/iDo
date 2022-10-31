export type ScreenLayoutProps = {
  children: Array<JSX.Element> | JSX.Element;
  title: string;
  headingRight?: JSX.Element,
  subtitle?: string,
  subtitleComponent?: JSX.Element,
};