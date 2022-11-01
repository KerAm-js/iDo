import React, { FC, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { circleButtonStyles } from "./styles";
import { circleButtonProps } from "./types";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundColors, textColors } from "../../../../styles/global/colors";

const CircleButton: FC<circleButtonProps> = ({ xml, onClick, disabled, size }) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const clickHanlder = () => {
    if (disabled) {
      return;
    }
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.8,
        useNativeDriver: true,
        duration: 150,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100,
      }),
    ]).start();
    onClick();
  };

  const color = disabled ? textColors.grey : backgroundColors.blue;

  return (
    <Animated.View
      style={[
        { transform: [{ scale: buttonScale }] },
        size === 'big' && circleButtonStyles.shadows,
      ]}
    >
      <Pressable onPress={clickHanlder}>
        <LinearGradient
          colors={ size === 'big' ? ["#248DFF", "#0271EA"] : [color, color]}
          style={[
            circleButtonStyles.container, size === 'small' && circleButtonStyles.containerSmall,
          ]}
        >
          <SvgXml
            xml={xml}
            style={circleButtonStyles.icon}
            width={
              size === "big"
                ? circleButtonStyles.icon.width
                : circleButtonStyles.iconSmall.width
            }
            height={
              size === "big"
                ? circleButtonStyles.icon.height
                : circleButtonStyles.iconSmall.height
            }
          />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default CircleButton;
