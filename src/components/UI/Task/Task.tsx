import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { chooseTaskToEdit } from "../../../redux/actions/taskActions";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { text12, text16, textGrey } from "../../../styles/global/texts";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants";
import { getDate } from "../../../utils/date";
import CheckButton from "../buttons/CheckButton/CheckButton";
import { taskStyles } from "./styles";
import { TaskPropTypes } from "./types";

const Task: FC<TaskPropTypes> = ({
  task,
  time,
  timeType,
  id,
  description,
  isCompleted,
  completeTask,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const tranlsationX = useSharedValue(0);
  const openEditTaskPopup = () =>
    dispatch(
      chooseTaskToEdit({
        task,
        time,
        id,
        isCompleted,
        description,
      })
    );
  const [isChecked, setIsChecked] = useState(isCompleted);
  const toggleChecked = () => {
    completeTask(id);
    setIsChecked((value) => !value);
    if (!isCompleted) tranlsationX.value = withRepeat(withTiming(15, {duration: 200}), 2, true);
  };

  const textContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: tranlsationX.value}
      ]
    }
  })

  let timeString = time?.toTimeString().slice(0, 5);

  if (time && timeType === FOR_WEEK) {
    timeString = getDate("ru", { date: time }).weekDay;
  } else if (time && timeType === FOR_MONTH) {
    timeString = getDate("ru", { date: time }).date;
  }

  return (
    <View style={[taskStyles.container]}>
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
      <Pressable style={[taskStyles.textContainer]} onPress={openEditTaskPopup}>
        <Animated.View style={textContainerStyle}>
          <Text style={[text16, taskStyles.title]}>{task}</Text>
          {timeString && (
            <Text style={[taskStyles.subTitle, text12, textGrey]}>
              {timeString}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default Task;
