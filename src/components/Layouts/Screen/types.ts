import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";

export type ScreenLayoutProps = {
  children: Array<JSX.Element> | JSX.Element;
  title: TextGetterType | LangObjectType;
  subtitle?: TextGetterType | LangObjectType;
  headingRight?: JSX.Element;
  onMount?: () => void;
  onUnmount?: () => void;
  subtitleComponent?: JSX.Element;
};
