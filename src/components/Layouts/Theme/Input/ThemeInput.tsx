import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { textColors } from "../../../../styles/global/colors";
import { ThemeInputPropType } from "../types";

const ThemeInput: FC<ThemeInputPropType> = ({
  children,
  style,
  reference,
  ...props
}) => {
  const { colors, dark } = useTheme();

  return (
    <TextInput
      keyboardAppearance={dark ? "dark" : "light"}
      ref={reference}
      placeholderTextColor={textColors.grey}
      style={[{ color: colors.text }, style]}
      {...props}
    />
  );
};

export default ThemeInput;
