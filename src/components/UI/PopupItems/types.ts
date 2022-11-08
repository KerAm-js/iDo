export type SwithItemPropType = {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export type CheckItemPropType = {
  title: string;
  isChecked: boolean,
  onPress: () => void;
}

export type DateCheckItemPropType = {
  title: string;
  isChecked: boolean,
  calendarShown?: boolean,
  date?: Date,
  isToggleCalendarShownComponent?: boolean,
  onPress: () => void;
}

export type ButtonPropType = {
  title: string,
  onPress?: () => void,
  iconXml?: string,
  iconActiveXml?: string,
  isInput?: boolean,
  inputValue?: string,
  onInputChange?: (value: string) => void,
}
