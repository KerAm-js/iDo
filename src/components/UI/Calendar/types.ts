import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

export type DateBusynessType = {
  hasCompleted: boolean,
  hasUncompleted: boolean,
  hasExpired: boolean,
}

export type DateItemPropType = {
  data: DateItemType;
  isSelected: boolean;
  busyness?: DateBusynessType,
  isCardBackgroundColor?: boolean,
  onClick: (date: Date) => void;
};

export type DateItemType = {
  date: Date;
  isCurrentMonth: boolean;
};

export type CalendarPropType = {
  date: Date;
  setDate: (date: Date) => void;
  setGlobalTitle?: (title: string) => void;
  isCardBackgroundColor?: boolean;
};

export type ListPropType = {
  state: Array<CalendarMonthItemType>;
  date: Date;
  reference: { current: FlatList | null };
  setDate: (date: Date) => void;
  onScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isCardBackgroundColor?: boolean;
};

export type CalendarMonthItemType = Array<Array<DateItemType>>;
