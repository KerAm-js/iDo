import React, { FC } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { clearListLight } from "../../../../assets/images/emptyList";
import { text17LineHeight, textGrey } from "../../../styles/global/texts";
import { clearListStyles } from "./styles";
import { ClearListPropType } from "./types";

const ClearList: FC<ClearListPropType> = ({ title }) => {
  return (
    <View style={clearListStyles.container}>
      <SvgXml style={clearListStyles.image} xml={clearListLight} />
      <Text style={[ text17LineHeight, textGrey, clearListStyles.title ]}>{title}</Text>
    </View>
  )
}

export default ClearList;