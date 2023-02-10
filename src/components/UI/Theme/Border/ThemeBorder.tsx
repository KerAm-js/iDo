import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ViewStyle } from "react-native";

const ThemeBorder = ({ style }: { style: ViewStyle }) => {
  const { colors } = useTheme();
  const styleObject: ViewStyle = { ...style, backgroundColor: colors.border };
  return <View style={styleObject} />;
};

export default ThemeBorder;
