import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageIcon } from "../../../../assets/icons/languages";
import { themeIcon } from "../../../../assets/icons/theme";
import { version } from "../../../../assets/icons/version";
import { toggleThemeAction } from "../../../redux/actions/prefsActions";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import PrefItem from "../../UI/PrefItem/PrefItem";
import { PrefsPropType } from "./types";

const Prefs: FC<PrefsPropType> = React.memo(({ openLanguageModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const { language, theme } = useSelector(getPrefs);

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return (
    <ScreenLayout title={languageTexts[language].screenTitles.preferences}>
      <PrefItem
        type="checking"
        onPress={openLanguageModal}
        title={languageTexts[language].popupTitles.language}
        iconXml={languageIcon(themeColors[theme].colors.text)}
        state={languageTexts[language].languages[language]}
      />
      <PrefItem
        type="switching"
        onPress={toggleTheme}
        title={languageTexts[language].words.nightTheme}
        iconXml={themeIcon(themeColors[theme].colors.text)}
        state={theme === "dark"}
      />
      <PrefItem
        type="info"
        title={languageTexts[language].words.version}
        iconXml={version(themeColors[theme].colors.text)}
        state={languageTexts[language].words.beta + ' 2.0'}
      />
    </ScreenLayout>
  );
});

export default Prefs;
