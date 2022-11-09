import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { chooseTaskToEdit } from "../../../redux/actions/taskActions";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { borderSmoothing, regularBorderRadius } from "../../../styles/global/borderRadiuses";
import { cardColors } from "../../../styles/global/colors";
import { text12, text16, textGrey } from "../../../styles/global/texts";
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK, TODAY, TOMORROW } from "../../../utils/constants";
import { getDate } from "../../../utils/date";
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
}) => {
  const dispatch: AppDispatch = useDispatch();
  const tranlsationX = useSharedValue(0);
  const textOpacity = useSharedValue(1);

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
    textOpacity.value = withTiming(!isCompleted ? 0.5 : 1, {
      duration: 200,
      easing: Easing.out(Easing.quad),
    });
    if (!isCompleted)
      tranlsationX.value = withRepeat(
        withTiming(8, { duration: 200, easing: Easing.out(Easing.quad) }),
        2,
        true
      );
  };

  const textContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateX: tranlsationX.value }],
    };
  });

  let timeString = time ? new Date(time)?.toTimeString().slice(0, 5) : '';

  if (time && sectionType === FOR_WEEK) {
    timeString = getDate("ru", { date: new Date(time) }).weekDay;
  } else if (time && sectionType === FOR_MONTH) {
    timeString = getDate("ru", { date: new Date(time) }).date;
  } else if (time && sectionType === FOR_TODAY && timeType === 'day') {
    timeString = languageTexts['ru'].periods[TODAY];
  } else if (time && sectionType === FOR_TOMORROW && timeType === 'day') {
    timeString = languageTexts['ru'].periods[TOMORROW];
  }

  console.log(timeType)

  return (
    <SquircleView
      style={[taskStyles.container]}
      squircleParams={{
        cornerSmoothing: borderSmoothing,
        cornerRadius: regularBorderRadius,
        fillColor: cardColors.white
      }}
    >
      <CheckButton isCompleted={isChecked} onClick={toggleChecked} />
      <Pressable style={[taskStyles.textContainer]} onPress={openEditTaskPopup}>
        <Animated.View style={textContainerStyle}>
          <Text style={[text16, taskStyles.title]} numberOfLines={1}>
            {task}
          </Text>
          {timeString && (
            <Text style={[taskStyles.subTitle, text12, textGrey]}>
              {timeString}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </SquircleView>
  );
};

export default Task;
