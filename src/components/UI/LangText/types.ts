import { TextProps } from "react-native";
import { LanguageType } from "../../../redux/types/prefs";
import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";

export interface LangTextPropTypes extends TextProps {
  title: LangObjectType | TextGetterType;
  handleTheme?: boolean;
  setScreenTitle?: (lang: LanguageType) => void;
}
