import React, { FC } from "react";
import { Switch, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, littleBorderRadius } from "../../../styles/global/borderRadiuses";
import { backgroundColors } from "../../../styles/global/colors";
import { text17 } from "../../../styles/global/texts";
import { popupItemStyles } from "./styles";
import { SwithItemPropType } from "./types";

const SwitchItem: FC<SwithItemPropType> = ({ title, value, onChange }) => {
  return (
    <SquircleView
      style={[popupItemStyles.listItem]}
      squircleParams={{
        cornerSmoothing: borderSmoothing,
        cornerRadius: littleBorderRadius,
        fillColor: backgroundColors.white,
      }}
    >
      <Text style={[text17]}>{title}</Text>
      <Switch
        trackColor={{
          true: backgroundColors.blue,
        }}
        value={value}
        onValueChange={onChange}
      />
    </SquircleView>
  );
};

export default SwitchItem;
