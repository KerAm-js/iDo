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
        state: SwitchItemsState;
        updateState: Dispatch<SetStateAction<SwitchItemsState>>;
      }
    : {
        visible: boolean;
        title: string;
        listType: 'check';
        list: Array<keyof Languages>;
        state: string;
        updateState: Dispatch<SetStateAction<keyof Languages>>;
      };

export type SwitchItemsState = {
  [key: string]: boolean;
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
