import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { text17, textSemiBold, title18 } from "../../../styles/global/texts";
import { getCalendarArray, getMonthName, toMonthYearString } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import List from "./List";
import { calendarStyles } from "./styles";
import { CalendarMonthItemType, CalendarPropType } from "./types";

const Calendar: FC<CalendarPropType> = ({
  date,
  setDate,
  setGlobalTitle,
  isCardBackgroundColor,
  pastDatesShown,
}) => {
  const language = useSelector(getLanguage);
  const { width: WIDTH } = Dimensions.get("screen");
  const currDate = new Date();
  const weekDaysArr = languageTexts[language].weekDays.shorts;
  const weekDays = [weekDaysArr[1], ...weekDaysArr.slice(2), weekDaysArr[0]];
  const currentIndex = 0;
  const scrollViewRef = useRef(null);
  const [title, setTitle] = useState<string>(
    getMonthName(language, currDate.getMonth()) + " " + currDate.getFullYear()
  );
  const [state, setState] = useState<Array<CalendarMonthItemType>>(
    getCalendarArray(currDate, 1)
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newCurrentIndex = Math.round(
      event.nativeEvent.contentOffset.x / WIDTH
    );
    const newTitle = toMonthYearString({ date: currDate, language })

    if (newCurrentIndex === 0) {
      if (setGlobalTitle) {
        setGlobalTitle(newTitle);
      } else {
        setTitle(newTitle);
      }
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
      const newTitle = getMonthName(language, nextMonth) + " " + nextYear;
      if (setGlobalTitle) {
        setGlobalTitle(newTitle);
      } else {
        setTitle(newTitle);
      }
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
      <List
        reference={scrollViewRef}
        state={state}
        date={date}
        setDate={setDate}
        onScrollEnd={onScroll}
        isCardBackgroundColor={isCardBackgroundColor}
        pastDatesShown={pastDatesShown}
      />
    ),
    [state, date]
  );

  useEffect(() => {
    const newTitle = toMonthYearString({ date: currDate, language })

    if (setGlobalTitle) {
      setGlobalTitle(newTitle);
    } else {
      setTitle(newTitle);
    }
  }, [language]);

  return (
    <View style={[calendarStyles.container]}>
      {!setGlobalTitle && (
        <ThemeText style={[calendarStyles.title, title18]}>{title}</ThemeText>
      )}
      <View style={[calendarStyles.weekDaysContainer]}>
        {weekDays.map((weekDay) => {
          return (
            <ThemeText
              style={[calendarStyles.item, text17, textSemiBold]}
              key={weekDay}
            >
              {weekDay}
            </ThemeText>
          );
        })}
      </View>
      {renderList}
    </View>
  );
};

export default Calendar;
