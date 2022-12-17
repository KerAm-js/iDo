import React, { FC } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguageAction } from "../../../redux/actions/prefsActions";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { LanguageType } from "../../../redux/types/prefs";
import { lagnuages, languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import CheckItem from "../../UI/PopupItems/CheckItem";
import { CheckPopupPropType } from "./types";

const LanguagePopup: FC<CheckPopupPropType> = ({
  title,
  visible,
}) => {

  const language = useSelector(getLanguage);
  const dispatch = useDispatch<AppDispatch>();

  const onCheck = (lang: LanguageType) => {
    dispatch(updateLanguageAction(lang));
  };

  return <BottomPopup title={title} visible={visible}>
    <View>
      {
        lagnuages.map((lang) => {
          return (
            <CheckItem
              key={lang}
              title={languageTexts[language].languages[lang]}
              onPress={() => onCheck(lang)}
              isChecked={language === lang}
            />
          )
        })
      }
    </View>
  </BottomPopup>;
};

export default LanguagePopup;
