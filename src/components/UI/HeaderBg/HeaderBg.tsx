import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { HeaderBgPropType } from "./types";

const HeaderBg: FC<HeaderBgPropType> = ({ opacity, blurOpacity }) => {
  const theme = useTheme();
  return (
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
            opacity,
            backgroundColor: theme.colors.background,
            position: "absolute",
          },
        ]}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: blurOpacity, position: "absolute" }]}
      >
        <BlurView
          tint={theme.dark ? "dark" : "default"}
          intensity={75}
          style={[StyleSheet.absoluteFill]}
        />
      </Animated.View>
    </View>
  );
};

export default HeaderBg;
