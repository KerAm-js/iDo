import { CalendarMonthItemType } from "../components/UI/Calendar/types";
import { CHOOSE, TODAY, TOMORROW, YESTERDAY } from "./constants/periods";
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

export const getDaysDiff = (first: Date, second: Date): number => {
  return (
    (new Date(second).setHours(0, 0, 0, 0) -
      new Date(first).setHours(0, 0, 0, 0)) /
    (1000 * 3600 * 24)
  );
};

export const isExpiredDate = (date: Date) => {
  const currDate = new Date();
  const dateCopy = new Date(date.valueOf());
  return dateCopy.setHours(0, 0, 0, 0) < currDate.setHours(0, 0, 0, 0);
};

export const isYesterday = (date: Date) => {
  const currDate = new Date();
  const dateCopy = new Date(date.valueOf());
  const yesterday = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() - 1
  );
  return dateCopy.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0);
};

export const isToday = (date: Date) => {
  const currDate = new Date();
  const dateCopy = new Date(date.valueOf());
  return currDate.setHours(0, 0, 0, 0) === dateCopy.setHours(0, 0, 0, 0);
};

export const isTomorrow = (date: Date) => {
  const currDate = new Date();
  const dateCopy = new Date(date.valueOf());
  const tomorrowDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() + 1
  );
  return dateCopy.setHours(0, 0, 0, 0) === tomorrowDate.setHours(0, 0, 0, 0);
};

export const extractCalendarState = (date: Date) => {
  if (isYesterday(date)) {
    return YESTERDAY;
  } else if (isToday(date)) {
    return TODAY;
  } else if (isTomorrow(date)) {
    return TOMORROW;
  } else {
    return CHOOSE;
  }
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

export const getMothCalendarArray = (
  month: number,
  year: number
): CalendarMonthItemType => {
  const result: CalendarMonthItemType = [[], [], [], [], [], []];
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

export const getCalendarArray = (
  fromDate: Date,
  monthsCount: number
): Array<CalendarMonthItemType> => {
  const result: Array<CalendarMonthItemType> = [];

  if (monthsCount < 0) {
    return [];
  }

  for (
    let i = fromDate.getMonth();
    i <= fromDate.getMonth() + monthsCount;
    i++
  ) {
    result.push(getMothCalendarArray(i, fromDate.getFullYear()));
  }

  return result;
};
