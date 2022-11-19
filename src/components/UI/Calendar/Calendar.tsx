import React, { FC, useMemo, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import { text17, textSemiBold, title18 } from "../../../styles/global/texts";
import { getCalendarArray, getMonthName } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import List from "./List";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, CalendarPropType } from "./types";

const Calendar: FC<CalendarPropType> = ({ date, setDate }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const currDate = new Date();
  const weekDaysArr = languageTexts["ru"].weekDays.shorts;
  const weekDays = [weekDaysArr[1], ...weekDaysArr.slice(2), weekDaysArr[0]];
  const currentIndex = 0;
  const [title, setTitle] = useState<string>(
    getMonthName("ru", currDate.getMonth()) + " " + currDate.getFullYear()
  );
  const [state, setState] = useState<Array<CalendarMonthItemType>>(
    getCalendarArray(currDate, 36)
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newCurrentIndex = Math.round(
      event.nativeEvent.contentOffset.x / WIDTH
    );

    if (newCurrentIndex === 0) {
      setTitle(
        getMonthName("ru", currDate.getMonth()) + " " + currDate.getFullYear()
      );
    }

    if (newCurrentIndex !== currentIndex) {
      const nextSlideDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + newCurrentIndex
      );
      const [nextMonth, nextYear] = [
        nextSlideDate.getMonth(),
        nextSlideDate.getFullYear(),
      ];
      setTitle(getMonthName("ru", nextMonth) + " " + nextYear);
    }

    if (newCurrentIndex === state.length - 1) {
      const nextSlideDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + newCurrentIndex + 1
      );
      setState([
        ...state,
        ...getCalendarArray(nextSlideDate, state.length + 24),
      ]);
    }
  };

  const renderList = useMemo(
    () => (
      <List state={state} date={date} setDate={setDate} onScroll={onScroll} />
    ),
    [state, date]
  );

  return (
    <View style={[calendarStyles.container]}>
      <Text style={[calendarStyles.title, title18]}>{title}</Text>
      <View style={[calendarStyles.weekDaysContainer]}>
        {weekDays.map((weekDay) => {
          return (
            <Text
              style={[calendarStyles.item, text17, textSemiBold]}
              key={weekDay}
            >
              {weekDay}
            </Text>
          );
        })}
      </View>
      {renderList}
    </View>
  );
};

export default Calendar;
