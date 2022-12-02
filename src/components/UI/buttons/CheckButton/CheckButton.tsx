import React, { FC, useEffect, useRef } from "react";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { check } from "../../../../../assets/icons/check";
import { checkButtonStyles } from "./styles";
import { propType } from "./types";
import * as Haptics from "expo-haptics";
import { SquircleView } from "react-native-figma-squircle";
import {
  borderSmoothing,
  ultraSmallBorderRadius,
} from "../../../../styles/global/borderRadiuses";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { buttonColors, themeColors } from "../../../../styles/global/colors";
import { useTheme } from "@react-navigation/native";


const CheckButton: FC<propType> = ({ isCompleted, onClick }) => {
  const theme = useTheme();
  const upperScale = 1.25;
  const effectOpacity = useSharedValue(0);
  const effectScale = useSharedValue(1);

  const effectViewStyle = useAnimatedStyle(() => {
    return {
      opacity: effectOpacity.value,
      transform: [{ scale: upperScale }],
      position: "absolute",
      zIndex: -1,
    };
  });

  const effectViewStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: effectScale.value,  }],
      position: "absolute",
      zIndex: -1,
    };
  });

  const handleClick = () => {
    onClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!isCompleted) {
      effectScale.value = withSequence(
        withTiming(upperScale, { duration: 150 }, (isFinished) => { 
          if (isFinished) {
            effectOpacity.value = withSequence(
              withTiming(0.5, { duration: 1 }),
              withTiming(0, { duration: 300 }),
            );
          }
        }),
        withTiming(1, { duration: 200 })
      );
    } else {
    }
  };

  return (
    <Pressable onPress={handleClick} style={[checkButtonStyles.container]}>
      <SquircleView
        style={[checkButtonStyles.sqiurcleView]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: ultraSmallBorderRadius,
          fillColor: isCompleted ? buttonColors.blue : theme.colors.card,
          strokeColor: buttonColors.blue,
          strokeWidth: 1,
        }}
      >
        {isCompleted && <SvgXml xml={check(themeColors.dark.colors.text)} width={10} height={8} />}
      </SquircleView>
      {isCompleted && (
        <>
          <Animated.View style={[effectViewStyle]}>
            <SquircleView
              style={[checkButtonStyles.sqiurcleView]}
              squircleParams={{
                cornerSmoothing: borderSmoothing,
                cornerRadius: ultraSmallBorderRadius,
                fillColor: buttonColors.blue,
              }}
            />
          </Animated.View>
          <Animated.View style={[effectViewStyle2]}>
            <SquircleView
              style={[checkButtonStyles.sqiurcleView]}
              squircleParams={{
                cornerSmoothing: borderSmoothing,
                cornerRadius: ultraSmallBorderRadius,
                fillColor: buttonColors.blue,
              }}
            />
          </Animated.View>
        </>
      )}
    </Pressable>
  );
};

export default CheckButton;
