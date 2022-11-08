import React, { FC, useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { text17, textSemiBold, title18 } from "../../../styles/global/texts";
import { getCalendarArray, getMonthName } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import DateItem from "./DateItem";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, CalendarPropType } from "./types";

const Calendar: FC<CalendarPropType> = ({ date, setDate }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const weekDaysArr = languageTexts["ru"].weekDays.shorts;
  const weekDays = [weekDaysArr[1], ...weekDaysArr.slice(2), weekDaysArr[0]];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [state, setState] = useState<Array<CalendarMonthItemType>>([
    getCalendarArray(month, year),
    getCalendarArray(
      month === 11 ? 0 : month + 1,
      month === 11 ? year + 1 : year
    ),
    getCalendarArray(
      month === 10 ? 0 : month + 2,
      month === 10 ? year + 1 : year
    ),
    getCalendarArray(
      month === 9 ? 0 : month + 3,
      month === 9 ? year + 1 : year
    ),
  ]);

  const onScroll = (event: any) => {
    const newCurrentIndex = Math.round(
      event.nativeEvent.contentOffset.x / WIDTH
    );
    if (newCurrentIndex !== currentIndex) {
      if (newCurrentIndex < currentIndex) {
        setMonth(month === 0 ? 11 : month - 1);
        setYear(month === 0 ? year - 1 : year);
      } else {
        setMonth(month === 11 ? 0 : month + 1);
        setYear(month === 11 ? year + 1 : year);
      }
      setCurrentIndex(newCurrentIndex);
    }
  };

  useEffect(() => {
    if (currentIndex === state.length - 3) {
      const newCalendarArray = [
        getCalendarArray(
          month === 8 ? 0 : month + 3,
          month === 8 ? year + 1 : year
        ),
        getCalendarArray(
          month === 7 ? 0 : month + 4,
          month === 7 ? year + 1 : year
        ),
        getCalendarArray(
          month === 6 ? 0 : month + 5,
          month === 6 ? year + 1 : year
        ),
      ];
      setState((value) => [...value, ...newCalendarArray]);
    }
  }, [month]);

  return (
    <View style={[calendarStyles.container]}>
      <Text style={[calendarStyles.title, title18]}>
        {getMonthName("ru", month) + " " + year}
      </Text>
      <View style={[calendarStyles.weekDaysContainer]}>
        {weekDays.map((weekDay) => {
          return (
            <Text style={[calendarStyles.item, text17, textSemiBold]} key={weekDay}>
              {weekDay}
            </Text>
          );
        })}
      </View>
      <FlatList
        data={state}
        keyExtractor={(_, index) => index.toString()}
        style={[calendarStyles.srollView]}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({
          item,
        }: {
          item: CalendarMonthItemType;
          index: number;
        }) => {
          return (
            <View>
              {item.map((line, index) => {
                return (
                  <View
                    key={index}
                    style={[calendarStyles.daysContainer, { width: WIDTH }]}
                  >
                    {line.map((object) => (
                      <DateItem
                        isSelected={
                          object.date.toLocaleDateString() ===
                          date.toLocaleDateString()
                        }
                        onClick={(date) => setDate(date)}
                        key={object.date.valueOf()}
                        data={object}
                      />
                    ))}
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Calendar;
