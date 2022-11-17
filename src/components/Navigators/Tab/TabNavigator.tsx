import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC, useEffect, useState } from "react";
import {
  headerStyle,
  headerTitleStyle,
} from "../../../styles/header";
import { rootTabNavigatorParamList } from "./types";
import Folders from "../../screens/Folders/Folders";
import Home from "../../screens/Home/Home";
import Prefs from "../../screens/Prefs/Prefs";
import Stats from "../../screens/Stats/Stats";
import TabBar from "../../UI/TabBar/TabBar";
import { getDate } from "../../../utils/date";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { circles } from "../../../../assets/icons/circles";
import { FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../utils/constants/periods";
import SwitchPopup from "../../Popups/SwitchPopup/SwitchPopup";
import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import { useDispatch, useSelector } from "react-redux";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC = () => {
  const { taskToEdit } = useSelector(taskSelector);
  const dispatch: AppDispatch = useDispatch();
  const [addTaskModalVisible, setAddTaskModalVisible] = useState<boolean>(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [periodsState, setPeriodsState] = useState<SwitchPopupStateType>({
    [FOR_TODAY]: false,
    [FOR_TOMORROW]: false,
    [FOR_WEEK]: true,
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openAddTaskModal = () => setAddTaskModalVisible(true);
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
  }

  const closeCalendar = () => {
    setCalendarModalVisible(false);
    setAddTaskModalVisible(true);
  } 

  const { date } = getDate("ru");

  useEffect(() => {
    setAddTaskModalVisible(taskToEdit ? true : false);
  }, [taskToEdit])

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
        />
      </ModalLayout>
      <ModalLayout visible={calendarModalVisible} close={closeCalendar}>
        <CalendarPopup 
          visible={calendarModalVisible}
          closePopup={closeCalendar}
          title="Срок"
        />
      </ModalLayout>
      <Tab.Navigator
        tabBar={(props) => <TabBar onBigButtonClick={openAddTaskModal} {...props} />}
        screenOptions={{
          headerStyle,
          headerTitleStyle,
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTransparent: true,
          headerRight: () => (
            <IconButton
              onClick={openModal}
              xml={circles}
              iconWidth={23}
              iconHeight={5}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => <Home periodsState={periodsState} showSettingModal={openModal} />}
          options={{
            title: date,
            tabBarLabel: "Главная",
          }}
        />
        <Tab.Screen
          name="Folders"
          component={Folders}
          options={{ title: "Папки" }}
        />
        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{ title: "Статистика" }}
        />
        <Tab.Screen
          name="Prefs"
          component={Prefs}
          options={{ title: "Настройки" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
