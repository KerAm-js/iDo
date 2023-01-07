import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { getTaskToEdit } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import LanguagePopup from "../../Popups/LanguagePopup/LanguagePopup";
import { languageTexts } from "../../../utils/languageTexts";
import TabNavigator from "../Tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { themeColors } from "../../../styles/global/colors";
import { RootPropType } from "./types";
import { StatusBar } from "expo-status-bar";

const Root: FC<RootPropType> = ({ onAppReady }) => {
  const taskToEdit = useSelector(getTaskToEdit);
  const { language, theme } = useSelector(getPrefs);
  const dispatch: AppDispatch = useDispatch();
  const [addTaskModalVisible, setAddTaskModalVisible] =
    useState<boolean>(false);
  const [calendarModalVisible, setCalendarModalVisible] =
    useState<boolean>(false);
  const [reminderModalVisible, setReminderModalVisible] =
    useState<boolean>(false);
  const [languageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);
  const didAllAddTaskModalsClosed = useRef<boolean>(true);

  const openAddTaskModal = useCallback(() => {
    setAddTaskModalVisible(true);
    didAllAddTaskModalsClosed.current = false;
  }, []);
  const closeAddTaskModal = () => {
    if (taskToEdit) {
      dispatch(chooseTaskToEditAction(undefined));
    }
    setAddTaskModalVisible(false);
    didAllAddTaskModalsClosed.current = true;
  };

  const openCalendar = useCallback(() => {
    setAddTaskModalVisible(false);
    setCalendarModalVisible(true);
  }, []);

  const closeCalendar = useCallback(() => {
    setCalendarModalVisible(false);
    setAddTaskModalVisible(true);
  }, []);

  const openReminderModal = useCallback(() => {
    setAddTaskModalVisible(false);
    setReminderModalVisible(true);
  }, []);

  const closeReminderModal = useCallback(() => {
    setReminderModalVisible(false);
    setAddTaskModalVisible(true);
  }, []);

  const openLanguageModal = useCallback(
    () => setLanguageModalVisible(true),
    []
  );
  const closeLanguageModal = useCallback(
    () => setLanguageModalVisible(false),
    []
  );

  useEffect(() => {
    if (taskToEdit) {
      openAddTaskModal();
    } else {
      closeAddTaskModal();
    }
  }, [taskToEdit]);

  const onReady = useCallback(() => {
    onAppReady(theme === 'light' ? "dark" : "light")
  }, [])

  return (
    <NavigationContainer onReady={onReady} theme={themeColors[theme]}>
      <StatusBar animated style={theme === 'light' ? "dark" : "light"} />
      <ModalLayout visible={addTaskModalVisible} close={closeAddTaskModal}>
        <AddTaskPopup
          visible={addTaskModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          handleKeyboard={true}
          openCalendar={openCalendar}
          openReminderModal={openReminderModal}
        />
      </ModalLayout>
      <ModalLayout visible={calendarModalVisible} close={closeCalendar}>
        <CalendarPopup
          visible={calendarModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          closePopup={closeCalendar}
          title={languageTexts[language].popupTitles.dateOfCompletion}
        />
      </ModalLayout>
      <ModalLayout visible={reminderModalVisible} close={closeReminderModal}>
        <CalendarPopup
          visible={reminderModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          closePopup={closeReminderModal}
          isReminderChoosing
          hasDeleteButton
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
        openLanguageModal={openLanguageModal}
      />
    </NavigationContainer>
  );
};

export default Root;
