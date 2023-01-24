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
// import { Audio } from "expo-av";
// import { Sound } from "expo-av/build/Audio";

const CheckButton: FC<propType> = ({ isCompleted, onClick }) => {
  // const [sound, setSound] = React.useState<Sound>();
  const theme = useTheme();
  const scale = useSharedValue(isCompleted ? 1 : 0);

  const styleR = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // async function playSound() {
  //   try {
  //     const { sound } = await Audio.Sound.createAsync(
  //       require("../../../../../assets/pop.mov")
  //     );
  //     setSound(sound);
  //     await sound.playAsync();
  //   } catch (error) {
  //     console.log("playSound", error);
  //   }
  // }

  const handleClick = () => {
    onClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isCompleted) {
      // playSound();
      scale.value = 0.5;
      scale.value = withSequence(
        withTiming(1.25, { duration: 150 }),
        withTiming(1, { duration: 200 })
      );
    } else {
      scale.value = 0;
    }
  };

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <Pressable onPress={handleClick} style={[checkButtonStyles.container]}>
      <SquircleView
        style={[checkButtonStyles.sqiurcleView]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: ultraSmallBorderRadius,
          fillColor: theme.colors.card,
          strokeColor: buttonColors.blue,
          strokeWidth: 1,
        }}
      >
        {isCompleted && (
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
        )}
      </SquircleView>
    </Pressable>
  );
};

export default CheckButton;
