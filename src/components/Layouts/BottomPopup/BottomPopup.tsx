import React, { FC, useEffect, useRef } from "react";
import {
  Dimensions,
  Keyboard,
  LayoutChangeEvent,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { themeColors } from "../../../styles/global/colors";
import { title22 } from "../../../styles/global/texts";
import ThemeBackground from "../Theme/Background/ThemeBackground";
import ThemeCard from "../Theme/Card/ThemeCard";
import ThemeText from "../Theme/Text/ThemeText";
import { bottomPopupStyles } from "./styles";
import { BottomPopupPropType } from "./types";

const BottomPopup: FC<BottomPopupPropType> = React.memo(
  ({ visible, title, children, handleKeyboard }) => {
    const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
    const { bottom } = useSafeAreaInsets();
    const { top } = useSafeAreaInsets();
    const HEIGHT = useRef(0);
    const keyboardHeight = useKeyboard();

    const translateY = useSharedValue(0);

    const containerStyleR = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
        paddingBottom: (bottom || 5) + 15,
        maxHeight: SCREEN_HEIGHT - top,
      };
    }, [translateY, bottom]);

    const onLayout = (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      HEIGHT.current = height;
      if (!visible) {
        translateY.value = height;
      }
    };

    useEffect(() => {
      const newTranslateY = visible
        ? handleKeyboard && keyboardHeight
          ? 0 - keyboardHeight + bottom
          : 0
        : HEIGHT.current;
      translateY.value = withTiming(newTranslateY, {
        duration: keyboardHeight > 0 ? 400 : 300,
      });
    }, [visible, keyboardHeight]);

    useEffect(() => {
      if (!visible && handleKeyboard) {
        Keyboard.dismiss();
      }
    }, [visible]);

    const textStyle: TextStyle = {
      ...bottomPopupStyles.title,
      ...title22,
    }

    return (
      <ThemeCard
        animated
        onLayout={onLayout}
        style={[containerStyleR, bottomPopupStyles.container]}
      >
        <View>
          {title && (
            <ThemeText
              style={textStyle}
            >
              {title}
            </ThemeText>
          )}
          {children}
        </View>
      </ThemeCard>
    );
  }
);

export default BottomPopup;
