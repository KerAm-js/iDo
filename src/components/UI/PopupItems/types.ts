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
  weeks?: number,
  isChecked: boolean,
  onPress: (date: Date) => void;
}

export interface FormButtonPropType extends TextInputProps {
  style?: ViewStyle,
  textColor?: string,
  title: string,
  onPress?: () => void,
  iconXml?: string,
  iconActiveXml?: string,
  isInput?: boolean,
}
