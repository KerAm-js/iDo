import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import {
  borderSmoothing,
  ultraSmallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import {
  buttonColors,
  textColors,
  themeColors,
} from "../../../styles/global/colors";
import { text16 } from "../../../styles/global/texts";
import { chooseFolderButtonStyles } from "./styles";
import { ChooseFolderButtonPropTypes } from "./types";

const ChooseFolderButton: FC<ChooseFolderButtonPropTypes> = ({
  title,
  isActive,
  isFirst,
  isLast,
  onPress,
}) => {
  const { theme } = useSelector(prefsSelector);

  return (
    <Pressable onPress={onPress}>
      <SquircleView
        style={[
          chooseFolderButtonStyles.container,
          { marginLeft: isFirst ? 20 : 0, marginRight: isLast ? 20 : 10 },
        ]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: ultraSmallBorderRadius,
          fillColor: isActive
            ? buttonColors.blue
            : themeColors[theme].backgroundColor,
        }}
      >
        <Text
          style={[
            text16,
            {
              color:
                theme === "night"
                  ? themeColors[theme].textColor
                  : isActive
                  ? themeColors.night.textColor
                  : themeColors.light.textColor,
            },
          ]}
        >
          {title}
        </Text>
      </SquircleView>
    </Pressable>
  );
};

export default ChooseFolderButton;
