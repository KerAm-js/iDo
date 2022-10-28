import { GestureResponderEvent } from "react-native";

export type SwithItemPropType = {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export type CheckItemPropType = {
  title: string;
  isChecked: boolean,
  onPress: (event: GestureResponderEvent) => void;
}
