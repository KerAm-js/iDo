import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, smallBorderRadius } from "../../../styles/global/borderRadiuses";
import { listItemStyles } from "./styles";
import { ListItemPopupStyles } from "./types";

const ListItem: FC<ListItemPopupStyles> = ({ children, isCardColor, style, borderRadius = smallBorderRadius }) => {
  const theme = useTheme();
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
  )
}

export default ListItem;