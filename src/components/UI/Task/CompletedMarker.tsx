import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { textColors } from "../../../styles/global/colors";
import { text11 } from "../../../styles/global/texts";
import { completedMarkerStyles } from "./styles";
import { CompletedMarkerPropTypes } from "./types";

const CompletedMarker: FC<CompletedMarkerPropTypes> = ({ onPress, opacity }) => {

  const iconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(opacity.value, [0, 1], [-90, 0]);
    return {
      transform: [
        {rotate: `${rotation}deg`}
      ]
    }
  })

  return (
    <Pressable onPress={onPress} style={[ completedMarkerStyles.container ]}>
      <Text style={[ text11 ]}>Выполнено</Text>
      <Animated.View style={[iconStyle]}>
        <SvgXml 
          xml={arrowBottom}
          width={9}
          height={9}
          color={textColors.black}
          style={[ completedMarkerStyles.icon ]}
        />
      </Animated.View>
    </Pressable>
  )
}

export default CompletedMarker;