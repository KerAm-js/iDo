import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { checkAccent } from "../../../../assets/icons/check";
import { text17, textGrey } from "../../../styles/global/texts";
import { bottomPopupStyles } from "./styles";
import { CheckItemPropType } from "./types";

const CheckItem: FC<CheckItemPropType> = ({ title, isChecked, onPress }) => {
  return (
    <Pressable style={[ bottomPopupStyles.listItem ]} onPress={onPress} >
      <Text style={[ text17, !isChecked && textGrey  ]}>{title}</Text>
      {
        isChecked && <SvgXml xml={checkAccent} width={15} height={12} fill={'#000'} />
      }
    </Pressable>
  )
}

export default CheckItem;