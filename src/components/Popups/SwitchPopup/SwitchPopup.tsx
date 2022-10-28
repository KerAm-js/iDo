import React, { FC } from "react";
import { View } from "react-native";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import SwitchItem from "../../UI/PopupItems/SwitchItem";
import { SwitchPopupPropType } from "./types";

const SwitchPopup: FC<SwitchPopupPropType> = ({
  title,
  visible,
  listType,
  state,
  updateState,
}) => {
  const onStateChange = (key: string, value: boolean) => {
    if (listType === "switch") {
      updateState({
        ...state,
        [key]: value,
      });
    }
  };
  return <BottomPopup title={title} visible={visible}>
    <View>
      {
        Object.keys(state).map((key, index) => {
          const title = languageTexts["ru"].periods[key];
          return (
            <SwitchItem
              key={key + index}
              title={title}
              value={state[key]}
              onChange={(value) => onStateChange(key, value)}
            />
          );
        })
      }
    </View>
  </BottomPopup>;
};

export default SwitchPopup;
