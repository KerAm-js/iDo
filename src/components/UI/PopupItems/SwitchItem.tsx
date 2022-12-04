import React, { FC } from "react";
import { Switch } from "react-native";
import { buttonColors } from "../../../styles/global/colors";
import { text17 } from "../../../styles/global/texts";
import ListItem from "../../Layouts/ListItem/ListItem";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { popupItemStyles } from "./styles";
import { SwithItemPropType } from "./types";

const SwitchItem: FC<SwithItemPropType> = ({ title, value, onChange }) => {
  return (
    <ListItem style={popupItemStyles.listItem}>
      <ThemeText style={text17}>{title}</ThemeText>
      <Switch
        trackColor={{
          true: buttonColors.blue,
        }}
        value={value}
        onValueChange={onChange}
      />
    </ListItem>
  );
};

export default SwitchItem;
