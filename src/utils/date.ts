import { languageTexts } from './languageTexts';

export const getDate = (lang: string, options?: { date?: Date, isShort?: boolean }) => {
  const language = languageTexts[lang];
  const date = options?.date ? options.date : new Date()
  const day = date.getDate();
  const months = options?.isShort ? language.months.shorts : language.months.fulls;
  const weekDays = options?.isShort ? language.weekDays.shorts : language.weekDays.fulls;
  return {
    date: day + " " + months[date.getMonth()],
    weekDay: weekDays[date.getDay()],
  };
};

export const isLeapYear = (year: number) => {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export const getLastDateOfCurrentMonth = () => {
  const currDate = new Date();
  return new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
}

export const geDaysToWeekEnd = () => {
  return 6 - new Date().getDay();
}