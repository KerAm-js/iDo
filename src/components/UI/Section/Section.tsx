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
import {
  sortTasksByTime,
  taskListToObject,
  taskListToPositionsObject,
} from "../../../utils/taskUI";
import { TaskType } from "../Task/types";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { PositionsObject } from "../../../types/global/PositionsObject";

const TaskMargin = 10;
const TaskHeight = 63 + TaskMargin;

const Section: FC<SectionProps> = ({ title, list }) => {
  const [isListHidden, setIsListHidden] = useState<boolean>(false);
  const [isCompletedListHidden, setIsCompletedListHidden] =
    useState<boolean>(false);
  const [data, setData] = useState<Array<TaskType>>(sortTasksByTime(list));
  const [upperBound, setUpperBound] = useState<number>(data.length - 1);
  const [positionsState, setPositionsState] = useState<PositionsObject>(
    taskListToPositionsObject(list)
  );
  const updatePositionState = (list: PositionsObject) =>
    setPositionsState(list);
  const updateUpperBound = (newUpperBound: number) =>
    setUpperBound(newUpperBound);

  const positions = useSharedValue<ListObject>(taskListToObject(data));
  const opacity = useSharedValue(1);
  const completedListOpacity = useSharedValue(1);
  const completedMarkerTop = useSharedValue((upperBound + 2) * TaskHeight);
  const completedMarkerOpacity = useSharedValue(0);

  const listContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value, completedListOpacity.value]);

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
    const listheight = interpolate(
      completedListOpacity.value, 
      [0, 1],
      [data.filter(task => !task.isCompleted).length * TaskHeight, data.length * TaskHeight]
    )
    const baseHeight = interpolate(
      completedMarkerOpacity.value,
      [0, 1],
      [listheight, listheight + 36]
    )
    const height = interpolate(
      opacity.value,
      [0, 1],
      [30, baseHeight + 30]
    );
    return {
      height,
      overflow: isListHidden ? "hidden" : "visible",
    };
  }, [opacity.value, data, completedListOpacity.value]);

  const toggleListVisible = () => {
    setIsListHidden((value) => !value);
    opacity.value = withTiming(isListHidden ? 1 : 0, { duration: 200 });
  };

  const toggleCompletedListVisible = () => {
    setIsCompletedListHidden((value) => !value);
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

  useEffect(() => {
    if (upperBound === data.length - 1) {
      completedMarkerOpacity.value = withTiming(0, {duration: 100});
    }
  }, [upperBound]);

  return (
    <Animated.View style={[sectionStyles.container, containerStyle]}>
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
            minHeight: (data?.length * TaskHeight) | 0,
          },
        ]}
      >
        {data?.map((item, index) => {
          return (
            <MovableItem
              key={item.task + index}
              positions={positions}
              positionsState={positionsState}
              markerOpacity={completedMarkerOpacity}
              id={item.id}
              itemHeight={TaskHeight}
              component={Task}
              componentProps={{ ...item, completeTask }}
              updatePositionsState={updatePositionState}
              upperBound={upperBound}
              completedMarkerTop={completedMarkerTop}
              updateUpperBound={updateUpperBound}
              opacity={item.isCompleted ? completedListOpacity : opacity}
            />
          );
        })}
        <CompletedMarker
          top={completedMarkerTop}
          onPress={toggleCompletedListVisible}
          completedListOpacity={completedListOpacity}
          opacity={completedMarkerOpacity}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Section;
