import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageIcon } from "../../../../assets/icons/languages";
import { themeIcon } from "../../../../assets/icons/theme";
import { version } from "../../../../assets/icons/version";
import {
  setAutoReminderAction,
  setThemeAction,
} from "../../../redux/actions/prefsActions";
import {
  getAutoReminder,
  getLanguage,
  getTheme,
} from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import PrefItem from "../../UI/PrefComponents/PrefItem/PrefItem";
import { PrefsPropType } from "./types";
import appJson from "../../../../app.json";
import { setStatusBarStyle } from "expo-status-bar";
import { presentNotification } from "../../../native/notifications";
import { setDefaultNewTaskDataAction } from "../../../redux/actions/taskActions";
import { bell } from "../../../../assets/icons/bell";
import { appStore } from "../../../../assets/icons/appStore";
import { Linking, View } from "react-native";

const PrefsContent = ({
  openLanguageModal,
}: {
  openLanguageModal: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const language = useSelector(getLanguage);
  const theme = useSelector(getTheme);
  const autoReminder = useSelector(getAutoReminder);

  const toggleTheme = () => {
    dispatch(setThemeAction(theme === "dark" ? "light" : "dark"));
    setStatusBarStyle(theme);
  };

  const toggleAutoReminder = useCallback(() => {
    if (!autoReminder) {
      const { title, body } = languageTexts.notifications.autoReminderEnabled;
      presentNotification(title[language], "", body[language]);
    }
    dispatch(setAutoReminderAction(!autoReminder));
    dispatch(setDefaultNewTaskDataAction(!autoReminder));
  }, [autoReminder]);

  const rateApp = () => {
    const itunesItemId = 1604538068;
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
    );
  };

  return (
    <View>
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
      <PrefItem
        type="info"
        title={languageTexts.words.version}
        iconXml={version(themeColors[theme].colors.text)}
        state={languageTexts.words.beta[language] + " " + appJson.expo.version}
      />
    </View>
  );
};

const Prefs: FC<PrefsPropType> = React.memo(({ openLanguageModal }) => {
  return (
    <ScreenLayout title={languageTexts.screenTitles.prefs}>
      <PrefsContent openLanguageModal={openLanguageModal} />
    </ScreenLayout>
  );
});

export default Prefs;
