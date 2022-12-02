import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { textColors, themeColors } from "../../../styles/global/colors";
import { text12 } from "../../../styles/global/texts";
import { completedMarkerStyles } from "./styles";
import { CompletedMarkerPropTypes } from "./types";

const CompletedMarker: FC<CompletedMarkerPropTypes> = ({
  onPress,
  completedListOpacity,
  opacity,
  top,
}) => {
  const { theme } = useSelector(prefsSelector);

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
  }, [top.value, opacity.value]);

  return (
    <Animated.View style={[containerStyle, completedMarkerStyles.container]}>
      <Pressable
        onPress={onPress}
        style={[
          completedMarkerStyles.content,
          { backgroundColor: themeColors[theme].colors.card },
        ]}
      >
        <Text style={[text12, { color: themeColors[theme].colors.text }]}>
          Выполнено
        </Text>
        <Animated.View style={iconStyle}>
          <SvgXml
            xml={arrowBottom(themeColors[theme].colors.text)}
            width={9}
            height={9}
            color={themeColors[theme].colors.text}
            style={completedMarkerStyles.icon}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default CompletedMarker;
