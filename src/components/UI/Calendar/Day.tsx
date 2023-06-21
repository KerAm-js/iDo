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
import { DayPropType } from "./types";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarChoosedDateAction } from "../../../redux/actions/popupsActions";

const Day: FC<DayPropType> = ({
  data,
  date,
  setDate,
  busyness,
  isChoosed,
  isCardBackgroundColor,
  pastDatesShown,
  busynessShown,
}) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const onClick = () => {
    if (date && setDate) {
      setDate(data.date);
    } else {
      dispatch(setCalendarChoosedDateAction(data.date.valueOf()));
    }
  };
  const isExpired =
    new Date().getMonth() === data.date.getMonth() &&
    new Date().valueOf() - data.date.valueOf() > 1000 * 3600 * 24 &&
    !pastDatesShown;

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
            isChoosed && data.isCurrentMonth
              ? buttonColors.blue
              : isCardBackgroundColor
              ? theme.colors.card
              : theme.colors.background,
        },
      ]}
      onPress={data.isCurrentMonth && !isExpired ? onClick : undefined}
    >
      <ThemeText
        style={[
          calendarStyles.item,
          text17,
          isToday(data.date) ? { color: textColors.blue, ...title18 } : null,
          isChoosed ? { color: themeColors.dark.colors.text } : null,
          !data.isCurrentMonth || isExpired ? textGrey : null,
        ]}
      >
        {data.date.getDate()}
      </ThemeText>
      {busynessShown && busyness && !isChoosed && (
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
};

export default React.memo(Day, (prevProps, currProps) => {
  return (
    prevProps.isChoosed === currProps.isChoosed &&
    JSON.stringify(prevProps.busyness) === JSON.stringify(currProps.busyness)
  );
});
