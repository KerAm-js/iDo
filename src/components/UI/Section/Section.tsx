import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { title20 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { SectionProps } from "./types";
import IconButton from "../buttons/IconButton/IconButton";
import Task from "../Task/Task";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import { taskListToObject } from "../../../utils/taskUI";
import { dynamicPropObject } from "../../../types/global/dynamicPropObject";
import { TaskType } from "../Task/types";
import CompletedMarker from "../Task/CompletedMarker";

const TaskMargin = 10;
const TaskHeight = 63 + TaskMargin;

const Section: FC<SectionProps> = ({ title, list }) => {
  const [isListHidden, setIsListHidden] = useState<boolean>(false);
  const [isCompletedListHidden, setIsCompletedListHidden] =
    useState<boolean>(false);
  const [data, setData] = useState<Array<TaskType>>(list);
  const [positionsState, setPositionsState] = useState<
    dynamicPropObject<number>
  >(taskListToObject(list));
  const completedTasks: Array<TaskType> = data.filter((el) => el.isCompleted);
  const notCompletedTasks: Array<TaskType> = data.filter(
    (el) => !el.isCompleted
  );
  const updateData = (list: dynamicPropObject<number>) =>
    setPositionsState(list);

  const positions = useSharedValue(positionsState);
  const opacity = useSharedValue(1);
  const completedListOpacity = useSharedValue(1);

  const listContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value]);

  const completedListContainerStyle = useAnimatedStyle(() => {
    const completedListHeight = interpolate(
      completedListOpacity.value,
      [0, 1],
      [0, completedTasks.length * TaskHeight]
    );
    return {
      opacity: completedListOpacity.value,
      height: completedListHeight,
      backgroundColor: '#000'
    };
  }, [completedListOpacity.value, data]);

  const arrowStyle = useAnimatedStyle(() => {
    const iconRotation = interpolate(opacity.value, [0, 1], [-90, 0]);
    return {
      transform: [
        {
          rotate: `${iconRotation}deg`,
        },
      ],
    };
  }, [opacity.value]);

  const containerStyle = useAnimatedStyle(() => {
    const completedListHeight = interpolate(
      completedListOpacity.value,
      [0, 1],
      [0, completedTasks.length * TaskHeight]
    );
    const completedMarkerHeight = completedTasks.length > 0 ? 20 + 16 : 0;
    const height = interpolate(
      opacity.value,
      [0, 1],
      [
        30,
        notCompletedTasks.length * TaskHeight + 30 +
          completedListHeight +
          completedMarkerHeight,
      ]
    );
    return {
      height,
      overflow: isListHidden ? "hidden" : "visible",
    };
  }, [opacity.value, data, completedListOpacity.value]);

  const toggleListVisible = () => {
    setIsListHidden(!isListHidden);
    opacity.value = withTiming(isListHidden ? 1 : 0, { duration: 200 });
    completedListOpacity.value = withTiming(isListHidden ? 1 : 0, {
      duration: 100,
    });
  };

  const toggleCompletedListVisible = () => {
    setIsCompletedListHidden(!isCompletedListHidden);
    completedListOpacity.value = withTiming(isCompletedListHidden ? 1 : 0, {
      duration: 200,
    });
  };

  const completeTask = (id: string) => {
    const tasksCopy = data.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          isCompleted: !el.isCompleted,
        };
      } else {
        return el;
      }
    });
    setData(tasksCopy);
  };

  useEffect(() => {}, [completedListOpacity.value]);

  useEffect(() => {
    positions.value = taskListToObject(notCompletedTasks);
  }, [data]);

  return (
    <Animated.View
      key={title}
      style={[sectionStyles.container, containerStyle]}
    >
      <View style={sectionStyles.headerContainer}>
        <Text style={title20}>{title}</Text>
        <Animated.View style={[arrowStyle]}>
          <IconButton
            xml={arrowBottomGrey}
            onClick={toggleListVisible}
            iconWidth={16}
            iconHeight={16}
          />
        </Animated.View>
      </View>
      <Animated.View
        style={[
          listContainerStyle,
          {
            minHeight: (notCompletedTasks?.length * TaskHeight) | 0,
          },
        ]}
      >
        {notCompletedTasks?.map((item, index) => {
          return (
            <MovableItem
              key={index + item.task}
              positions={positions}
              id={item.id}
              itemHeight={TaskHeight}
              component={Task}
              componentProps={{ ...item, completeTask }}
              updateData={updateData}
            />
          );
        })}
      </Animated.View>
      {completedTasks.length > 0 && (
        <CompletedMarker
          onPress={toggleCompletedListVisible}
          opacity={completedListOpacity}
        />
      )}
      <Animated.View style={[completedListContainerStyle]}>
        {completedTasks?.map((item, index) => {
          return (
            <Task
              key={index + item.task}
              {...item}
              completeTask={completeTask}
            />
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

export default Section;
