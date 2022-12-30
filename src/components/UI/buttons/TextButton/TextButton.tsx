import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { textColors } from "../../../../styles/global/colors";
import { text16 } from "../../../../styles/global/texts";
import { TextButtonPropTypes } from "./types";

const TextButton: FC<TextButtonPropTypes> = ({ title, onPress, color }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={[ text16, { color: color || textColors.blue } ]}>{title}</Text>
    </Pressable>
  )
}

export default TextButton;