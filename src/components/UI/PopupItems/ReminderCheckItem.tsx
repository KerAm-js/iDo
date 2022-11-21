import React, { FC, useEffect } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { useSelector } from "react-redux";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { backgroundColors } from "../../../styles/global/colors";
import { text14LineHeight, text17LineHeight, textGrey } from "../../../styles/global/texts";
import { CHOOSE } from "../../../utils/constants/periods";
import { extractCalendarState, getDate } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import { popupItemStyles } from "./styles";
import { ReminderCheckItemPropType } from "./types";

const ReminderCheckItem: FC<ReminderCheckItemPropType> = ({
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  onPress,
  isChecked,
}) => {
  const { newTaskData } = useSelector(taskSelector);
  const date = newTaskData.time ? new Date(newTaskData.time) : new Date();
  const isCurrentYear = new Date().getFullYear() === date.getFullYear();
  const calendarState = extractCalendarState(date);
  const timeString = newTaskData.timeType === 'time' ? ', ' + date.toLocaleTimeString().slice(0, 5) : '';
  let titleString = '';

  if (calendarState === CHOOSE) {
    titleString = getDate('ru', { date }).date + (isCurrentYear ? '' : date.getFullYear()) + timeString;
  } else {
    titleString = languageTexts['ru'].periods[calendarState] + timeString;
  } 
  
  if (minutes) {
    titleString = `${minutes} минут`;
  } else if (hours) {
    titleString = `${hours} ${
      hours === 1 ? "час" : hours <= 5 ? "часа" : "часов"
    }`;
  } else if (days) {
    titleString = `${days} ${days === 1 ? "день" : days <= 5 ? "дня" : "дней"}`;
  } else if (weeks) {
    titleString = `${weeks} ${
      weeks === 1 ? "неделя" : weeks <= 5 ? "недели" : "недель"
    }`;
  }

  const remindDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days - weeks * 7,
    date.getHours() - hours,
    date.getMinutes() - minutes,
    date.getSeconds(),
    date.getMilliseconds()
  )

  const disabled = new Date() > remindDate;

  const onPressHandler = () => {
    onPress(remindDate);
  };

  return (
    <Pressable disabled={disabled} onPress={onPressHandler}>
      <SquircleView
        style={[popupItemStyles.listItem]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: smallBorderRadius,
          fillColor: backgroundColors.white,
        }}
      >
        <Text
          style={[
            text17LineHeight,
            isChecked && { color: backgroundColors.blue },
            disabled && textGrey,
          ]}
        >
          {titleString}
        </Text>
        <Text
          style={[
            text14LineHeight,
            textGrey
          ]}
        >
          {
            minutes || hours || days || weeks ? 'до даты выполнения' : 'дата выполнения'
          }
        </Text>
      </SquircleView>
    </Pressable>
  );
};

export default ReminderCheckItem;
