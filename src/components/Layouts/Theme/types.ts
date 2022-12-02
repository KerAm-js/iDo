import React from "react";
import { LayoutChangeEvent, TextProps, TextStyle, ViewProps, ViewStyle } from "react-native";

export interface ThemeTextPropType extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | null | Array<TextStyle | null>;
};

export interface ThemeViewPropType extends ViewProps {
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void,
  animated?: boolean,
  style?: ViewStyle | null | Array<ViewStyle | null>;
};
