import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { getNewTaskData } from "../../../redux/selectors/taskSelector";
import { buttonColors } from "../../../styles/global/colors";
import {
  text17LineHeight,
  textGrey,
} from "../../../styles/global/texts";
import { CHOOSE } from "../../../utils/constants/periods";
import { extractCalendarState, getDate } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import { getReminderItemTitle } from "../../../utils/utils";
import ListItem from "../../Layouts/ListItem/ListItem";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
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
  const newTaskData = useSelector(getNewTaskData);
  const language = useSelector(getLanguage);
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
      getDate(language, { date }).date +
      (isCurrentYear ? "" : " " + date.getFullYear()) +
      timeString;
  } else {
    titleString = languageTexts[language].periods[calendarState] + timeString;
  }

  if (minutes) {
    titleString = getReminderItemTitle(language, minutes, 'minute');
  } else if (hours) {
    titleString = getReminderItemTitle(language, hours, 'hour');
  } else if (days) {
    titleString = getReminderItemTitle(language, days, 'day');
  } else if (weeks) {
    titleString = getReminderItemTitle(language, weeks, 'week');
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
        <ThemeText
          style={[
            text17LineHeight,
            isChecked && { color: buttonColors.blue },
            disabled && textGrey,
          ]}
        >
          {titleString}
        </ThemeText>
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
