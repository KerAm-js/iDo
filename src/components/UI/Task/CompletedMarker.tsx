import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { text12 } from "../../../styles/global/texts";
import { languageTexts } from "../../../utils/languageTexts";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import ThemeView from "../../Layouts/Theme/View/ThemeView";
import { completedMarkerStyles } from "./styles";
import { CompletedMarkerPropTypes } from "./types";

const CompletedMarker: FC<CompletedMarkerPropTypes> = ({
  onPress,
  completedListOpacity,
  opacity,
  top,
}) => {
  const { colors } = useTheme();
  const { language } = useSelector(prefsSelector);

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
    <Animated.View style={[completedMarkerStyles.container, containerStyle]}>
      <Pressable onPress={onPress}>
        <ThemeView card style={completedMarkerStyles.content}>
          <ThemeText style={text12}>
            {languageTexts.words.completed[language]}
          </ThemeText>
          <Animated.View style={iconStyle}>
            <SvgXml
              xml={arrowBottom(colors.text)}
              width={9}
              height={9}
              color={colors.text}
              style={completedMarkerStyles.icon}
            />
          </Animated.View>
        </ThemeView>
      </Pressable>
    </Animated.View>
  );
};

export default CompletedMarker;
