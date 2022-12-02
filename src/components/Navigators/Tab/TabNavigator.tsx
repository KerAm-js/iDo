import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { rootTabNavigatorParamList, TabNavigatorPropTypes } from "./types";
import Home from "../../screens/Home/Home";
import Prefs from "../../screens/Prefs/Prefs";
import TabBar from "../../UI/TabBar/TabBar";
import { getDate } from "../../../utils/date";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/selectors/prefsSelectors";
import { languageTexts } from "../../../utils/languageTexts";

const Tab = createBottomTabNavigator<rootTabNavigatorParamList>();

const TabNavigator: FC<TabNavigatorPropTypes> = React.memo(
  ({ periodsState, openModal, openAddTaskModal, openLanguageModal }) => {
    const language = useSelector(languageSelector);
    const { date } = getDate(language);

    const RenderHome = () => {
      return <Home periodsState={periodsState} showSettingModal={openModal} />
    }

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
          component={RenderHome}
          options={{
            title: date,
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
          options={{ title: languageTexts[language].screenTitles.preferences, }}
        />
      </Tab.Navigator>
    );
  }
);

export default TabNavigator;
