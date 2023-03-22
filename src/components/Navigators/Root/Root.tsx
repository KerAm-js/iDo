import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { themeColors } from "../../../styles/global/colors";
import { RootPropType } from "./types";
import { StatusBar } from "expo-status-bar";
import RootContent from "./Content";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";

const Root: FC<RootPropType> = ({ onAppReady }) => {
  const { theme } = useSelector(prefsSelector);

  const onReady = useCallback(() => {
    onAppReady(theme === "light" ? "dark" : "light");
  }, []);

  return (
    <NavigationContainer onReady={onReady} theme={themeColors[theme]}>
      <RootContent />
      <StatusBar animated style={theme === "light" ? "dark" : "light"} />
    </NavigationContainer>
  );
};

export default Root;
