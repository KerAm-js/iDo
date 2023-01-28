import React, { FC } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { updateLanguageAction } from "../../../redux/actions/prefsActions";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { LanguageType } from "../../../redux/types/prefs";
import { lagnuages, languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import LangItem from "./LangItem";
import { CheckPopupPropType } from "./types";


const LanguagePopup: FC<CheckPopupPropType> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onCheck = (lang: LanguageType) => {
    dispatch(updateLanguageAction(lang));
  };

  return (
    <BottomPopup title={languageTexts.popupTitles.language} visible={visible}>
      <View>
        {lagnuages.map((lang) => {
          return <LangItem key={lang} lang={lang} onCheck={onCheck} />;
        })}
      </View>
    </BottomPopup>
  );
};

export default LanguagePopup;
