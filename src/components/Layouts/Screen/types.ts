import { FC, ReactNode } from "react";

export type ScreenLayoutProps = {
  children: Array<JSX.Element> | JSX.Element;
  title: string;
  headingLeft?: JSX.Element,
  headerRight?: () => JSX.Element,
  subtitle?: string,
  subtitleComponent?: JSX.Element,
};