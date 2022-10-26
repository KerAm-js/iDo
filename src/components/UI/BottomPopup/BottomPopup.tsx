import React, { FC, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { title22 } from "../../../styles/global/texts";
import { Languages } from "../../../types/data/languageTexts";
import { languageTexts } from "../../../utils/languageTexts";
import CheckItem from "./CheckItem";
import { bottomPopupStyles } from "./styles";
import SwitchItem from "./SwitchItem";
import { BottomPopupPropType } from "./types";

const BottomPopup: FC<BottomPopupPropType<"switch" | "check">> = ({
  visible,
  title,
  listType,
  list,
  state,
  updateState,
}) => {
  const HEIGHT = useRef(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    HEIGHT.current = height;
    translateY.value = height;
  };

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, [translateY]);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : HEIGHT.current, {
      duration: 200,
    });
  }, [visible]);

  const onStateChange = (key: string, value: boolean) => {
    if (listType === "switch") {
      updateState({
        ...state,
        [key]: value,
      });
    }
  };

  const onCheck = (value: keyof Languages) => {
    if (listType === "check") {
      updateState(value);
    }
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[bottomPopupStyles.container, containerStyle, { minHeight: 180 }]}
    >
      <>
        <Text style={[bottomPopupStyles.title, title22]}>{title}</Text>
        {listType === "switch"
          ? Object.keys(state).map((key, index) => {
              const title = languageTexts["ru"].periods[key];
              return (
                <SwitchItem
                  key={key + index}
                  title={title}
                  value={state[key]}
                  onChange={(value) => onStateChange(key, value)}
                />
              );
            })
          : list.map((lang, index) => {
              return (
                <CheckItem
                  key={lang + index}
                  title={languageTexts['ru'].languages[lang]}
                  onPress={() => onCheck(lang)}
                  isChecked={state === lang}
                />
              )
            })}
      </>
    </Animated.View>
  );
};

export default BottomPopup;
