import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ThemeViewPropType } from "../types";

const ThemeView: FC<ThemeViewPropType> = ({
  children,
  style,
  card,
  animated,
  ...props
}) => {
  const { colors } = useTheme();
  if (animated) {
    return (
      <Animated.View
        style={[{ backgroundColor: card ? colors.card : colors.background }, style]}
        {...props}
      >
        {children}
      </Animated.View>
    );
  } else {
    return (
      <View
        style={[{ backgroundColor: card ? colors.card : colors.background }, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
};

export default ThemeView;
