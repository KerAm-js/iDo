import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeAction } from "../../../redux/actions/prefsActions";
import {
  chooseTaskToEditAction,
  getGesturePositionsFromAsyncStorage,
  getTasksFromLocalDB,
} from "../../../redux/actions/taskActions";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { getTaskToEdit } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import LanguagePopup from "../../Popups/LanguagePopup/LanguagePopup";
import PeriodsPopup from "../../Popups/PeriodsPopup/PeriodsPopup";
import { languageTexts } from "../../../utils/languageTexts";
import TabNavigator from "../Tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { themeColors } from "../../../styles/global/colors";
import { useColorScheme } from "react-native";
import { RootPropType } from "./types";

const Root: FC<RootPropType> = ({ onAppReady }) => {
  const taskToEdit = useSelector(getTaskToEdit);
  const { language, theme } = useSelector(getPrefs);
  const systemTheme = useColorScheme();
  const dispatch: AppDispatch = useDispatch();
  const [addTaskModalVisible, setAddTaskModalVisible] =
    useState<boolean>(false);
  const [calendarModalVisible, setCalendarModalVisible] =
    useState<boolean>(false);
  const [reminderModalVisible, setReminderModalVisible] =
    useState<boolean>(false);
  const [peridosModalVisible, setPeriodsModalVisible] =
    useState<boolean>(false);
  const [languageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);

  const openPeriodsModal = useCallback(() => setPeriodsModalVisible(true), []);
  const closePeriodsModal = () => setPeriodsModalVisible(false);

  const openAddTaskModal = useCallback(() => setAddTaskModalVisible(true), []);
  const closeAddTaskModal = () => {
    if (taskToEdit) {
      dispatch(chooseTaskToEditAction(undefined));
    } else {
      setAddTaskModalVisible(false);
    }
  };

  const openCalendar = () => {
    setAddTaskModalVisible(false);
    setCalendarModalVisible(true);
  };

  const closeCalendar = () => {
    setCalendarModalVisible(false);
    setAddTaskModalVisible(true);
  };

  const openReminderModal = () => {
    setAddTaskModalVisible(false);
    setReminderModalVisible(true);
  };

  const closeReminderModal = () => {
    setReminderModalVisible(false);
    setAddTaskModalVisible(true);
  };

  const openLanguageModal = useCallback(
    () => setLanguageModalVisible(true),
    []
  );
  const closeLanguageModal = () => setLanguageModalVisible(false);

  useEffect(() => {
    setAddTaskModalVisible(taskToEdit ? true : false);
  }, [taskToEdit]);

  useEffect(() => {
    dispatch(setThemeAction(systemTheme));
    dispatch(getTasksFromLocalDB());
    dispatch(getGesturePositionsFromAsyncStorage());
  }, []);

  return (
    <NavigationContainer onReady={onAppReady} theme={themeColors[theme]}>
      <ModalLayout visible={peridosModalVisible} close={closePeriodsModal}>
        <PeriodsPopup
          title={languageTexts[language].popupTitles.taskCategories}
          visible={peridosModalVisible}
          list={null}
        />
      </ModalLayout>
      <ModalLayout visible={addTaskModalVisible} close={closeAddTaskModal}>
        <AddTaskPopup
          visible={addTaskModalVisible}
          handleKeyboard={true}
          openCalendar={openCalendar}
          openReminderModal={openReminderModal}
        />
      </ModalLayout>
      <ModalLayout visible={calendarModalVisible} close={closeCalendar}>
        <CalendarPopup
          visible={calendarModalVisible}
          closePopup={closeCalendar}
          title={languageTexts[language].popupTitles.dateOfCompletion}
        />
      </ModalLayout>
      <ModalLayout visible={reminderModalVisible} close={closeReminderModal}>
        <CalendarPopup
          visible={reminderModalVisible}
          closePopup={closeReminderModal}
          isReminderChoosing
          title={languageTexts[language].popupTitles.reminder}
        />
      </ModalLayout>
      <ModalLayout visible={languageModalVisible} close={closeLanguageModal}>
        <LanguagePopup
          title={languageTexts[language].popupTitles.language}
          visible={languageModalVisible}
        />
      </ModalLayout>
      <TabNavigator
        openAddTaskModal={openAddTaskModal}
        openModal={openPeriodsModal}
        openLanguageModal={openLanguageModal}
      />
    </NavigationContainer>
  );
};

export default Root;
