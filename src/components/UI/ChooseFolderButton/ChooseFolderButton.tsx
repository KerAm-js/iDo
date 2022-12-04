import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import {
  borderSmoothing,
  ultraSmallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { buttonColors, themeColors } from "../../../styles/global/colors";
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
  const { colors, dark } = useTheme();

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
          fillColor: isActive ? buttonColors.blue : colors.background,
        }}
      >
        <Text
          style={[
            text16,
            {
              color: dark
                ? colors.text
                : isActive
                ? themeColors.dark.colors.text
                : themeColors.light.colors.text,
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
