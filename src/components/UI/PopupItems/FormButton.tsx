import { useTheme } from "@react-navigation/native";
import React, { FC, useRef } from "react";
import { Text, TextInput } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { SvgXml } from "react-native-svg";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { text17Input, text17LineHeight } from "../../../styles/global/texts";
import AnimatedButton from "../../Layouts/AnimatedButton/AnimatedButton";
import ThemeInput from "../../Layouts/Theme/Input/ThemeInput";
import { popupItemStyles } from "./styles";
import { FormButtonPropType } from "./types";

const FormButton: FC<FormButtonPropType> = ({
  title,
  iconXml,
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
    <AnimatedButton
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
            placeholder={title}
            style={[
              text17Input,
              { color: textColor }
            ]}
            {...props}
          />
        ) : (
          <Text style={[text17LineHeight, popupItemStyles.buttonTitle]}>
            {title}
          </Text>
        )}
      </SquircleView>
    </AnimatedButton>
  );
};

export default FormButton;
