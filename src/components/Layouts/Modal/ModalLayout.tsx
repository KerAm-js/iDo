import { useTheme } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { backdropColor } from "../../../styles/global/colors";
import { modalLayoutStyles } from "./styles";
import { ModalLayoutPropType } from "./types";

const ModalLayout: FC<ModalLayoutPropType> = ({ children, visible, close }) => {

  const { dark } = useTheme();

  const opacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(opacity.value, 
      [0, 1], 
      [0, 100]
    )
    return {
      zIndex,
    }
  }, [opacity.value])

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: dark ? backdropColor.dark : backdropColor.light
    }
  }, [opacity.value, dark]);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible]);

  return (
    <Animated.View style={[ modalLayoutStyles.container, containerStyle ]}>
      <Pressable onPress={close}>
        <Animated.View style={[ modalLayoutStyles.backdrop, backdropStyle ]}>
        </Animated.View>
      </Pressable>
      {children}
    </Animated.View>
  )
}

export default ModalLayout