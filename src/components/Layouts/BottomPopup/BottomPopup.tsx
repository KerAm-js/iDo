import React, { FC, useEffect, useRef } from "react";
import { Dimensions, Keyboard, LayoutChangeEvent, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { title22 } from "../../../styles/global/texts";
import TextButton from "../../UI/buttons/TextButton/TextButton";
import ThemeText from "../Theme/Text/ThemeText";
import ThemeView from "../Theme/View/ThemeView";
import { bottomPopupStyles } from "./styles";
import { BottomPopupPropType } from "./types";

const BottomPopup: FC<BottomPopupPropType> = React.memo(
  ({
    visible,
    title,
    children,
    handleKeyboard,
    rightButtonColor,
    rightButtonTitle,
    onRightButtonPress,
  }) => {
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

    return (
      <ThemeView
        card
        animated
        onLayout={onLayout}
        style={[containerStyleR, bottomPopupStyles.container]}
      >
        <View>
          {title && (
            <View style={bottomPopupStyles.headingContainer}>
              <ThemeText style={title22}>{title}</ThemeText>
              {rightButtonTitle && onRightButtonPress && (
                <TextButton
                  title={rightButtonTitle}
                  color={rightButtonColor}
                  onPress={onRightButtonPress}
                />
              )}
            </View>
          )}
          {children}
        </View>
      </ThemeView>
    );
  }
);

export default BottomPopup;
