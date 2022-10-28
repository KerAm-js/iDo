import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { textColors } from "../../../styles/global/colors";
import { text12 } from "../../../styles/global/texts";
import { completedMarkerStyles } from "./styles";
import { CompletedMarkerPropTypes } from "./types";

const CompletedMarker: FC<CompletedMarkerPropTypes> = ({
  onPress,
  completedListOpacity,
  opacity,
  top,
}) => {
  const iconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(completedListOpacity.value, [0, 1], [-90, 0]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[containerStyle]}>
      <Pressable onPress={onPress} style={[completedMarkerStyles.container]}>
        <Text style={[text12]}>Выполнено</Text>
        <Animated.View style={[iconStyle]}>
          <SvgXml
            xml={arrowBottom}
            width={9}
            height={9}
            color={textColors.black}
            style={[completedMarkerStyles.icon]}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default CompletedMarker;
