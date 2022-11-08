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

export type CalendarMonthItemType = Array<Array<DateItemType>>