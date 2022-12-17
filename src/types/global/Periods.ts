export type FOR_TODAY = 'forToday';
export type FOR_TOMORROW = 'forTomorrow';
export type FOR_WEEK = 'forWeek';
export type EXPIRED = 'expired';

export type HomePeriodsKeys = FOR_TODAY | FOR_TOMORROW | FOR_WEEK | EXPIRED;
export type PeriodsListType = Array<HomePeriodsKeys>;