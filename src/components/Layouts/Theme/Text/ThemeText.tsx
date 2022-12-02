import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Text } from "react-native";
import { ThemeTextPropType } from "../types";

const ThemeText: FC<ThemeTextPropType> = ({ children, style, ...props }) => {

  const theme = useTheme();

  return <Text style={[{ color: theme.colors.text }, style]} {...props}>{children}</Text>
}

export default ThemeText;