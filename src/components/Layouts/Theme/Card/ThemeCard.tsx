import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ThemeViewPropType } from "../types";

const ThemeCard: FC<ThemeViewPropType> = ({ children, style, animated, ...props }) => {
  const theme = useTheme();

  if (animated) {
    return (
      <Animated.View style={[{ backgroundColor: theme.colors.card }, style]} { ...props }>
        {children}
      </Animated.View>
    );
  } else {
    return (
      <View style={[{ backgroundColor: theme.colors.card }, style]}>
        {children}
      </View>
    );
  }
};

export default ThemeCard;
