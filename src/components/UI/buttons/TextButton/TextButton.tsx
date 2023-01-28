import React, { FC } from "react";
import { Pressable } from "react-native";
import { textColors } from "../../../../styles/global/colors";
import { text16 } from "../../../../styles/global/texts";
import LangText from "../../LangText/LangText";
import { TextButtonPropTypes } from "./types";

const TextButton: FC<TextButtonPropTypes> = ({ title, onPress, color }) => {
  return (
    <Pressable onPress={onPress}>
      <LangText
        title={title}
        style={[text16, { color: color || textColors.blue }]}
      />
    </Pressable>
  );
};

export default TextButton;
