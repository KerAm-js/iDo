import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { text11, text15, textGrey } from "../../../styles/global/texts";
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
        <Text style={[text15, taskStyles.title]}>{task}</Text>
        { time && <Text style={[text11, textGrey]}>{time.toTimeString().slice(0, 5)}</Text> }
      </View>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
    </View>
  );
};

export default Task;
