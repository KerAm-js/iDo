import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { backgroundColors } from "../../../styles/global/colors";
import { text17, textBold, textGrey, title18 } from "../../../styles/global/texts";
import { CalendarItemType } from "../../../types/calendar";
import { getCalendarArray, getMonthName } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import { calendarStyles } from "./styles";

const Calendar = () => {
  const { width: WIDTH } = Dimensions.get("screen");
  const weekDaysArr = languageTexts["ru"].weekDays.shorts;
  const weekDays = [weekDaysArr[1], ...weekDaysArr.slice(2), weekDaysArr[0]];
  const [selectedDate, setSelectedDate] = useState();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [state, setState] = useState<Array<CalendarItemType>>([
    getCalendarArray(month, year),
    getCalendarArray(month === 11 ? 0 : month + 1, month === 11 ? year + 1 : year),
    getCalendarArray(month === 10 ? 0 : month + 1, month === 10 ? year + 1 : year),
  ]);

  const bordersOpacity = useSharedValue(0);
  const calendarItemStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
    }
  })

  const onScroll = (event: any) => {
    const newCurrentIndex = Math.round(event.nativeEvent.contentOffset.x / WIDTH);
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
    if (currentIndex === (state.length - 1)) {
      const newCalendarArray = getCalendarArray(month + 1, year);
      setState((value) => [...value, newCalendarArray]);
    }
  }, [month])

  return (
    <View style={[calendarStyles.container]}>
      <Text style={[calendarStyles.title, title18]}>
        {getMonthName('ru', month) + ' ' + year}
      </Text>
      <View style={[calendarStyles.weekDaysContainer]}>
        {weekDays.map((weekDay) => {
          return (
            <Text style={[calendarStyles.item, text17, textBold]} key={weekDay}>
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
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => bordersOpacity.value = withTiming(1, {duration: 300})}
        onScrollEndDrag={() => bordersOpacity.value = withTiming(0, {duration: 300})}
        onScroll={onScroll}
        renderItem={({
          item,
        }: {
          item: CalendarItemType;
          index: number;
        }) => {
          return (
            <View style={[calendarStyles.calendarItem]}>
              {item.map((line, index) => {
                return (
                  <View
                    key={index}
                    style={[calendarStyles.daysContainer, { width: WIDTH }]}
                  >
                    {line.map((object) => {
                      return (
                        <Text
                          key={object.date.valueOf()}
                          style={[
                            calendarStyles.item,
                            text17,
                            !object.isCurrentMonth && textGrey,
                          ]}
                        >
                          {object.date.getDate()}
                        </Text>
                      );
                    })}
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
