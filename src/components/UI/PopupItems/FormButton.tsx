import { useTheme } from "@react-navigation/native";
import React, { FC, useRef } from "react";
import { Pressable, Text, TextInput } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { SvgXml } from "react-native-svg";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { text17Input, text17LineHeight } from "../../../styles/global/texts";
import ThemeInput from "../../Layouts/Theme/Input/ThemeInput";
import LangText from "../LangText/LangText";
import { popupItemStyles } from "./styles";
import { FormButtonPropType } from "./types";

const FormButton: FC<FormButtonPropType> = ({
  title,
  iconXml,
  placeholder,
  isInput,
  textColor,
  onPress,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const input = useRef<TextInput>(null);
  const onPressHandler = () => {
    if (isInput) input?.current?.focus();
    if (onPress) onPress();
  };
  return (
    <Pressable
      style={[popupItemStyles.buttonContainer, style]}
      onPress={onPressHandler}
    >
      <SquircleView
        style={[popupItemStyles.listItem, popupItemStyles.button]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: smallBorderRadius,
          fillColor: colors.background,
        }}
      >
        {iconXml && (
          <SvgXml
            style={[popupItemStyles.buttonIcon]}
            xml={iconXml}
            width={20}
            height={20}
          />
        )}
        {isInput ? (
          <ThemeInput
            keyboardType="numeric"
            reference={input}
            placeholder={placeholder}
            style={[
              text17Input,
              { color: textColor }
            ]}
            {...props}
          />
        ) : (
          <LangText title={title} handleTheme={false} style={[text17LineHeight, popupItemStyles.buttonTitle]} />
        )} 
      </SquircleView>
    </Pressable>
  );
};

export default FormButton;
