import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { SquircleView } from "react-native-figma-squircle";
import Animated from "react-native-reanimated";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { shadowColors } from "../../../styles/global/colors";
import { listItemStyles } from "./styles";
import { ListItemPopupStyles } from "./types";

const ListItem: FC<ListItemPopupStyles> = ({
  children,
  isCardColor,
  style,
  rStyle,
  borderRadius = smallBorderRadius,
}) => {
  const theme = useTheme();
  if (rStyle) {
    return (
      <Animated.View
        style={[
          { shadowColor: theme.dark ? shadowColors.dark : shadowColors.light },
          rStyle,
        ]}
      >
        <SquircleView
          style={[listItemStyles.container, style]}
          squircleParams={{
            cornerSmoothing: borderSmoothing,
            cornerRadius: borderRadius,
            fillColor: isCardColor
              ? theme.colors.card
              : theme.colors.background,
          }}
        >
          {children}
        </SquircleView>
      </Animated.View>
    );
  }
  return (
    <SquircleView
      style={[listItemStyles.container, style]}
      squircleParams={{
        cornerSmoothing: borderSmoothing,
        cornerRadius: borderRadius,
        fillColor: isCardColor ? theme.colors.card : theme.colors.background,
      }}
    >
      {children}
    </SquircleView>
  );
};

export default ListItem;
