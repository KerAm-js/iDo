import React, { FC, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { check } from "../../../../../assets/icons/check";
import { checkButtonStyles } from "./styles";
import { propType } from "./types";
import * as Haptics from 'expo-haptics';

const CheckButton: FC<propType> = ({ isCompleted, onClick }) => {
  const scale = useRef(new Animated.Value(isCompleted ? 0 : 1.8)).current;
  const opacity = scale.interpolate({
    inputRange: [1, 1.8],
    outputRange: [0.5, 0],
  })

  const handleClick = () => {
    onClick();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isCompleted) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1,
        }),
        Animated.timing(scale, {
          toValue: 1.8,
          useNativeDriver: true,
          duration: 200,
        }),
      ]).start();
    }
  };

  return (
    <View>
      <Pressable
        onPress={handleClick}
        style={[
          checkButtonStyles.container,
          isCompleted ? checkButtonStyles.containerFill : null,
        ]}
      >
        {isCompleted && <SvgXml xml={check} width={10} height={8} />}
      </Pressable>
      {
        isCompleted && <Animated.View
          style={[
            checkButtonStyles.container,
            checkButtonStyles.containerFill,
            { position: "absolute", zIndex: -1, opacity, transform: [{ scale }] },
          ]}
        />
      }
    </View>
  );
};

export default CheckButton;
