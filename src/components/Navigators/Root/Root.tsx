import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { getTaskToEdit } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { EXPIRED, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../utils/constants/periods";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import SwitchPopup from "../../Popups/SwitchPopup/SwitchPopup";
import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";
import TabNavigator from "../Tab/TabNavigator";

const Root: FC = () => {
  const taskToEdit = useSelector(getTaskToEdit);
  const dispatch: AppDispatch = useDispatch();
  const [addTaskModalVisible, setAddTaskModalVisible] =
    useState<boolean>(false);
  const [calendarModalVisible, setCalendarModalVisible] =
    useState<boolean>(false);
  const [reminderModalVisible, setReminderModalVisible] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [periodsState, setPeriodsState] = useState<SwitchPopupStateType>({
    [EXPIRED]: false,
    [FOR_TODAY]: true,
    [FOR_TOMORROW]: true,
    [FOR_WEEK]: true,
  });

  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = () => setModalVisible(false);

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

  useEffect(() => {
    setAddTaskModalVisible(taskToEdit ? true : false);
  }, [taskToEdit]);

  return (
    <>
      <ModalLayout visible={modalVisible} close={closeModal}>
        <SwitchPopup
          title="Категории задач"
          visible={modalVisible}
          state={periodsState}
          listType="switch"
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
          title={"Дата выполнения"}
        />
      </ModalLayout>
      <ModalLayout visible={reminderModalVisible} close={closeReminderModal}>
        <CalendarPopup
          visible={reminderModalVisible}
          closePopup={closeReminderModal}
          isReminderChoosing
          title={"Напоминание"}
        />
      </ModalLayout>
      <TabNavigator
        openAddTaskModal={openAddTaskModal}
        openModal={openModal}
        periodsState={periodsState}
      />
    </>
  );
};

export default Root;