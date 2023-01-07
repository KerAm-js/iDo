import React, { FC, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { bell } from "../../../../assets/icons/bell";
import { calendarEvent } from "../../../../assets/icons/calendar";
import { clock } from "../../../../assets/icons/clock";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { folderSelector } from "../../../redux/selectors/folderSelector";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { regularBorderRadius } from "../../../styles/global/borderRadiuses";
import { textColors } from "../../../styles/global/colors";
import {
  text12LineHeight,
  text16LineHeight,
  textGrey,
  textRed,
} from "../../../styles/global/texts";
import {
  EXPIRED,
  FOR_WEEK,
  TODAY,
  TOMORROW,
  YESTERDAY,
} from "../../../utils/constants/periods";
import {
  getDate,
  getTimeStringBySecondsConverting,
  isDayEnd,
  isToday,
  isTomorrow,
  isYesterday,
} from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import ListItem from "../../Layouts/ListItem/ListItem";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ taskObject, sectionType, completeTask }) => {
  const dispatch: AppDispatch = useDispatch();
  const { folders } = useSelector(folderSelector);
  const language = useSelector(getLanguage);

  const { task, time, isCompleted, timeType, folder, isExpired, remindTime } =
    taskObject;

  const openEditTaskPopup = () =>
    dispatch(chooseTaskToEditAction({ ...taskObject }));
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

  const folderIconXml: string = folder
    ? folders.find((item) => item.id === folder)?.title || ""
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

  if (
    remindTime &&
    (remindTime !== time || !timeString)
  ) {
    const reminder = new Date(remindTime);
    if (isDayEnd(reminder)) {
      if (isToday(reminder)) {
        reminderString = languageTexts[language].periods[TODAY];
      } else if (isTomorrow(reminder)) {
        reminderString = languageTexts[language].periods[TOMORROW];
      } else {
        reminderString = getDate(language, { date: reminder }).weekDay;
      }
    } else {
      reminderString = getTimeStringBySecondsConverting(reminder);
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
      <Pressable
        style={[taskStyles.textContainer]}
        onPress={openEditTaskPopup}
      >
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
              <Text style={[text12LineHeight, isExpired ? textRed : textGrey]}>
                {timeString}
              </Text>
            </View>
          )}
          {remindTime && remindTime > new Date().valueOf() && (
            <View style={[taskStyles.infoBlock]}>
              {timeString && <Text style={[textGrey]}>・</Text>}
              <SvgXml
                xml={bell(textColors.grey)}
                width={12}
                height={12}
                style={{ marginRight: 5 }}
              />
              {reminderString && (
                <Text style={[text12LineHeight, textGrey]}>
                  {reminderString}
                </Text>
              )}
            </View>
          )}
          {folderIconXml && (
            <View style={[taskStyles.infoBlock]}>
              {timeString && <Text style={[textGrey]}>・</Text>}
              <Text style={[text12LineHeight, textGrey]}>{folderIconXml}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </ListItem>
  );
};

export default Task;
