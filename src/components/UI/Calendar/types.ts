import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native"

export type DateItemPropType = {
  data: DateItemType,
  isSelected: boolean,
  onClick: (date: Date) => void,
}

export type DateItemType = {
  date: Date,
  isCurrentMonth: boolean,
}

export type CalendarPropType = {
  date: Date,
  setDate: (date: Date) => void
}

export type ListPropType = {
  state: Array<CalendarMonthItemType>;
  date: Date;
  reference: {current: FlatList | null}
  setDate: (date: Date) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export type CalendarMonthItemType = Array<Array<DateItemType>>