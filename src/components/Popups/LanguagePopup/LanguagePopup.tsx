import React, { FC } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLanguagePopupVisibleAction } from "../../../redux/actions/popupsActions";
import { updateLanguageAction } from "../../../redux/actions/prefsActions";
import { popupsSelector } from "../../../redux/selectors/popupsSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { LanguageType } from "../../../redux/types/prefs";
import { lagnuages, languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import LangItem from "./LangItem";
import { CheckPopupPropType } from "./types";

const LanguagePopup: FC<CheckPopupPropType> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { languagePopupVisible: visible } = useSelector(popupsSelector)
  const onCheck = (lang: LanguageType) => {
    dispatch(updateLanguageAction(lang));
  };

  const close = () => {
    dispatch(setLanguagePopupVisibleAction(false));
  }

  return (
    <ModalLayout visible={visible} close={close} >
      <BottomPopup title={languageTexts.popupTitles.language} visible={visible}>
        <View>
          {lagnuages.map((lang) => {
            return <LangItem key={lang} lang={lang} onCheck={onCheck} />;
          })}
        </View>
      </BottomPopup>
    </ModalLayout>
  );
};

export default LanguagePopup;
