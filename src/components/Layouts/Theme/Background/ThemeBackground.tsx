import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ThemeViewPropType } from "../types";

const ThemeBackground: FC<ThemeViewPropType> = ({
  children,
  style,
  animated,
  ...props
}) => {
  const theme = useTheme();

  if (animated) {
    return (
      <Animated.View
        style={[{ backgroundColor: theme.colors.background }, style]}
        {...props}
      >
        {children}
      </Animated.View>
    );
  } else {
    return (
      <View
        style={[{ backgroundColor: theme.colors.background }, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
};

export default ThemeBackground;
