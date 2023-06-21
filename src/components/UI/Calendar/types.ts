import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

export type DatesObjetType = {
  [key: string]: DateBusynessType | undefined;
};

export type DateBusynessType = {
  hasCompleted: boolean;
  hasUncompleted: boolean;
  hasExpired: boolean;
};

export type DayPropType = {
  date?: Date;
  setDate?: (date: Date) => void;
  data: DayType;
  isChoosed: boolean;
  busyness?: DateBusynessType;
  busynessShown?: boolean;
  isCardBackgroundColor?: boolean;
  pastDatesShown?: boolean;
};

export type DayType = {
  date: Date;
  isCurrentMonth: boolean;
};

export type WeekPropType = {
  date?: Date;
  setDate?: (date: Date) => void;
  line: DayType[];
  isCardBackgroundColor?: boolean;
  pastDatesShown?: boolean;
  busynessShown?: boolean;
  datesObject: DatesObjetType;
};

export type MonthPropType = {
  date?: Date;
  setDate?: (date: Date) => void;
  item: CalendarMonthItemType;
  isCardBackgroundColor?: boolean;
  pastDatesShown?: boolean;
  busynessShown?: boolean;
  datesObject: DatesObjetType;
};

export type CalendarPropType = {
  date?: Date;
  setDate?: (date: Date) => void;
  setGlobalTitle?: (title: string) => void;
  isCardBackgroundColor?: boolean;
  pastDatesShown?: boolean;
  busynessShown?: boolean;
  bottomShadow?: boolean;
};

export type ListPropType = {
  state: Array<CalendarMonthItemType>;
  date?: Date;
  setDate?: (date: Date) => void;
  reference: { current: FlatList | null };
  onScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isCardBackgroundColor?: boolean;
  pastDatesShown?: boolean;
  busynessShown?: boolean;
};

export type CalendarMonthItemType = Array<Array<DayType>>;
