import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { text17 } from "../../../styles/global/texts";
import { CheckItemPropType } from "./types";
import ListItem from "../../Layouts/ListItem/ListItem";
import { popupItemStyles } from "./styles";
import { check } from "../../../../assets/icons/check";
import { buttonColors, themeColors } from "../../../styles/global/colors";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";

const CheckItem: FC<CheckItemPropType> = ({ title, isChecked, onPress }) => {
  const { theme } = useSelector(prefsSelector);
  return (
    <Pressable onPress={onPress}>
      <ListItem style={popupItemStyles.listItem}>
        <Text style={[text17, { color: themeColors[theme].colors.text }]}>
          {title}
        </Text>
        {isChecked && (
          <SvgXml xml={check(buttonColors.blue)} width={15} height={12} />
        )}
      </ListItem>
    </Pressable>
  );
};

export default CheckItem;
