import React, { FC } from "react";
import { View } from "react-native";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CheckItem from "../../UI/PopupItems/CheckItem";
import { CheckPopupPropType } from "./types";

const CheckPopup: FC<CheckPopupPropType> = ({
  title,
  visible,
  list,
  state,
  updateState,
}) => {
  const onCheck = (value: any) => {
    updateState(value);
  };
  return <BottomPopup title={title} visible={visible}>
    <View>
      {
        list.map((lang) => {
          return (
            <CheckItem
              key={lang.title}
              title={lang.title}
              onPress={() => onCheck(lang.value)}
              isChecked={state === lang.value}
            />
          )
        })
      }
    </View>
  </BottomPopup>;
};

export default CheckPopup;
