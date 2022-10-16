import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { text11, text15, textGrey } from "../../../styles/global/texts";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({ task, time, isCompleted, onLongPress }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => setIsChecked((value) => !value);

  return (
    <View style={[taskStyles.container]}>
      <Pressable
        style={[ taskStyles.pressable ]}
        onLongPress={onLongPress}
      />
      <View>
        <Text style={[text15, taskStyles.title]}>{task}</Text>
        <Text style={[text11, textGrey]}>{time}</Text>
      </View>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
    </View>
  );
};

export default Task;
