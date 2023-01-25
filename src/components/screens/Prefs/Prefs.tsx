import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageIcon } from "../../../../assets/icons/languages";
import { themeIcon } from "../../../../assets/icons/theme";
import { version } from "../../../../assets/icons/version";
import {
  setAutoReminderAction,
  setCompletedTasksRemindersDisabled,
  setThemeAction,
} from "../../../redux/actions/prefsActions";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { themeColors } from "../../../styles/global/colors";
import { languageTexts } from "../../../utils/languageTexts";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";
import PrefItem from "../../UI/PrefItem/PrefItem";
import { PrefsPropType } from "./types";
import appJson from "../../../../app.json";
import { setStatusBarStyle } from "expo-status-bar";
import { bellFill } from "../../../../assets/icons/bellFill";
import { presentNotification } from "../../../native/notifications";
import { setDefaultNewTaskDataAction } from "../../../redux/actions/taskActions";
import { bellSlashFill } from "../../../../assets/icons/bellSlashFill";

const Prefs: FC<PrefsPropType> = React.memo(({ openLanguageModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const { language, theme, autoReminder, completedTasksRemindersDisabled } = useSelector(getPrefs);

  const toggleTheme = () => {
    dispatch(setThemeAction(theme === "dark" ? "light" : "dark"));
    setStatusBarStyle(theme);
  };

  const toggleAutoReminder = () => {
    if (!autoReminder) {
      const { title, body } =
        languageTexts[language].notifications.autoReminderEnabled;
      presentNotification(title, "", body);
    }
    dispatch(setAutoReminderAction(!autoReminder));
    dispatch(setDefaultNewTaskDataAction(!autoReminder));
  };

  const toggleCompletedTasksRemindersEnabled = () => {
    dispatch(setCompletedTasksRemindersDisabled(!completedTasksRemindersDisabled))
  }

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
        type="switching"
        onPress={toggleAutoReminder}
        title={languageTexts[language].prefsTitles.autoReminder}
        iconXml={bellFill(themeColors[theme].colors.text)}
        state={autoReminder}
      />
      <PrefItem
        type="switching"
        onPress={toggleCompletedTasksRemindersEnabled}
        title={languageTexts[language].prefsTitles.disableCompletedTasksReminders}
        iconXml={bellSlashFill(themeColors[theme].colors.text)}
        state={completedTasksRemindersDisabled}
      />
      <PrefItem
        type="info"
        title={languageTexts[language].words.version}
        iconXml={version(themeColors[theme].colors.text)}
        state={languageTexts[language].words.beta + " " + appJson.expo.version}
      />
    </ScreenLayout>
  );
});

export default Prefs;
