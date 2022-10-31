import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC, useState } from "react";
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
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "../../../utils/constants";
import SwitchPopup from "../../Popups/SwitchPopup/SwitchPopup";
import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC = () => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [periodsState, setPeriodsState] = useState<SwitchPopupStateType>({
    [FOR_TODAY]: true,
    [FOR_TOMORROW]: false,
    [FOR_WEEK]: false,
    [FOR_MONTH]: false,
  });

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const showAddTaskModal = () => setAddTaskModalVisible(true);
  const closeAddTaskModal = () => setAddTaskModalVisible(false);

  const { date } = getDate("ru");

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
        />
      </ModalLayout>
      <Tab.Navigator
        tabBar={(props) => <TabBar onBigButtonClick={showAddTaskModal} {...props} />}
        screenOptions={{
          headerStyle,
          headerTitleStyle,
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTransparent: true,
          headerRight: () => (
            <IconButton
              onClick={showModal}
              xml={circles}
              iconWidth={23}
              iconHeight={5}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => <Home periodsState={periodsState} showSettingModal={showModal} />}
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
