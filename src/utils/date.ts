import { CalendarItemType } from "./../types/calendar";
import { languageTexts } from "./languageTexts";

export const getDate = (
  lang: string,
  options?: { date?: Date; isShort?: boolean }
) => {
  const language = languageTexts[lang];
  const date = options?.date ? options.date : new Date();
  const day = date.getDate();
  const months = options?.isShort
    ? language.months.shorts
    : language.months.fulls;
  const weekDays = options?.isShort
    ? language.weekDays.shorts
    : language.weekDays.fulls;
  return {
    date: day + " " + months[date.getMonth()],
    weekDay: weekDays[date.getDay()],
  };
};

export const getMonthName = (lang: string, month: number) => {
  const language = languageTexts[lang];
  return language?.months?.names[month] || language?.months?.fulls[month];
};

export const isLeapYear = (year: number) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

export const getLastDateOfCurrentMonth = () => {
  const currDate = new Date();
  return new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
};

export const geDaysToWeekEnd = () => {
  return 6 - new Date().getDay();
};

export const getCalendarArray = (
  month: number,
  year: number
): CalendarItemType => {
  const result: CalendarItemType = [[], [], [], [], [], []];
  const firstWeekDayOfMonth = new Date(year, month, 1).getDay() || 7;
  let isCurrentMonth = false;

  for (let i = 0; i < 42; i++) {
    const line = Math.floor(i / 7);
    const date = new Date(year, month, i - firstWeekDayOfMonth + 2);

    if (line === 0 && date.getDate() === 1) isCurrentMonth = true;
    else if (line > 0 && date.getDate() === 1) isCurrentMonth = false;

    result[line][i - line * 7] = {
      date,
      isCurrentMonth,
    };
  }

  return result;
};
