import React, { FC } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { buttonColors, textColors, themeColors } from "../../../styles/global/colors";
import { text14LineHeight, text17LineHeight, textGrey } from "../../../styles/global/texts";
import ListItem from "../../Layouts/ListItem/ListItem";
import { prefItemStyles } from "./styles";
import { PrefItemPropTypes } from "./types";

const PrefItem: FC<PrefItemPropTypes> = React.memo(({
  iconXml,
  title,
  type,
  onPress,
  state,
}) => {

  const { theme } = useSelector(prefsSelector);

  let rightItem;

  if (type === "navigation") {
    rightItem = (
      <SvgXml
        xml={arrowBottom(textColors.grey)}
        style={{ transform: [{ rotate: "-90deg" }] }}
        width={16}
        height={16}
      />
    );
  } else if (type === "switching") {
    rightItem = (
      <Switch
        trackColor={{
          true: buttonColors.blue,
        }}
        value={!!state}
        onValueChange={onPress}
      />
    );
  } else {
    rightItem = <Text style={[ text14LineHeight, textGrey ]}>{state}</Text>;
  }

  return (
    <Pressable onPress={onPress}>
      <ListItem isCardColor style={prefItemStyles.container}>
        <View style={prefItemStyles.leftItemsContainer}>
          <SvgXml xml={iconXml} style={prefItemStyles.icon} width={22} height={22} />
          <Text style={[ text17LineHeight, { color: themeColors[theme].colors.text } ]}>{title}</Text>
        </View>
        {rightItem}
      </ListItem>
    </Pressable>
  );
});

export default PrefItem;
