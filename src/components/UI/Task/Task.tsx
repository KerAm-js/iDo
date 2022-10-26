import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { text12, text16, textGrey } from "../../../styles/global/texts";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants";
import { getDate } from "../../../utils/date";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ task, time, timeType, id, isCompleted, completeTask }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => {
    completeTask(id);
    setIsChecked((value) => !value);
  };

  let timeString = time?.toTimeString().slice(0, 5);

  if (time && timeType === FOR_WEEK) {
    timeString = getDate("ru", {date: time}).weekDay;
  } else if (time && timeType === FOR_MONTH) {
    timeString = getDate("ru", {date: time}).date;
  }

  return (
    <View style={[taskStyles.container]}>
      <View>
        <Text style={[text16, taskStyles.title]}>{task}</Text>
        { 
          timeString && <Text style={[taskStyles.subTitle, text12, textGrey]}>{timeString}</Text>
        }
      </View>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
    </View>
  );
};

export default Task;
