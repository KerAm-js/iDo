import React, { FC, useEffect, useRef } from "react";
import { Dimensions, Keyboard, LayoutChangeEvent, View } from "react-native";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { title22 } from "../../../styles/global/texts";
import TextButton from "../../UI/buttons/TextButton/TextButton";
import LangText from "../../UI/LangText/LangText";
import ThemeView from "../Theme/View/ThemeView";
import { bottomPopupStyles } from "./styles";
import { BottomPopupPropType } from "./types";

const BottomPopup: FC<BottomPopupPropType> = ({
  visible,
  title,
  children,
  keyboardHeight,
  rightButtonColor,
  rightButtonTitle,
  onRightButtonPress,
  onCloseAnimationEnd,
}) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
  const { top, bottom } = useSafeAreaInsets();
  const HEIGHT = useRef(0);

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
      translateY.value = withTiming(height);
    }
  };

  useEffect(() => {
    const newTranslateY = visible
      ? keyboardHeight
        ? 0 - keyboardHeight + bottom
        : 0
      : HEIGHT.current;
    translateY.value = withTiming(
      newTranslateY,
      {
        easing: Easing.bezierFn(0, 0, 0.5, 1),
      },
      (isFinished) => {
        if (isFinished && !visible && onCloseAnimationEnd)
          runOnJS(onCloseAnimationEnd)();
      }
    );
  }, [visible, keyboardHeight]);

  useEffect(() => {
    if (!visible && keyboardHeight !== undefined) {
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
            <LangText title={title} style={title22} />
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
};

export default React.memo(BottomPopup);
