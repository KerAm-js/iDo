import { FOR_TODAY, FOR_TOMORROW, FOR_WEEK, EXPIRED } from '../utils/constants/periods';

export type LanguageTextsType = {
  [key: string]: {
    sectionEmptyList: {
      [key: string]: string,
      [FOR_TODAY]: string,
      [FOR_TOMORROW]: string,
      [FOR_WEEK]: string,
      [EXPIRED]: string,
    },
    popupTitles: {
      taskCategories: string,
      dateOfCompletion: string,
      reminder: string,
      language: string,
    }
    screenTitles: {
      main: string,
      preferences: string,
    },
    words: {
      [key: string]: string,
    }
    weekDays: {
      fulls: Array<string>,
      shorts: Array<string>
    },
    months: {
      names: Array<string>,
      fulls: Array<string>,
      shorts: Array<string>
    },
    periods: {
      [key: string]: string,
    },
    languages: Languages
  },
}

export type Languages = {
  en: string,
  ru: string,
  de: string,
  ch: string,
}