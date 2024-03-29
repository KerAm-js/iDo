import { TextInput, TextInputProps, ViewStyle } from "react-native";
import { LangObjectType, TextGetterType } from "../../../types/global/LangObject";

export type SwithItemPropType = {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export type CheckItemPropType = {
  title: LangObjectType;
  isChecked: boolean,
  onPress: () => void;
}

export type DateCheckItemPropType = {
  title: LangObjectType | TextGetterType;
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
  title: LangObjectType | TextGetterType;
  onPress?: () => void,
  iconXml?: string,
  isInput?: boolean,
}

export type CalendarDateIconPropType = {
  date: Date,
  color: string,
  size?: 'small' | 'regular'
}