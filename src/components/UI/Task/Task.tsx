import React, { FC, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { bell } from "../../../../assets/icons/bell";
import { calendarEvent } from "../../../../assets/icons/calendar";
import { clock } from "../../../../assets/icons/clock";
import { repeat } from "../../../../assets/icons/repeat";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { folderSelector } from "../../../redux/selectors/folderSelector";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { regularBorderRadius } from "../../../styles/global/borderRadiuses";
import { textColors } from "../../../styles/global/colors";
import {
  text12LineHeight,
  text16LineHeight,
  textGrey,
  textRed,
} from "../../../styles/global/texts";
import {
  CALENDAR_DAY,
  EXPIRED,
  FOR_WEEK,
  TODAY,
  TOMORROW,
  YESTERDAY,
} from "../../../utils/constants/periods";
import {
  getDate,
  getDaysDiff,
  getTimeStringWithSecondsConverting,
  isDayEnd,
  isToday,
  isTomorrow,
  isWeeklyTime,
  isYesterday,
} from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import ListItem from "../../Layouts/ListItem/ListItem";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ taskObject, sectionType, completeTask }) => {
  const { folders } = useSelector(folderSelector);
  const language = useSelector(getLanguage);

  const {
    task,
    time,
    isCompleted,
    timeType,
    folderId,
    isExpired,
    remindTime,
    isRegular
  } = taskObject;

  const [isChecked, setIsChecked] = useState(isCompleted ? true : false);

  const toggleChecked = () => {
    const { title, subTitle } = languageTexts[language].alerts.taskUncompleting;
    if (isCompleted && new Date().valueOf() > time && !isExpired) {
      Alert.alert(title, subTitle, [
        {
          text: languageTexts[language].words.cancel,
          onPress: () => null,
          style: "cancel",
        },
        {
          text: languageTexts[language].words.ok,
          onPress: () => {
            completeTask(taskObject);
            setIsChecked((value) => !value);
          },
          style: "destructive",
        },
      ]);
    } else {
      completeTask(taskObject);
      setIsChecked((value) => !value);
    }
  };

  const folderIconXml: string = folderId
    ? folders.find((item) => item.id === folderId)?.title || ""
    : "";
  let timeString = "";
  let reminderString = "";
  let xml = "";

  const taskTime = new Date(time);

  if (sectionType === FOR_WEEK) {
    if (isToday(taskTime)) {
      timeString = languageTexts[language].periods[TODAY];
    } else if (isTomorrow(taskTime)) {
      timeString = languageTexts[language].periods[TOMORROW];
    } else {
      timeString = getDate(language, { date: taskTime }).weekDay;
    }
    xml = calendarEvent(textColors.grey);
  } else if (sectionType === EXPIRED) {
    if (isYesterday(taskTime)) {
      timeString = languageTexts[language].periods[YESTERDAY];
    } else {
      timeString = getDate(language, { date: taskTime }).date;
    }
    xml = calendarEvent(textColors.red);
  } else {
    xml = clock(isExpired ? textColors.red : textColors.grey);
  }

  if (timeType === "time") {
    timeString +=
      (timeString.length > 0 ? ", " : "") +
      new Date(time)?.toTimeString().slice(0, 5);
  }

  if (remindTime && (remindTime !== time || !timeString)) {
    const reminder = new Date(remindTime);
    if (isDayEnd(reminder) || getDaysDiff(reminder, taskTime) !== 0) {
      if (
        sectionType === CALENDAR_DAY &&
        getDaysDiff(reminder, taskTime) !== 0
      ) {
        reminderString = getDate(language, {
          date: reminder,
        }).date;
      } else if (
        isToday(reminder) ||
        isTomorrow(reminder) ||
        sectionType === CALENDAR_DAY
      ) {
        reminderString = languageTexts[language].periods.midnight;
      } else if (isWeeklyTime(reminder)) {
        reminderString = getDate(language, {
          date: reminder,
          isShort: true,
        }).weekDay;
      } else {
        reminderString = getDate(language, {
          date: reminder,
          isShort: true,
        }).date;
      }
    }
    if (!isDayEnd(reminder)) {
      reminderString =
        reminderString +
        (reminderString.length > 0 ? ", " : "") +
        getTimeStringWithSecondsConverting(reminder);
    }
  }

  useEffect(() => {
    setIsChecked(!!taskObject.isCompleted);
  }, [taskObject.isCompleted]);

  return (
    <ListItem
      isCardColor
      borderRadius={regularBorderRadius}
      style={taskStyles.container}
    >
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
      <View style={[taskStyles.textContainer]}>
        <ThemeText style={text16LineHeight} numberOfLines={1}>
          {task}
        </ThemeText>
        <View style={[taskStyles.infoContainer]}>
          {timeString && xml && (
            <View style={[taskStyles.infoBlock]}>
              <SvgXml
                width={12}
                height={12}
                xml={xml}
                style={{ marginRight: 5 }}
              />
              <Text
                numberOfLines={1}
                style={[text12LineHeight, isExpired ? textRed : textGrey]}
              >
                {timeString}
              </Text>
            </View>
          )}
          {remindTime && remindTime > new Date().valueOf() && (
            <View style={[taskStyles.infoBlock]}>
              {timeString && (
                <Text numberOfLines={1} style={[textGrey]}>
                  ・
                </Text>
              )}
              <SvgXml
                xml={bell(textColors.grey)}
                width={12}
                height={12}
                style={{ marginRight: 5 }}
              />
              {reminderString && (
                <Text numberOfLines={1} style={[text12LineHeight, textGrey]}>
                  {reminderString}
                </Text>
              )}
            </View>
          )}
          {Boolean(isRegular) && (
            <View style={[taskStyles.infoContainer]}>
              {timeString || reminderString ? (
                <Text style={[textGrey]}>・</Text>
              ) : (
                <Text style={[textGrey]}>
                  {languageTexts[language].habitsPeriods.daily + " "}
                </Text>
              )}
              <SvgXml xml={repeat(textColors.grey)} width={12} height={12} />
            </View>
          )}
          {/* {folderIconXml && (
            <View style={[taskStyles.infoBlock]}>
              {timeString && <Text style={[textGrey]}>・</Text>}
              <Text numberOfLines={1} style={[text12LineHeight, textGrey]}>
                {folderIconXml}
              </Text>
            </View>
          )} */}
        </View>
      </View>
    </ListItem>
  );
};

export default Task;
