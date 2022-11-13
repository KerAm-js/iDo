import React, { FC, useState } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { useDispatch } from "react-redux";
import { chooseTaskToEditAction } from "../../../redux/actions/taskActions";
import { AppDispatch } from "../../../redux/types/appDispatch";
import {
  borderSmoothing,
  regularBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { cardColors } from "../../../styles/global/colors";
import { text12, text16, textGrey } from "../../../styles/global/texts";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants/periods";
import { getDate } from "../../../utils/date";
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
  completingTime,
  completeTask,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const openEditTaskPopup = () =>
    dispatch(
      chooseTaskToEditAction({
        task,
        time,
        id,
        isCompleted,
        completingTime,
        description,
        timeType,
      })
    );
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => {
    completeTask(id);
    setIsChecked((value) => !value);
  };

  let timeString = "";

  if (time && sectionType === FOR_WEEK) {
    timeString = getDate("ru", { date: new Date(time) }).weekDay;
  } else if (time && sectionType === FOR_MONTH) {
    timeString = getDate("ru", { date: new Date(time) }).date;
  }

  if (timeType === "time") {
    timeString += (timeString.length > 0 ? ", " : "") + new Date(time)?.toTimeString().slice(0, 5);
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
        <Text style={[text16, taskStyles.title]} numberOfLines={1}>
          {task}
        </Text>
        {timeString && (
          <Text style={[taskStyles.subTitle, text12, textGrey]}>
            {timeString}
          </Text>
        )}
      </Pressable>
    </SquircleView>
  );
};

export default Task;
