import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import {
  buttonColors,
  textColors,
  themeColors,
} from "../../../styles/global/colors";
import { text17, textGrey, title18 } from "../../../styles/global/texts";
import { isToday } from "../../../utils/date";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { calendarStyles } from "./styles";
import { DateItemPropType } from "./types";

const DateItem: FC<DateItemPropType> = React.memo(
  ({
    data: { date, isCurrentMonth },
    onClick,
    isSelected,
    busyness,
    isCardBackgroundColor,
    pastDatesShown,
    busynessShown,
  }) => {
    const theme = useTheme();
    const isExpired =
      new Date().getMonth() === date.getMonth() &&
      new Date().valueOf() - date.valueOf() > 1000 * 3600 * 24 &&
      !pastDatesShown;
    const onClickHandler = () => {
      onClick(date);
    };

    let circleColor = "";

    if (busyness?.hasExpired) {
      circleColor = textColors.red;
    } else if (busyness?.hasCompleted) {
      circleColor = textColors.green;
    } else if (busyness?.hasUncompleted) {
      circleColor = textColors.blue;
    }

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
            isToday(date) ? { color: textColors.blue, ...title18 } : null,
            isSelected ? { color: themeColors.dark.colors.text } : null,
            !isCurrentMonth || isExpired ? textGrey : null,
          ]}
        >
          {date.getDate()}
        </ThemeText>
        {busynessShown && busyness && !isSelected && (
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: circleColor,
              position: "absolute",
              bottom: 2,
            }}
          />
        )}
      </Pressable>
    );
  },
  (prevProps, currProps) => {
    if (
      prevProps.isSelected === currProps.isSelected &&
      JSON.stringify(prevProps.busyness) === JSON.stringify(currProps.busyness)
    ) {
      return true;
    } else {
      return false;
    }
  }
);

export default DateItem;
