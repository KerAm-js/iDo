import React, { FC } from "react";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { AnimatedButtonPropTypes } from "./types";

const AnimatedButton: FC<AnimatedButtonPropTypes> = ({ children, onPress, style }) => {

  const scale = useSharedValue(1);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  }, [scale.value]);

  const onPressHandler = () => {
    scale.value = withSequence(
      withTiming(0.8, { duration: 150 }),
      withTiming(1, { duration: 100 }),
    )
    onPress();
  }

  return (
    <Animated.View style={[ styles, style ]}>
      <Pressable onPress={onPressHandler}>
      {children}
      </Pressable>
    </Animated.View>
  )
}

export default AnimatedButton;