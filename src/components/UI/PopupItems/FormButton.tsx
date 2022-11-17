import React, { FC, useRef } from "react";
import { Pressable, Text, TextInput } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { SvgXml } from "react-native-svg";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { backgroundColors, textColors } from "../../../styles/global/colors";
import { text17Input, text17LineHeight } from "../../../styles/global/texts";
import AnimatedButton from "../../Layouts/AnimatedButton/AnimatedButton";
import { popupItemStyles } from "./styles";
import { ButtonPropType } from "./types";

const FormButton: FC<ButtonPropType> = ({
  title,
  iconXml,
  iconActiveXml,
  isInput,
  onPress,
  inputValue,
  onInputChange,
  onFocus,
}) => {
  const input = useRef<TextInput>(null);
  const onPressHandler = () => {
    if (isInput) input?.current?.focus();
    if (onPress) onPress();
  };
  return (
    <AnimatedButton
      style={[popupItemStyles.buttonContainer]}
      onPress={onPressHandler}
    >
      <SquircleView
        style={[popupItemStyles.listItem, popupItemStyles.button]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: smallBorderRadius,
          fillColor: backgroundColors.white,
        }}
      >
        {iconXml && (
          <SvgXml
            style={[popupItemStyles.buttonIcon]}
            xml={
              iconActiveXml
                ? inputValue?.length === 5
                  ? iconActiveXml
                  : iconXml
                : iconXml
            }
            width={20}
            height={20}
          />
        )}
        {isInput ? (
          <TextInput
            keyboardType="numeric"
            ref={input}
            maxLength={5}
            value={inputValue}
            onChangeText={onInputChange}
            placeholder={title}
            onFocus={onFocus}
            placeholderTextColor={textColors.grey}
            style={[
              text17Input,
              inputValue?.length === 5 && { color: textColors.blue },
            ]}
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
