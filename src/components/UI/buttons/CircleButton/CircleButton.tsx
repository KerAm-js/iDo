import React, { FC, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { circleButtonStyles } from "./styles";
import { circleButtonProps } from "./types";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundColors, textColors } from "../../../../styles/global/colors";
import AnimatedButton from "../../../Layouts/AnimatedButton/AnimatedButton";

const CircleButton: FC<circleButtonProps> = ({
  xml,
  onClick,
  disabled,
  size,
}) => {
  const clickHanlder = () => {
    if (!disabled) {
      onClick();
    }
  };

  const color = disabled ? textColors.grey : backgroundColors.blue;

  return (
    <AnimatedButton
      onPress={clickHanlder}
      style={size === "big" ? circleButtonStyles.shadows : {}}
    >
      <LinearGradient
        colors={size === "big" ? ["#248DFF", "#0271EA"] : [color, color]}
        style={[
          circleButtonStyles.container,
          size === "small" && circleButtonStyles.containerSmall,
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
    </AnimatedButton>
  );
};

export default CircleButton;
