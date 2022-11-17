import { AnimatedStyle } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";

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

export type ButtonPropType = {
  title: string,
  onPress?: () => void,
  iconXml?: string,
  iconActiveXml?: string,
  isInput?: boolean,
  inputValue?: string,
  onFocus?: () => void,
  onInputChange?: (value: string) => void,
}
