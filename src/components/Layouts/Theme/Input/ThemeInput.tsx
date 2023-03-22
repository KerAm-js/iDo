import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../../redux/selectors/prefsSelectors";
import { textColors } from "../../../../styles/global/colors";
import { ThemeInputPropType } from "../types";

const ThemeInput: FC<ThemeInputPropType> = ({
  style,
  reference,
  langPlaceholder,
  ...props
}) => {
  const { colors, dark } = useTheme();
  const { language } = useSelector(prefsSelector);

  return (
    <TextInput
      keyboardAppearance={dark ? "dark" : "light"}
      ref={reference}
      placeholderTextColor={textColors.grey}
      placeholder={
        langPlaceholder ? langPlaceholder[language] : props.placeholder
      }
      style={[{ color: colors.text }, style]}
      {...props}
    />
  );
};

export default ThemeInput;
