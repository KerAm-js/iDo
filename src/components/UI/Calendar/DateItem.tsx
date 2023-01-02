import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import {
  buttonColors,
  textColors,
  themeColors,
} from "../../../styles/global/colors";
import { text17, textGrey } from "../../../styles/global/texts";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { calendarStyles } from "./styles";
import { DateItemPropType } from "./types";

const DateItem: FC<DateItemPropType> = React.memo(
  ({
    data: { date, isCurrentMonth },
    onClick,
    isSelected,
    isCardBackgroundColor,
  }) => {
    const theme = useTheme();
    const isExpired =
      new Date().getMonth() === date.getMonth() &&
      new Date().valueOf() - date.valueOf() > 1000 * 3600 * 24;
    const onClickHandler = () => {
      onClick(date);
    };

    return (
      <Pressable
        style={[
          calendarStyles.calendarItem,
          {
            backgroundColor:
              isSelected && isCurrentMonth
                ? buttonColors.blue
                : isCardBackgroundColor
                ? theme.colors.card
                : theme.colors.background,
          },
        ]}
        onPress={isCurrentMonth && !isExpired ? onClickHandler : undefined}
      >
        <ThemeText
          style={[
            calendarStyles.item,
            text17,
            isSelected ? { color: themeColors.dark.colors.text } : null,
            !isCurrentMonth || isExpired ? textGrey : null,
          ]}
        >
          {date.getDate()}
        </ThemeText>
      </Pressable>
    );
  },
  (prevProps, currProps) => {
    if (prevProps.isSelected === currProps.isSelected) {
      return true;
    } else {
      return false;
    }
  }
);

export default DateItem;
