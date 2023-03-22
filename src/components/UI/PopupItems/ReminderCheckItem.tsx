import React, { FC, useCallback } from "react";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { popupsSelector } from "../../../redux/selectors/popupsSelector";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";
import { buttonColors } from "../../../styles/global/colors";
import {
  text14LineHeight,
  text17LineHeight,
  textGrey,
} from "../../../styles/global/texts";
import { toLocaleStateString } from "../../../utils/date";
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
  const { taskData } = useSelector(popupsSelector);
  const { language } = useSelector(prefsSelector);
  const date = taskData?.time ? new Date(taskData.time) : new Date();
  let titleString =
    taskData?.timeType === "day"
      ? languageTexts.periods.midnight[language]
      : toLocaleStateString({
          dateValue: date.valueOf(),
          timeType: taskData?.timeType,
          language,
        });

  let remindDate = date;

  if (minutes) {
    titleString = getReminderItemTitle(language, minutes, "minute");
    remindDate = new Date(date.valueOf() - 1000 * 60 * minutes);
  } else if (hours) {
    titleString = getReminderItemTitle(language, hours, "hour");
    remindDate = new Date(date.valueOf() - 1000 * 60 * 60 * hours);
  } else if (days) {
    titleString = getReminderItemTitle(language, days, "day");
    remindDate = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * days);
  } else if (weeks) {
    titleString = getReminderItemTitle(language, weeks, "week");
    remindDate = new Date(date.valueOf() - 1000 * 60 * 60 * 24 * 7 * weeks);
  }

  const disabled =
    (taskData?.isRegular && Boolean(days || weeks)) ||
    (!taskData?.isRegular && new Date().valueOf() >= remindDate.valueOf());

  const onPressHandler = useCallback(() => {
    onPress(id, remindDate);
  }, [taskData?.time]);

  return (
    <Pressable disabled={disabled} onPress={onPressHandler}>
      <ListItem style={popupItemStyles.listItem}>
        <ThemeText
          style={[
            text17LineHeight,
            isChecked && { color: buttonColors.blue },
            disabled && textGrey,
            { marginRight: 10 },
          ]}
        >
          {titleString}
        </ThemeText>
        {id === "0" && !taskData?.isRegular && (
          <Text style={[text14LineHeight, textGrey]}>
            {languageTexts.popupTitles.dateOfCompletion[language]}
          </Text>
        )}
      </ListItem>
    </Pressable>
  );
};

export default ReminderCheckItem;
