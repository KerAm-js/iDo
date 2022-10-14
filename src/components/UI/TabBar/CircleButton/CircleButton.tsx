import React, { FC, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { tabBarStyles } from "../styles";
import { circleButtonProps } from "./types";

const CircleButton: FC<circleButtonProps> = ({ xml, onClick }) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const clickHanlder = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.8, useNativeDriver: true, duration: 150 }),
      Animated.timing(buttonScale, { toValue: 1, useNativeDriver: true, duration: 100 }),
    ]).start();
    onClick();
  }

  return (
    <Animated.View style={[{transform: [{ scale: buttonScale }]}]}>
      <Pressable style={[tabBarStyles.circleButton]} onPress={clickHanlder}>
        <SvgXml
          xml={xml}
          style={tabBarStyles.circleButtonIcon}
          width={tabBarStyles.circleButtonIcon.width}
          height={tabBarStyles.circleButtonIcon.height}
        />
      </Pressable>
    </Animated.View>
  )
}

export default CircleButton;