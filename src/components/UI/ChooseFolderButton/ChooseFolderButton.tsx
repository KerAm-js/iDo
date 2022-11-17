import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import {
  borderSmoothing,
  ultraSmallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { backgroundColors, textColors } from "../../../styles/global/colors";
import { text14, text16 } from "../../../styles/global/texts";
import AnimatedButton from "../../Layouts/AnimatedButton/AnimatedButton";
import { chooseFolderButtonStyles } from "./styles";
import { ChooseFolderButtonPropTypes } from "./types";

const ChooseFolderButton: FC<ChooseFolderButtonPropTypes> = ({
  title,
  isActive,
  isFirst,
  isLast,
  onPress,
}) => {
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
          fillColor: isActive ? backgroundColors.blue : backgroundColors.white,
        }}
      >
        <Text style={[text16, { color: isActive ? textColors.white : textColors.black }]}>{title}</Text>
      </SquircleView>
    </Pressable>
  );
};

export default ChooseFolderButton;
