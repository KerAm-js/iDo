import { Action } from "@reduxjs/toolkit";
import { EXPIRED, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../utils/constants/periods";

export type FOR_TODAY = 'forToday';
export type FOR_TOMORROW = 'forTomorrow';
export type FOR_WEEK = 'forWeek';
export type EXPIRED = 'expired';

export type HomePeriodsKeys = FOR_TODAY | FOR_TOMORROW | FOR_WEEK | EXPIRED;
export type PeriodsListType = Array<HomePeriodsKeys>;

export type LanguageType = 'en' | 'ru' | 'de' | 'ch';
export type ThemeType = 'light' | 'dark';

interface StringObject {
  [key: string]: any
}

export interface PeriodsType extends StringObject {
  [EXPIRED]: boolean,
  [FOR_TODAY]: boolean,
  [FOR_TOMORROW]: boolean,
  [FOR_WEEK]: boolean,
} 

export type PrefsState = {
  language: LanguageType,
  theme: ThemeType,
  periods: PeriodsType,
}

export interface PrefsAction extends Action {
  language: LanguageType,
  theme: ThemeType,
  periods: PeriodsType,
}