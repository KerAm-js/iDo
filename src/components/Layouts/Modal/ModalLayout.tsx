import React, { FC, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Backdrop from "./Backdrop";
import { modalLayoutStyles } from "./styles";
import { ModalLayoutPropType } from "./types";

const ModalLayout: FC<ModalLayoutPropType> = ({ children, visible, close }) => {
  const opacity = useSharedValue(0);
  const containerStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(opacity.value, [0, 1], [0, 100]);
    return {
      zIndex,
    };
  }, [opacity.value]);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible]);

  return (
    <Animated.View style={[modalLayoutStyles.container, containerStyle]}>
      <Pressable onPress={close}>
        <Backdrop opacity={opacity} />
      </Pressable>
      {children}
    </Animated.View>
  );
};

export default ModalLayout;
