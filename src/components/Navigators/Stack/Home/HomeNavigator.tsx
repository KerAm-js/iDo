import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { title18 } from "../../../../styles/global/texts";
import CalendarScreen from "../../../Screens/Home/Calendar";
import Home from "../../../Screens/Home/Home";
import { HomeStackNavigatorParamsList } from "./types";

const NativaStack = createStackNavigator<HomeStackNavigatorParamsList>();

const HomeNavigator = () => {
  const { colors } = useTheme();
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
          headerBackImage: () => <View />,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <NativaStack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerTitleStyle: title18,
          }}
        />
      </NativaStack.Group>
    </NativaStack.Navigator>
  );
};

export default HomeNavigator;
