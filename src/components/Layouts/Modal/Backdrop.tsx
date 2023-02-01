import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { backdropColor } from "../../../styles/global/colors";
import { modalLayoutStyles } from "./styles";
import { BackdropPropType } from "./types";

const Backdrop: FC<BackdropPropType> = ({ opacity }) => {
  const { dark } = useTheme();

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: dark ? backdropColor.dark : backdropColor.light,
    };
  }, [opacity.value, dark]);

  return <Animated.View style={[modalLayoutStyles.backdrop, backdropStyle]} />;
};

export default Backdrop;
