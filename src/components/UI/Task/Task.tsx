import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { text12, text16, textGrey } from "../../../styles/global/texts";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ task, time, id, isCompleted, completeTask }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => {
    completeTask(id);
    setIsChecked((value) => !value);
  };

  return (
    <View style={[taskStyles.container]}>
      <View>
        <Text style={[text16, taskStyles.title]}>{task}</Text>
        { time && <Text style={[taskStyles.subTitle, text12, textGrey]}>{time.toTimeString().slice(0, 5)}</Text> }
      </View>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
    </View>
  );
};

export default Task;
