import { useFocusEffect, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { cancel } from "../../../../../assets/icons/cancel";
import { getLanguage } from "../../../../redux/selectors/prefsSelectors";
import { title18 } from "../../../../styles/global/texts";
import { languageTexts } from "../../../../utils/languageTexts";
import CalendarScreen from "../../../Screens/Home/Calendar";
import Home from "../../../Screens/Home/Home";
import { HomeStackNavigatorParamsList } from "./types";

const NativaStack = createStackNavigator<HomeStackNavigatorParamsList>();

const HomeNavigator = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { colors } = useTheme();
  const language = useSelector(getLanguage);

  useFocusEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  });

  if (!visible) {
    return null;
  }

  return (
    <NativaStack.Navigator
      screenOptions={{
        headerRightContainerStyle: { paddingRight: 20 },
        headerLeftContainerStyle: { paddingLeft: 20 },
      }}
    >
      <NativaStack.Group
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <NativaStack.Screen name="Main" component={Home} />
      </NativaStack.Group>
      <NativaStack.Group
        screenOptions={{
          presentation: "modal",
          headerTransparent: false,
          headerShadowVisible: false,
          headerBackImage: () => (<View />),
          headerBackTitle: languageTexts[language].words.close,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <NativaStack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: languageTexts[language].words.calendar, headerTitleStyle: title18 }}
        />
      </NativaStack.Group>
    </NativaStack.Navigator>
  );
};

export default HomeNavigator;
