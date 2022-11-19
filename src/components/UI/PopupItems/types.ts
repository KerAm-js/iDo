import { TextInput, TextInputProps, ViewStyle } from "react-native";

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
  date?: Date,
  isToggleCalendarShownComponent?: boolean,
  onPress: () => void;
}

export type ReminderCheckItemPropType = {
  minutes?: number,
  hours?: number,
  days?: number,
  isChecked: boolean,
  date: Date,
  onPress: (date: Date) => void;
}

export interface ButtonPropType extends TextInputProps {
  style?: ViewStyle,
  title: string,
  onPress?: () => void,
  iconXml?: string,
  iconActiveXml?: string,
  isInput?: boolean,
}
