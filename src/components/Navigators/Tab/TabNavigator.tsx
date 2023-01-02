import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { rootTabNavigatorParamList, TabNavigatorPropTypes } from "./types";
import Prefs from "../../Screens/Prefs/Prefs";
import TabBar from "../../UI/TabBar/TabBar";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { languageTexts } from "../../../utils/languageTexts"; 
import HomeNavigator from "../Stack/Home/HomeNavigator";
import PrefsNavigator from "../Stack/Prefs/PrefsNavigator";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC<TabNavigatorPropTypes> = React.memo(
  ({ openAddTaskModal, openLanguageModal }) => {
    const language = useSelector(getLanguage);

    const RenderPrefsNavigator = () => {
      return <PrefsNavigator openLanguageModal={openLanguageModal} />;
    }

    return (
      <Tab.Navigator
        tabBar={(props) => (
          <TabBar onBigButtonClick={openAddTaskModal} {...props} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
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
          component={RenderPrefsNavigator}
          options={{ tabBarLabel: languageTexts[language].screenTitles.preferences, }}
        />
      </Tab.Navigator>
    );
  }
);

export default TabNavigator;
