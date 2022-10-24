import React, { FC } from "react";
import { Switch, Text, View } from "react-native";
import { backgroundColors } from "../../../styles/global/colors";
import { text17 } from "../../../styles/global/texts";
import { bottomPopupStyles } from "./styles";
import { SwithItemPropType } from "./types";

const SwitchItem: FC<SwithItemPropType> = ({ title, value, onChange }) => {
  return (
    <View style={[ bottomPopupStyles.listItem ]}>
      <Text style={[ text17 ]}>{title}</Text>
      <Switch trackColor={{
        true: backgroundColors.dark
      }} value={value} onValueChange={onChange} />
    </View>
  )
}

export default SwitchItem;