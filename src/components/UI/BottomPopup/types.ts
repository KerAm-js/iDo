import { FOR_TODAY, FOR_TOMORROW, FOR_WEEK, FOR_MONTH } from './../../../utils/constants';
import { Languages } from '../../../types/data/languageTexts';
import { Dispatch, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native";

export type BottomPopupPropType<ListType extends "switch" | "check"> =
  ListType extends "switch"
    ? {
        visible: boolean;
        title: string;
        listType: 'switch';
        list: null;
        state: HomePeriodsState;
        updateState: Dispatch<SetStateAction<HomePeriodsState>>;
      }
    : {
        visible: boolean;
        title: string;
        listType: 'check';
        list: Array<keyof Languages>;
        state: string;
        updateState: Dispatch<SetStateAction<keyof Languages>>;
      };

export type HomePeriodsState = {
  [key: string]: boolean,
  [FOR_TODAY]: boolean,
  [FOR_TOMORROW]: boolean,
  [FOR_WEEK]: boolean,
  [FOR_MONTH]: boolean,
};

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
