import { useNavigation, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React, { FC, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { headerTitleStyle } from "../../../styles/header";
import { ThemeHandlerPropTypes } from "./types";


const ThemeHandler: FC<ThemeHandlerPropTypes> = ({ scrollY, headerOpacity, titleTranslationY }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const headerBlurBackgroundOpacity = scrollY.interpolate({
    inputRange: [66, 76],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [75.5, 76],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { opacity: headerOpacity },
      headerTitleStyle: {
        ...headerTitleStyle,
        color: theme.colors.text,
        transform: [{ translateY: titleTranslationY }],
      },
      // headerRight: () => HeadingRight,
      headerBackground: () => (
        <View
          style={[
            StyleSheet.absoluteFill,
            { position: "absolute", overflow: "hidden" },
          ]}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: headerBackgroundOpacity,
                backgroundColor: theme.colors.background,
                position: "absolute",
              },
            ]}
          />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { opacity: headerBlurBackgroundOpacity, position: "absolute" },
            ]}
          >
            <BlurView
              tint={theme.dark ? "dark" : "default"}
              intensity={75}
              style={[StyleSheet.absoluteFill]}
            />
          </Animated.View>
        </View>
      ),
    });
  }, [theme]);

  return <View />;
};

export default ThemeHandler;
