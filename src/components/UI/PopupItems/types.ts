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
  state: string,
  isChecked: boolean,
  date?: Date,
  isToggleCalendarShownComponent?: boolean,
  onPress: (state: string, date?: Date) => void;
}

export type ReminderCheckItemPropType = {
  id: string,
  minutes?: number,
  hours?: number,
  days?: number,
  weeks?: number,
  isChecked: boolean,
  onPress: (id: string, date: Date) => void;
}

export interface FormButtonPropType extends TextInputProps {
  style?: ViewStyle,
  textColor?: string,
  title: string,
  onPress?: () => void,
  iconXml?: string,
  isInput?: boolean,
}
