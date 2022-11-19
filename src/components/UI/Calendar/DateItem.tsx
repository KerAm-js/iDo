import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { backgroundColors, textColors } from "../../../styles/global/colors";
import { text17, textGrey, textRed } from "../../../styles/global/texts";
import { calendarStyles } from "./styles";
import { DateItemPropType } from "./types";

const DateItem: FC<DateItemPropType> = ({
  data: { date, isCurrentMonth },
  onClick,
  isSelected,
}) => {
  const onClickHandler = () => {
    onClick(date);
  };

  const isExpired = new Date().getMonth() === date.getMonth() && (new Date().valueOf() - date.valueOf() > 1000 * 3600 * 24)

  return (
    <Pressable
      style={[
        calendarStyles.calendarItem,
        { backgroundColor: isSelected && isCurrentMonth ? backgroundColors.blue : textColors.white }
      ]}
      onPress={isCurrentMonth && !isExpired ? onClickHandler : undefined}
    >
      <Text
        style={[
          calendarStyles.item,
          text17,
          { color: isSelected ? textColors.white : textColors.black },
          (!isCurrentMonth || isExpired) && textGrey,
        ]}
      >
        {date.getDate()}
      </Text>
    </Pressable>
  );
};

export default DateItem;
