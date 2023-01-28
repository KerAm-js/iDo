import { LanguageType } from "../../redux/types/prefs";

export type LangObjectType = {
  [key: string]: string,
  ru: string,
  en: string,
  de: string,
  ch: string,
}

export type TextGetterType = (lang: LanguageType) => string;