import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { text11grey, text15 } from "../../../styles/global/texts";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ task, time, isCompleted }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => setIsChecked(value => !value);

  return (
    <View style={taskStyles.container}>
      <View>
        <Text style={[ text15, taskStyles.title ]}>{task}</Text>
        <Text style={[ text11grey ]}>{time}</Text>
      </View>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
    </View>
  )
}

export default Task;