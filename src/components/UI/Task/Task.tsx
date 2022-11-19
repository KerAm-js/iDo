import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { calendarEventGrey } from "../../../../assets/icons/calendar";
import { clock } from "../../../../assets/icons/clock";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { folderSelector } from "../../../redux/selectors/folderSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import {
  borderSmoothing,
  regularBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { cardColors } from "../../../styles/global/colors";
import { text12LineHeight, text16LineHeight, textGrey } from "../../../styles/global/texts";
import { FOR_WEEK, TODAY, TOMORROW } from "../../../utils/constants/periods";
import { getDate, isToday, isTomorrow } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({
  task,
  time,
  timeType,
  sectionType,
  id,
  description,
  isCompleted,
  completeTask,
  folder,
  remindTime
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { folders } = useSelector(folderSelector);

  const openEditTaskPopup = () =>
    dispatch(
      chooseTaskToEditAction({
        task,
        time,
        id,
        isCompleted,
        description,
        timeType,
        folder,
        remindTime
      })
    );
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => {
    completeTask(id);
    setIsChecked((value) => !value);
  };

  const folderIconXml: string  = folder ? folders.find(item => item.id === folder)?.title || '' : '';
  let timeString = "";
  let xml = "";

  if (sectionType === FOR_WEEK) {
    const date = new Date(time);
    if (isToday(date)) {
      timeString = languageTexts['ru'].periods[TODAY];
    } else if (isTomorrow(date)) {
      timeString = languageTexts['ru'].periods[TOMORROW];
    } else {
      timeString = getDate("ru", { date: new Date(time) }).weekDay;
    }
    xml = calendarEventGrey;
  } else {
    xml = clock;
  }

  if (timeType === "time") {
    timeString += (timeString.length > 0 ? ', ' : '') + new Date(time)?.toTimeString().slice(0, 5);
  } 

  return (
    <SquircleView
      style={[taskStyles.container]}
      squircleParams={{
        cornerSmoothing: borderSmoothing,
        cornerRadius: regularBorderRadius,
        fillColor: cardColors.white,
      }}
    >
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
      <Pressable
        style={[taskStyles.textContainer, { marginTop: timeString ? 6 : 0 }]}
        onPress={openEditTaskPopup}
      >
        <Text style={[text16LineHeight]} numberOfLines={1}>
          {task}
        </Text>
        <View style={[ taskStyles.infoContainer ]}>
          {timeString && (
            <View style={[ taskStyles.infoBlock ]}>
              <SvgXml 
                width={12}
                height={12}
                xml={xml}
                style={{ marginRight: 5 }}
              />
              <Text style={[text12LineHeight, textGrey]}>
                {timeString}
              </Text>
            </View>
          )}
          {
            folderIconXml && (
              <View style={[ taskStyles.infoBlock ]}>
                {timeString && <Text style={[ textGrey ]}>・</Text>}
                <Text style={[text12LineHeight, textGrey]}>
                  {folderIconXml}
                </Text>
              </View>
            )
          }
        </View>
      </Pressable>
    </SquircleView>
  );
};

export default Task;
