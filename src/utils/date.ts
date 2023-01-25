import { CalendarMonthItemType } from "../components/UI/Calendar/types";
import { LanguageType } from "../redux/types/prefs";
import { TimeType } from "../redux/types/task";
import { CHOOSE, TODAY, TOMORROW, YESTERDAY } from "./constants/periods";
import { languageTexts } from "./languageTexts";

export const reminderStateList = [
  {
    id: "0",
    minutes: 0,
  },
  {
    id: "1",
    minutes: 15,
  },
  {
    id: "2",
    minutes: 30,
  },
  {
    id: "3",
    hours: 1,
  },
  {
    id: "5",
    days: 1,
  },
  {
    id: "6",
    weeks: 1,
  },
];

export const getDate = (
  lang: LanguageType,
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

export const toFullTimeString = (date: Date) => {
  return date.toTimeString().slice(0, 8) + ":" + date.getMilliseconds();
};

export const isExpiredDate = (date: Date) => {
  const currDate = new Date();
  const dateCopy = new Date(date.valueOf());
  return dateCopy.setHours(0, 0, 0, 0) < currDate.setHours(0, 0, 0, 0);
};

export const isDayEnd = (date: Date) => {
  return (
    date.getHours() === 23 &&
    date.getMinutes() === 59 &&
    date.getSeconds() === 59
  );
};

export const getTimeStringWithSecondsConverting = (date: Date) => {
  if (date.getSeconds() === 59 && date.getMilliseconds() === 999) {
    return new Date(date.valueOf() + 1).toTimeString().slice(0, 5);
  }
  return new Date(date.valueOf()).toTimeString().slice(0, 5);
};

export const isYesterday = (date: Date, defaultDate?: number) => {
  const currDate = defaultDate ? new Date(defaultDate) : new Date();
  const dateCopy = new Date(date.valueOf());
  const yesterday = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() - 1
  );
  return dateCopy.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0);
};

export const isToday = (date: Date, defaultDate?: number) => {
  const currDate = defaultDate ? new Date(defaultDate) : new Date();
  const dateCopy = new Date(date.valueOf());
  return currDate.setHours(0, 0, 0, 0) === dateCopy.setHours(0, 0, 0, 0);
};

export const isTheSameDate = (first: number, second: number) => {
  return (
    new Date(first).setHours(0, 0, 0, 0) ===
    new Date(second).setHours(0, 0, 0, 0)
  );
};

export const isTomorrow = (date: Date, defaultDate?: number) => {
  const currDate = defaultDate ? new Date(defaultDate) : new Date();
  const dateCopy = new Date(date.valueOf());
  const tomorrowDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() + 1
  );
  return dateCopy.setHours(0, 0, 0, 0) === tomorrowDate.setHours(0, 0, 0, 0);
};

export const getNextDate = (date?: number): number => {
  const dateCopy = date ? new Date(date) : new Date();
  const tomorrowDate = dateCopy.setDate(dateCopy.getDate() + 1);
  return tomorrowDate;
};

export const isWeeklyTime = (date: Date, defaultDate?: number) => {
  const currDate = defaultDate ? new Date(defaultDate) : new Date();
  const dateCopy = new Date(date.valueOf());

  const [currWeekDay, currDay] = [currDate.getDay(), currDate.getDate()];

  let timeBound = 8 - currWeekDay;

  if (currWeekDay === 0) {
    timeBound = 8;
  } else if (currWeekDay === 6) {
    timeBound = 9;
  }

  const daysDiff = getDaysDiff(currDate, dateCopy);

  if (daysDiff < 0 || daysDiff > timeBound) {
    return false;
  }

  const result =
    date.valueOf() <
      new Date(dateCopy.setHours(0, 0, 0, 0)).setDate(currDay + timeBound) &&
    date.valueOf() >= new Date().setHours(0, 0, 0, 0);

  return result;
};

export const toMonthYearString = ({
  date,
  language,
}: {
  date: Date;
  language: LanguageType;
}) => {
  return getMonthName(language, date.getMonth()) + " " + date.getFullYear();
};

export const toLocaleStateString = ({
  dateValue,
  language,
  timeType,
  hideStateDays,
  defaultDate
}: {
  defaultDate?: number,
  dateValue: number;
  language: LanguageType;
  timeType?: TimeType;
  hideStateDays?: boolean;
}) => {
  const { periods } = languageTexts[language];
  const date = new Date(dateValue);
  const time = date.toTimeString().slice(0, 5);
  const isCurrentYear = date.getFullYear() === new Date().getFullYear();
  let dayString = "";

  if (isYesterday(date, defaultDate) && !hideStateDays) {
    dayString = periods.yesterday;
  } else if (isToday(date, defaultDate) && !hideStateDays) {
    dayString = periods.today;
  } else if (isTomorrow(date, defaultDate) && !hideStateDays) {
    dayString = periods.tomorrow;
  } else if (isWeeklyTime(date, defaultDate)) {
    dayString = getDate(language, { date }).weekDay;
  } else {
    dayString =
      getDate(language, { date }).date +
      (!isCurrentYear ? " " + date.getFullYear() : "");
  }

  return dayString + (timeType === "time" ? ", " + time : "");
};

export const extractReminderState = (defaultDate: Date, remindDate: number) => {
  const defaultState = reminderStateList[0].id;
  const diff = defaultDate.valueOf() - remindDate;

  if (diff <= 0) {
    return defaultState;
  }

  const days = diff / (1000 * 3600 * 24);
  const hours = diff / (1000 * 3600);
  const minutes = diff / (1000 * 60);

  if (days === 7) {
    return (
      reminderStateList.find((item) => item.weeks === 1)?.id ||
      reminderStateList[0].id
    );
  } else if (days === 1) {
    return (
      reminderStateList.find((item) => item.days === 1)?.id ||
      reminderStateList[0].id
    );
  } else if (hours === 1) {
    return (
      reminderStateList.find((item) => item.hours === 1)?.id ||
      reminderStateList[0].id
    );
  } else if (hours === 3) {
    return (
      reminderStateList.find((item) => item.hours === 3)?.id ||
      reminderStateList[0].id
    );
  } else if (minutes === 30) {
    return (
      reminderStateList.find((item) => item.minutes === 30)?.id ||
      reminderStateList[0].id
    );
  } else if (minutes === 0) {
    return reminderStateList[0].id;
  } else {
    return CHOOSE;
  }
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

export const getMonthName = (lang: LanguageType, month: number) => {
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
