import React, { FC } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { iconButtonStyle } from "./style";
import { iconButtonProps } from "./types";

const IconButton: FC<iconButtonProps> = ({ onClick, xml, align = 'center', justify = 'center', iconWidth, iconHeight }) => {
  return (
    <Pressable
      onPress={onClick}
      style={[
        iconButtonStyle,
        {
          alignItems: align === 'center' ? 'center' : `flex-${align}`,
          justifyContent: justify === 'center' ? 'center' : `flex-${justify}`,
        }
      ]}
    >
      <SvgXml xml={xml} width={iconWidth} height={iconHeight} />
    </Pressable>
  );
};

export default IconButton;
