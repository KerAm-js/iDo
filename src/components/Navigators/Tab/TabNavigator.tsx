import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC, useCallback } from "react";
import { headerStyle, headerTitleStyle } from "../../../styles/header";
import { rootTabNavigatorParamList } from "./types";
import Folders from "../../screens/Folders/Folders";
import Home from "../../screens/Home/Home";
import Prefs from "../../screens/Prefs/Prefs";
import Stats from "../../screens/Stats/Stats";
import TabBar from "../../UI/TabBar/TabBar";
import { getDate } from "../../../utils/date";
import IconButton from "../../UI/buttons/IconButton/IconButton";
import { circles } from "../../../../assets/icons/circles";
import { SwitchPopupStateType } from "../../Popups/SwitchPopup/types";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC<{
  openAddTaskModal: () => void;
  openModal: () => void;
  periodsState: SwitchPopupStateType;
}> = React.memo(({ periodsState, openModal, openAddTaskModal }) => {
  const { date } = getDate("ru");
  
  const renderHome = () => <Home periodsState={periodsState} showSettingModal={openModal} />

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabBar onBigButtonClick={openAddTaskModal} {...props} />
      )}
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
        children={renderHome}
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
  );
});

export default TabNavigator;
