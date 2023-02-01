import React, { FC, useEffect, useRef, useState } from "react";
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
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import ThemeSquircle from "../../ThemeSquircle/ThemeSquircle";

const CheckButton: FC<propType> = ({ isCompleted, onClick }) => {
  const [sound, setSound] = useState<Sound>();
  const scale = useSharedValue(isCompleted ? 1 : 0);

  const styleR = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../../assets/pop.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("playSound", error);
    }
  }

  const handleClick = () => {
    onClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isCompleted) {
      playSound();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (isCompleted) {
      scale.value = 0.5
      scale.value = withSequence(
        withTiming(1.25, { duration: 150 }),
        withTiming(1, { duration: 220 })
      );
    } else {
      scale.value = 0;
    }
  }, [isCompleted])

  return (
    <Pressable onPress={handleClick} style={[checkButtonStyles.container]}>
      <ThemeSquircle
        style={[checkButtonStyles.sqiurcleView]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: ultraSmallBorderRadius,
          strokeColor: buttonColors.blue,
          strokeWidth: 1,
        }}
      >
        <Animated.View style={styleR}>
          <SquircleView
            style={[checkButtonStyles.sqiurcleView]}
            squircleParams={{
              cornerSmoothing: borderSmoothing,
              cornerRadius: ultraSmallBorderRadius,
              fillColor: buttonColors.blue,
              strokeColor: buttonColors.blue,
              strokeWidth: 1,
            }}
          >
            <SvgXml
              xml={check(themeColors.dark.colors.text)}
              width={10}
              height={8}
            />
          </SquircleView>
        </Animated.View>
      </ThemeSquircle>
    </Pressable>
  );
};

export default CheckButton;
