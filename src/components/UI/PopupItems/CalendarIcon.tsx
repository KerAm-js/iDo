import React, { FC } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { calendar } from "../../../../assets/icons/calendar";
import { text12, text14, text16 } from "../../../styles/global/texts";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { popupItemStyles } from "./styles";
import { CalendarDateIconPropType } from "./types";

const CalendarDateIcon: FC<CalendarDateIconPropType> = ({ date, color, size }) => {

  const iconSize = size === 'small' ? 22 : 24;
  const textStyles = size === 'small' ? text12 : text14;

  return (
    <View style={[popupItemStyles.calendarIconContainer]}>
      <SvgXml xml={calendar(color)} width={iconSize} height={iconSize} />
      <ThemeText
        style={[
          textStyles,
          size === 'regular' && { lineHeight: 15 },
          popupItemStyles.calendarIconText,
          { color },
        ]}
      >
        {date?.getDate()}
      </ThemeText>
    </View>
  );
};

export default CalendarDateIcon;
