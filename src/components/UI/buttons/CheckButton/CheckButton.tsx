import React, { FC, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { check } from "../../../../../assets/icons/check";
import { checkButtonStyles } from "./styles";
import { propType } from "./types";
import * as Haptics from 'expo-haptics';
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, smallBorderRadius } from "../../../../styles/global/borderRadiuses";
import { backgroundColors, cardColors, lineColors } from "../../../../styles/global/colors";

const CheckButton: FC<propType> = ({ isCompleted, onClick }) => {
  const effectScale = useRef(new Animated.Value(isCompleted ? 0 : 2.1)).current;
  const opacity = effectScale.interpolate({
    inputRange: [0, 2.1],
    outputRange: [1, 0],
  })

  const handleClick = () => {
    onClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isCompleted) {
      Animated.sequence([
        Animated.timing(effectScale, {
          toValue: 0,
          useNativeDriver: true,
          duration: 1,
        }),
        Animated.timing(effectScale, {
          toValue: 2.1,
          useNativeDriver: true,
          duration: 250,
        }),
      ]).start();
    }
  };

  return (
    <Pressable onPress={handleClick} style={[checkButtonStyles.container]}>
      <Animated.View>
        <SquircleView
          style={[checkButtonStyles.sqiurcleView]}
          squircleParams={{
            cornerSmoothing: borderSmoothing,
            cornerRadius: 6,
            fillColor: isCompleted ? backgroundColors.blue : cardColors.white,
            strokeColor: backgroundColors.blue,
            strokeWidth: 1,
          }}
        >
          {isCompleted && <SvgXml xml={check} width={10} height={8} />}
        </SquircleView>
      </Animated.View>
      {
        isCompleted && <Animated.View
          style={[
            { position: "absolute", zIndex: -1, opacity, transform: [{ scale: effectScale }] },
          ]}
        >
          <SquircleView
            style={[checkButtonStyles.sqiurcleView]}
            squircleParams={{
              cornerSmoothing: borderSmoothing,
              cornerRadius: smallBorderRadius / 2,
              fillColor: backgroundColors.blue,
            }}
          />
        </Animated.View>
      }
    </Pressable>
  );
};

export default CheckButton;
