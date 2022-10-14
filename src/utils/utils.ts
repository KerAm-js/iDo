import { texts } from "./texts"

export const getDate = (lang: string) => {
  const language = getLanguage(lang);
  const date = new Date().getDate();
  const month = language.months.fulls[new Date().getMonth()];
  const weekDay = language.weekDays.fulls[new Date().getDay() - 1];
  
  return {
    date: date + ' ' + month,
    weekDay,
  }
}

export const getLanguage = (lang: string) => {
  let language = texts.ru;

  if (lang === 'de') {
    language = texts.de;
  } else if (lang === 'en') {
    language = texts.en;
  } else if (lang === 'ch') {
    language = texts.ch;
  }

  return language;
}