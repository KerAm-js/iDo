import React, { FC } from "react";
import { View } from "react-native";
import { Languages } from "../../../types/data/languageTexts";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CheckItem from "../../UI/PopupItems/CheckItem";
import { CheckPopupPropType } from "./types";

const CheckPopup: FC<CheckPopupPropType> = ({
  title,
  visible,
  listType,
  list,
  state,
  updateState,
}) => {
  const onCheck = (value: keyof Languages) => {
    if (listType === "check") {
      updateState(value);
    }
  };
  return <BottomPopup title={title} visible={visible}>
    <View>
      {
        list.map((lang, index) => {
          return (
            <CheckItem
              key={lang + index}
              title={languageTexts['ru'].languages[lang]}
              onPress={() => onCheck(lang)}
              isChecked={state === lang}
            />
          )
        })
      }
    </View>
  </BottomPopup>;
};

export default CheckPopup;
