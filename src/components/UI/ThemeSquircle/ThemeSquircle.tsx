import { useTheme } from "@react-navigation/native";
import React, { FC, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import {
  SquircleParams,
  SquircleView,
  SquircleViewProps,
} from "react-native-figma-squircle";

const ThemeSquircle = (params: PropsWithChildren<SquircleViewProps>) => {
  const theme = useTheme();
  const newParams: SquircleParams = {
    ...params.squircleParams,
    fillColor: theme.colors.card,
  };
  return (
    <SquircleView {...params} squircleParams={newParams}>
      {params.children}
    </SquircleView>
  );
};

export default ThemeSquircle;
