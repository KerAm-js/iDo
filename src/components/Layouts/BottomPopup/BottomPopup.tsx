import React, { FC, useEffect, useRef } from "react";
import { Keyboard, LayoutChangeEvent, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { title22 } from "../../../styles/global/texts";
import { bottomPopupStyles } from "./styles";
import { BottomPopupPropType } from "./types";

const BottomPopup: FC<BottomPopupPropType> = ({
  visible,
  title,
  children,
  handleKeyboard,
}) => {
  const HEIGHT = useRef(0);
  const keyboardHeight = useKeyboard();

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, [translateY]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    HEIGHT.current = height;
    if (!visible) {
      translateY.value = height;
    }
  };

  useEffect(() => {
    const newTranslateY = visible
      ? handleKeyboard 
          ? 0 - keyboardHeight + bottomPopupStyles.container.paddingBottom - 20
          : 0
      : HEIGHT.current
    translateY.value = withTiming(newTranslateY, {
      duration: keyboardHeight > 0 ? 400 : 200,
    });
  }, [visible, keyboardHeight]);

  useEffect(() => {
    if (!visible && handleKeyboard) {
      Keyboard.dismiss();
    }
  }, [visible])

  return (
    <Animated.View
      onLayout={onLayout}
      style={[bottomPopupStyles.container, containerStyle, { minHeight: 180 }]}
    >
      <View>
        {title && (
          <Text style={[bottomPopupStyles.title, title22]}>{title}</Text>
        )}
        {children}
      </View>
    </Animated.View>
  );
};

export default BottomPopup;
