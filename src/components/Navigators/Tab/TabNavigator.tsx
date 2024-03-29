import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { rootTabNavigatorParamList, TabNavigatorPropTypes } from "./types";
import TabBar from "../../UI/TabBar/TabBar";
import HomeNavigator from "../Stack/Home/HomeNavigator";
import PrefsNavigator from "../Stack/Prefs/PrefsNavigator";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC<TabNavigatorPropTypes> = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      {/* <Tab.Screen
        name="Folders"
        component={Folders}
        options={{ title: "Папки" }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{ title: "Статистика" }}
      /> */}
      <Tab.Screen name="Prefs" component={PrefsNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
