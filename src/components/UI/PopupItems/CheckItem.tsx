import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, littleBorderRadius } from "../../../styles/global/borderRadiuses";
import { SvgXml } from "react-native-svg";
import { checkAccent } from "../../../../assets/icons/check";
import { backgroundColors } from "../../../styles/global/colors";
import { text17 } from "../../../styles/global/texts";
import { popupItemStyles } from "./styles";
import { CheckItemPropType } from "./types";

const CheckItem: FC<CheckItemPropType> = ({ title, isChecked, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <SquircleView
        style={[popupItemStyles.listItem]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: littleBorderRadius,
          fillColor: backgroundColors.white,
        }}
      >
        <Text style={[text17]}>{title}</Text>
        {isChecked && (
          <SvgXml xml={checkAccent} width={15} height={12} fill={"#000"} />
        )}
      </SquircleView>
    </Pressable>
  );
};

export default CheckItem;
