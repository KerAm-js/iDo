export type FOR_TODAY_TYPE = 'forToday';
export type FOR_TOMORROW_TYPE = 'forTomorrow';
export type FOR_WEEK_TYPE = 'forWeek';
export type EXPIRED_TYPE = 'expired';
export type CALENDAR_DAY_TYPE = 'calendarDay';

export type HomePeriodsKeys = FOR_TODAY_TYPE | FOR_TOMORROW_TYPE | FOR_WEEK_TYPE | EXPIRED_TYPE | CALENDAR_DAY_TYPE;
export type PeriodsListType = Array<HomePeriodsKeys>;