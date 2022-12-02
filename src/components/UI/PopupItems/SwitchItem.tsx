import React, { FC } from "react";
import { Switch, Text } from "react-native";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { buttonColors, themeColors } from "../../../styles/global/colors";
import { text17 } from "../../../styles/global/texts";
import ListItem from "../../Layouts/ListItem/ListItem";
import { popupItemStyles } from "./styles";
import { SwithItemPropType } from "./types";

const SwitchItem: FC<SwithItemPropType> = ({ title, value, onChange }) => {

  const {theme} = useSelector(prefsSelector);

  return (
    <ListItem style={popupItemStyles.listItem}>
      <Text style={[text17, { color: themeColors[theme].colors.text }]}>{title}</Text>
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
