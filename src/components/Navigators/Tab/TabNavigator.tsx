import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { rootTabNavigatorParamList, TabNavigatorPropTypes } from "./types";
import Home from "../../Screens/Home/Home";
import Prefs from "../../Screens/Prefs/Prefs";
import TabBar from "../../UI/TabBar/TabBar";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { languageTexts } from "../../../utils/languageTexts"; 

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC<TabNavigatorPropTypes> = React.memo(
  ({ openAddTaskModal, openLanguageModal }) => {
    const language = useSelector(getLanguage);

    const RenderPrefs = () => {
      return <Prefs openLanguageModal={openLanguageModal} />;
    }

    return (
      <Tab.Navigator
        detachInactiveScreens={true}
        tabBar={(props) => (
          <TabBar onBigButtonClick={openAddTaskModal} {...props} />
        )}
        screenOptions={{
          headerRightContainerStyle: { paddingRight: 20 },
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTransparent: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: languageTexts[language].screenTitles.main,
          }}
        />
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
        <Tab.Screen
          name="Prefs"
          component={RenderPrefs}
          options={{ tabBarLabel: languageTexts[language].screenTitles.preferences, }}
        />
      </Tab.Navigator>
    );
  }
);

export default TabNavigator;
