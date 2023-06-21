import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageIcon } from "../../../../assets/icons/languages";
import { themeIcon } from "../../../../assets/icons/theme";
import {
  setAutoReminderAction,
  setThemeAction,
} from "../../../redux/actions/prefsActions";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import PrefItem from "../../UI/PrefComponents/PrefItem/PrefItem";
import { PrefsPropType } from "./types";
import appJson from "../../../../app.json";
import { setStatusBarStyle } from "expo-status-bar";
import { bell } from "../../../../assets/icons/bell";
import { appStore } from "../../../../assets/icons/appStore";
import { Linking, Text, View } from "react-native";
import { text16, textGrey } from "../../../styles/global/texts";
import {
  setDefaultTaskDataAction,
  setLanguagePopupVisibleAction,
  setMessageAction,
} from "../../../redux/actions/popupsActions";

const Prefs: FC<PrefsPropType> = () => {
  return (
    <ScreenLayout title={languageTexts.screenTitles.prefs}>
      <PrefsContent />
    </ScreenLayout>
  );
};

const PrefsContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { language, theme, autoReminder } = useSelector(prefsSelector);

  const toggleTheme = () => {
    dispatch(setThemeAction(theme === "dark" ? "light" : "dark"));
    setStatusBarStyle(theme);
  };

  const toggleAutoReminder = useCallback(() => {
    if (!autoReminder) {
      const { title, body } = languageTexts.notifications.autoReminderEnabled;
      dispatch(setMessageAction({ title, body }));
    }
    dispatch(setAutoReminderAction(!autoReminder));
    dispatch(setDefaultTaskDataAction());
  }, [autoReminder]);

  const rateApp = () => {
    const itunesItemId = 1604538068;
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
    );
  };

  const openLanguageModal = () => {
    dispatch(setLanguagePopupVisibleAction(true));
  };

  return (
    <View style={{ height: "100%" }}>
      <PrefItem
        type="checking"
        onPress={openLanguageModal}
        title={languageTexts.popupTitles.language}
        iconXml={languageIcon(themeColors[theme].colors.text)}
        state={languageTexts.languages[language][language]}
      />
      <PrefItem
        type="switching"
        onPress={toggleTheme}
        title={languageTexts.words.nightTheme}
        iconXml={themeIcon(themeColors[theme].colors.text)}
        state={theme === "dark"}
      />
      <PrefItem
        type="switching"
        onPress={toggleAutoReminder}
        title={languageTexts.prefsTitles.autoReminder}
        iconXml={bell(themeColors[theme].colors.text)}
        state={autoReminder}
      />
      <PrefItem
        type="navigation"
        title={languageTexts.words.rateApplication}
        iconXml={appStore(themeColors[theme].colors.text)}
        onPress={rateApp}
      />
      <Text
        style={[
          text16,
          textGrey,
          {
            textAlign: "center",
            width: "100%",
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        {languageTexts.words.version[language] + " " + appJson.expo.version}
      </Text>
    </View>
  );
};

export default Prefs;
