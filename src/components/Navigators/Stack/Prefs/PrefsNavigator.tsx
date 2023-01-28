import { createStackNavigator } from "@react-navigation/stack";
import React, { FC } from "react";
import Prefs from "../../../Screens/Prefs/Prefs";
import { PrefsNavigatorPropType, PrefsStackNavigatorParamsList } from "./types";

const NativaStack = createStackNavigator<PrefsStackNavigatorParamsList>();

const PrefsNavigator: FC<PrefsNavigatorPropType> = ({ openLanguageModal }) => {
  const RenderPrefs = () => <Prefs openLanguageModal={openLanguageModal} />;
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
        <NativaStack.Screen name="Main" component={RenderPrefs} />
      </NativaStack.Group>
    </NativaStack.Navigator>
  );
};

export default PrefsNavigator;
