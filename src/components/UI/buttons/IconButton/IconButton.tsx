import React, { FC } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { iconButtonStyle } from "./style";
import { iconButtonProps } from "../../../../types/buttons/IconButton";

const IconButton: FC<iconButtonProps> = ({ onClick, xml, iconWidth, iconHeight }) => {
  return (
    <Pressable
      onPress={onClick}
      style={[
        iconButtonStyle
      ]}
    >
      <SvgXml xml={xml} width={iconWidth} height={iconHeight} />
    </Pressable>
  );
};

export default IconButton;
