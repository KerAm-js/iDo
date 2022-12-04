import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguageAction } from "../../../redux/actions/prefsActions";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { getPrefs } from "../../../redux/selectors/prefsSelectors";
import { getTasks, getTaskToEdit } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { LanguageType } from "../../../redux/types/prefs";
import {
  EXPIRED,
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
} from "../../../utils/constants/periods";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import CheckPopup from "../../Popups/CheckPopup/CheckPopup";
import SwitchPopup from "../../Popups/SwitchPopup/SwitchPopup";
import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";
import { lagnuages, languageTexts } from "../../../utils/languageTexts";
import TabNavigator from "../Tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { themeColors } from "../../../styles/global/colors";
import { scheduleTaskExpiration } from "../../../redux/actions/taskActions";

const Root: FC = () => {
  const taskToEdit = useSelector(getTaskToEdit);
  const tasks = useSelector(getTasks);
  const { language, theme } = useSelector(getPrefs);
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
  const [periodsState, setPeriodsState] = useState<SwitchPopupStateType>({
    [EXPIRED]: false,
    [FOR_TODAY]: true,
    [FOR_TOMORROW]: false,
    [FOR_WEEK]: false,
  });

  const languagesList = lagnuages.map((key) => ({
    title: languageTexts[language].languages[key],
    value: key,
  }));

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

  const updateLanguage = (value: LanguageType) => {
    dispatch(updateLanguageAction(value));
  };

  useEffect(() => {
    setAddTaskModalVisible(taskToEdit ? true : false);
  }, [taskToEdit]);

  useEffect(() => {
    tasks.forEach(task => scheduleTaskExpiration(task, dispatch));
  }, []);

  return (
    <NavigationContainer theme={themeColors[theme]}>
      <ModalLayout visible={peridosModalVisible} close={closePeriodsModal}>
        <SwitchPopup
          title={languageTexts[language].popupTitles.taskCategories}
          visible={peridosModalVisible}
          state={periodsState}
          list={null}
          updateState={setPeriodsState}
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
        <CheckPopup
          title={languageTexts[language].popupTitles.language}
          visible={languageModalVisible}
          state={language}
          updateState={updateLanguage}
          list={languagesList}
        />
      </ModalLayout>
      <TabNavigator
        openAddTaskModal={openAddTaskModal}
        openModal={openPeriodsModal}
        openLanguageModal={openLanguageModal}
        periodsState={periodsState}
      />
    </NavigationContainer>
  );
};

export default Root;
