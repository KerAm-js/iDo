export type LanguageTextsType = {
  [key: string]: {
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