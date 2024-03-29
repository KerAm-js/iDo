import React, { FC, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { bell } from "../../../../assets/icons/bell";
import { bellSlash } from "../../../../assets/icons/bellSlash";
import { calendarEvent } from "../../../../assets/icons/calendar";
import { clock } from "../../../../assets/icons/clock";
import { repeat } from "../../../../assets/icons/repeat";
import { store } from "../../../redux/store";
import { LanguageType } from "../../../redux/types/prefs";
import { regularBorderRadius } from "../../../styles/global/borderRadiuses";
import { textColors } from "../../../styles/global/colors";
import { toLocaleStateString } from "../../../utils/date";
import {
  text12LineHeight,
  text16LineHeight,
  textGrey,
  textRed,
} from "../../../styles/global/texts";
import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";
import {
  CALENDAR_DAY,
  EXPIRED,
  FOR_TODAY,
  FOR_TOMORROW,
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
  isYesterday,
} from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import ListItem from "../../Layouts/ListItem/ListItem";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import CheckButton from "../buttons/CheckButton/CheckButton";
import LangText from "../LangText/LangText";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";
import { pen } from "../../../../assets/icons/pen";

const Task: FC<TaskPropTypes> = ({
  taskObject,
  sectionType,
  rStyle,
  completeTask,
}) => {
  const {
    task,
    time,
    isCompleted,
    timeType,
    isExpired,
    remindTime,
    description,
    isRegular,
  } = taskObject;

  const [isChecked, setIsChecked] = useState<boolean>(
    isCompleted ? true : false
  );
  const [_, setObject] = useState<object>({});
  const updateComponent = () => {
    setObject({});
  };

  const toggleChecked = () => {
    const language = store.getState().prefs.language;
    const { title, subTitle } = languageTexts.alerts.taskUncompleting;
    if (isCompleted && new Date().valueOf() > time && !isExpired) {
      Alert.alert(title[language], subTitle[language], [
        {
          text: languageTexts.words.cancel[language],
          onPress: () => null,
          style: "cancel",
        },
        {
          text: languageTexts.words.ok[language],
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

  let timeTitle: LangObjectType | TextGetterType | undefined;
  let timeString: string | undefined;
  let reminderTitle: LangObjectType | TextGetterType | undefined;
  let reminderTimeString: string | undefined;
  let xml = "";

  const taskTime = new Date(time);

  if (sectionType === FOR_WEEK) {
    if (isToday(taskTime)) {
      timeTitle = languageTexts.periods[TODAY];
    } else if (isTomorrow(taskTime)) {
      timeTitle = languageTexts.periods[TOMORROW];
    } else {
      timeTitle = (lang: LanguageType) =>
        getDate(lang, { date: taskTime, isShort: true }).weekDay;
    }
    xml = calendarEvent(textColors.grey);
  } else if (sectionType === EXPIRED) {
    if (isYesterday(taskTime)) {
      timeTitle = languageTexts.periods[YESTERDAY];
    } else {
      timeTitle = (lang: LanguageType) =>
        getDate(lang, { date: taskTime, isShort: true }).date;
    }
    xml = calendarEvent(textColors.red);
  } else {
    xml = clock(isExpired ? textColors.red : textColors.grey);
  }

  if (timeType === "time") {
    timeString =
      (timeTitle ? ", " : "") + new Date(time)?.toTimeString().slice(0, 5);
  }

  if (remindTime && (remindTime !== time || !timeString)) {
    const reminder = new Date(remindTime);
    const isMidnight = isDayEnd(reminder);
    if (isMidnight || getDaysDiff(reminder, taskTime) !== 0) {
      if (
        (sectionType === CALENDAR_DAY ||
          sectionType === FOR_TODAY ||
          sectionType === FOR_TOMORROW) &&
        isMidnight
      ) {
        reminderTitle = languageTexts.periods.midnight;
      } else if (remindTime !== time) {
        reminderTitle = (lang: LanguageType) =>
          toLocaleStateString({
            dateValue: remindTime,
            language: lang,
            isShort: true,
          });
      }
    }
    if (!isMidnight) {
      reminderTimeString =
        (reminderTitle ? ", " : "") +
        getTimeStringWithSecondsConverting(reminder);
    }
  }

  useEffect(() => {
    setIsChecked(!!taskObject.isCompleted);
  }, [taskObject.isCompleted]);

  useEffect(() => {
    if (remindTime) {
      const timeDiff = remindTime - new Date().valueOf();
      if (timeDiff >= 0) {
        const timeOut = setTimeout(() => {
          updateComponent();
        }, timeDiff);
        return () => {
          if (timeOut) {
            clearTimeout(timeOut);
          }
        };
      }
    }
  }, [remindTime]);

  const isDescriptionShowed = !(
    timeTitle ||
    timeString ||
    reminderTitle ||
    reminderTimeString ||
    isRegular
  );

  return (
    <ListItem
      isCardColor
      borderRadius={regularBorderRadius}
      style={taskStyles.container}
      rStyle={rStyle}
    >
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
      <View style={[taskStyles.textContainer]}>
        <ThemeText style={text16LineHeight} numberOfLines={1}>
          {task}
        </ThemeText>
        <View style={[taskStyles.infoContainer]}>
          {xml && (timeTitle || timeString) && (
            <SvgXml
              width={12}
              height={12}
              xml={xml}
              style={{ marginRight: 5 }}
            />
          )}
          {timeTitle && (
            <LangText
              style={[text12LineHeight, isExpired ? textRed : textGrey]}
              handleTheme={false}
              title={timeTitle}
            />
          )}
          {timeString && (
            <Text
              numberOfLines={1}
              style={[text12LineHeight, isExpired ? textRed : textGrey]}
            >
              {timeString}
            </Text>
          )}
          {remindTime && (
            <View style={[taskStyles.infoBlock]}>
              {(timeTitle || timeString) && <Text style={[textGrey]}>・</Text>}
              <SvgXml
                xml={
                  isCompleted
                    ? bellSlash(textColors.grey)
                    : bell(
                        remindTime > new Date().valueOf()
                          ? textColors.grey
                          : textColors.red
                      )
                }
                width={12}
                height={12}
                style={{
                  marginRight: reminderTitle || reminderTimeString ? 5 : 0,
                }}
              />
              {reminderTitle && (
                <LangText
                  style={[
                    text12LineHeight,
                    remindTime > new Date().valueOf() || isCompleted
                      ? textGrey
                      : textRed,
                  ]}
                  handleTheme={false}
                  title={reminderTitle}
                />
              )}
              {reminderTimeString && (
                <Text
                  numberOfLines={1}
                  style={[
                    text12LineHeight,
                    remindTime > new Date().valueOf() || isCompleted
                      ? textGrey
                      : textRed,
                  ]}
                >
                  {reminderTimeString}
                </Text>
              )}
            </View>
          )}
          {Boolean(isRegular) && (
            <View style={[taskStyles.infoContainer]}>
              {timeString ||
              timeTitle ||
              reminderTimeString ||
              reminderTitle ? (
                <Text style={[textGrey]}>・</Text>
              ) : (
                <>
                  <LangText
                    style={[text12LineHeight, textGrey]}
                    handleTheme={false}
                    title={languageTexts.habitsPeriods.daily}
                  />
                  <Text> </Text>
                </>
              )}
              <SvgXml xml={repeat(textColors.grey)} width={12} height={12} />
            </View>
          )}
          {description && (
            <View style={[taskStyles.infoBlock]}>
              {!isDescriptionShowed && <Text style={[textGrey]}>・</Text>}
              <SvgXml
                width={12}
                height={12}
                xml={pen(textColors.grey)}
                style={{ marginRight: isDescriptionShowed ? 5 : 0 }}
              />
              {isDescriptionShowed && (
                <Text
                  numberOfLines={1}
                  style={[
                    text12LineHeight,
                    textGrey,
                    { maxWidth: "100%", paddingRight: 15 },
                  ]}
                >
                  {description}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </ListItem>
  );
};

const shouldTaskRerender = (prev: TaskPropTypes, curr: TaskPropTypes) => {
  return JSON.stringify(curr.taskObject) === JSON.stringify(prev.taskObject);
};

export default React.memo(Task, shouldTaskRerender);
