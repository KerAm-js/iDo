import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { circles } from "../../../../assets/icons/circles";
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
import IconButtton from "../../UI/buttons/IconButton/IconButton";
import TabBar from "../../UI/TabBar/TabBar";
import { getDate } from "../../../utils/utils";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC = () => {
  const { date } = getDate("ru");
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerBackgroundContainerStyle: headerBackgroundStyle,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: date,
          tabBarLabel: "Главная",
          headerRight: () => <IconButtton onClick={() => {}} xml={circles} />,
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
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
};

export default TabNavigator;
