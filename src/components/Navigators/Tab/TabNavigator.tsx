import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC, useState } from "react";
import {
  headerBackgroundStyle,
  headerStyle,
  headerTitleStyle,
} from "../../../styles/header";
import { rootTabNavigatorParamList } from "./types";
import Folders from "../../screens/Folders/Folders";
import Home from "../../screens/Home/Home";
import Prefs from "../../screens/Prefs/Prefs";
import Stats from "../../screens/Stats/Stats";
import TabBar from "../../UI/TabBar/TabBar";
import { getDate } from "../../../utils/utils";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import BottomPopup from "../../UI/BottomPopup/BottomPopup";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { circles } from "../../../../assets/icons/circles";
import { SwitchItemsState } from "../../UI/BottomPopup/types";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [periodsState, setPeriodsState] = useState<SwitchItemsState>({
    today: true,
    tomorrow: true,
    week: false,
    month: false,
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const { date } = getDate("ru");

  return (
    <>
      <ModalLayout visible={modalVisible} close={closeModal}>
        <BottomPopup
          title="Категории задач"
          visible={modalVisible}
          state={periodsState}
          listType="switch"
          list={null}
          updateState={setPeriodsState}
        />
      </ModalLayout>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerStyle,
          headerTitleStyle,
          headerBackgroundContainerStyle: headerBackgroundStyle,
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
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
          children={() => <Home showSettingModal={showModal} />}
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
