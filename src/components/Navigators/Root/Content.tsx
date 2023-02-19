import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { getTaskToEdit } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { languageTexts } from "../../../utils/languageTexts";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import LanguagePopup from "../../Popups/LanguagePopup/LanguagePopup";
import ReminderPopup from "../../Popups/ReminderPopup/ReminderPopup";
import TabNavigator from "../Tab/TabNavigator";

const RootContent = () => {
  const taskToEdit = useSelector(getTaskToEdit);
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
  const closeAddTaskModal = useCallback(() => {
    if (taskToEdit) {
      dispatch(chooseTaskToEditAction(undefined));
    }
    setAddTaskModalVisible(false);
    didAllAddTaskModalsClosed.current = true;
  }, [taskToEdit]);

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

  return (
    <>
      <ModalLayout visible={addTaskModalVisible} close={closeAddTaskModal}>
        <AddTaskPopup
          key="addTask"
          visible={addTaskModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          handleKeyboard={true}
          openCalendar={openCalendar}
          openReminderModal={openReminderModal}
        />
      </ModalLayout>
      <ModalLayout visible={calendarModalVisible} close={closeCalendar}>
        <CalendarPopup
          key="taskTime"
          visible={calendarModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          closePopup={closeCalendar}
          title={languageTexts.popupTitles.dateOfCompletion}
        />
      </ModalLayout>
      <ModalLayout visible={reminderModalVisible} close={closeReminderModal}>
        <ReminderPopup
          key="taskReminder"
          visible={reminderModalVisible}
          setDefaultsFlag={didAllAddTaskModalsClosed}
          closePopup={closeReminderModal}
          hasDeleteButton
          title={languageTexts.popupTitles.reminder}
        />
      </ModalLayout>
      <ModalLayout visible={languageModalVisible} close={closeLanguageModal}>
        <LanguagePopup visible={languageModalVisible} />
      </ModalLayout>
      <TabNavigator
        openAddTaskModal={openAddTaskModal}
        openLanguageModal={openLanguageModal}
      />
    </>
  );
};

export default React.memo(RootContent);
