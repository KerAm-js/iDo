import { LangObjectType } from './../../../types/global/LangObject';
import React from "react";
import { LayoutChangeEvent, TextProps, ViewProps, TextInputProps, ViewStyle } from "react-native";

export interface ThemeInputPropType extends TextInputProps {
  reference?: {current: any },
  langPlaceholder?: LangObjectType;
}

export interface ThemeTextPropType extends TextProps {
  children: React.ReactNode;
};

export interface ThemeViewPropType extends ViewProps {
  children: React.ReactNode;
  card?: boolean,
  borderRadius?: number,
  onLayout?: (event: LayoutChangeEvent) => void,
  animated?: boolean,
  rStyle?: ViewStyle,
};
