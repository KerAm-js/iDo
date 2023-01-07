import React, { FC } from "react";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { text17LineHeight } from "../../../styles/global/texts";
import { CheckItemPropType } from "./types";
import ListItem from "../../Layouts/ListItem/ListItem";
import { popupItemStyles } from "./styles";
import { check } from "../../../../assets/icons/check";
import { buttonColors } from "../../../styles/global/colors";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";

const CheckItem: FC<CheckItemPropType> = ({ title, isChecked, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <ListItem style={popupItemStyles.listItem}>
        <ThemeText style={text17LineHeight}>
          {title}
        </ThemeText>
        {isChecked && (
          <SvgXml xml={check(buttonColors.blue)} width={15} height={12} />
        )}
      </ListItem>
    </Pressable>
  );
};

export default CheckItem;
