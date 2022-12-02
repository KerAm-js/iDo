import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { getNewTaskData } from "../../../redux/selectors/taskSelector";
import { buttonColors, themeColors } from "../../../styles/global/colors";
import {
  text17LineHeight,
  textGrey,
} from "../../../styles/global/texts";
import { CHOOSE } from "../../../utils/constants/periods";
import { extractCalendarState, getDate } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import ListItem from "../../Layouts/ListItem/ListItem";
import { popupItemStyles } from "./styles";
import { ReminderCheckItemPropType } from "./types";

const ReminderCheckItem: FC<ReminderCheckItemPropType> = ({
  id,
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  onPress,
  isChecked,
}) => {
  const {theme} = useSelector(prefsSelector);
  const newTaskData = useSelector(getNewTaskData);
  const date = newTaskData.time ? new Date(newTaskData.time) : new Date();
  const isCurrentYear = new Date().getFullYear() === date.getFullYear();
  const calendarState = extractCalendarState(date);
  const timeString =
    newTaskData.timeType === "time"
      ? ", " + date.toLocaleTimeString().slice(0, 5)
      : "";
  let titleString = "";

  if (calendarState === CHOOSE) {
    titleString =
      getDate("ru", { date }).date +
      (isCurrentYear ? "" : " " + date.getFullYear()) +
      timeString;
  } else {
    titleString = languageTexts["ru"].periods[calendarState] + timeString;
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
  );

  const disabled = new Date() > remindDate;

  const onPressHandler = () => {
    onPress(id, remindDate);
  };

  return (
    <Pressable disabled={disabled} onPress={onPressHandler}>
      <ListItem style={popupItemStyles.listItem}>
        <Text
          style={[
            text17LineHeight,
            { color: themeColors[theme].colors.text },
            isChecked && { color: buttonColors.blue },
            disabled && textGrey,
          ]}
        >
          {titleString}
        </Text>
        {/* <Text style={[text14LineHeight, textGrey]}>
          {minutes || hours || days || weeks
            ? "до даты выполнения"
            : "дата выполнения"}
        </Text> */}
      </ListItem>
    </Pressable>
  );
};

export default ReminderCheckItem;
