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
import { taskListToObject, taskListToPositionsObject } from "../../../utils/taskUI";
import { TaskType } from "../Task/types";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { PositionsObject } from "../../../types/global/PositionsObject";

const TaskMargin = 10;
const TaskHeight = 63 + TaskMargin;

const Section: FC<SectionProps> = ({ title, list }) => {
  const [isListHidden, setIsListHidden] = useState<boolean>(false);
  const [data, setData] = useState<Array<TaskType>>(list);
  const [upperBound, setUpperBound] = useState<number>(data.length - 1);
  const [positionsState, setPositionsState] = useState<PositionsObject>(taskListToPositionsObject(list));
  const updatePositionState = (list: PositionsObject) =>
    setPositionsState(list);
  const updateUpperBound = (newUpperBound: number) => setUpperBound(newUpperBound);

  const positions = useSharedValue<ListObject>(taskListToObject(data));
  const opacity = useSharedValue(1);
  const completedListOpacity = useSharedValue(1);

  const listContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value]);

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
    const height = interpolate(
      opacity.value,
      [0, 1],
      [30, data.length * TaskHeight + 30]
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

  // useEffect(() => {
  //   console.log('state',positionsState)
  // }, [data])

  // useEffect(() => {
  //   console.log(positionsState);
  // }, [positionsState])

  // useEffect(() => {
  //   console.log(upperBound);
  // }, [upperBound])

  return (
    <Animated.View
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
            minHeight: (data?.length * TaskHeight) | 0,
          },
        ]}
      >
        {data?.map((item, index) => {
          return (
            <MovableItem
              key={index + item.task}
              positions={positions}
              positionsState={positionsState}
              id={item.id}
              itemHeight={TaskHeight}
              component={Task}
              componentProps={{ ...item, completeTask }}
              updatePositionsState={updatePositionState}
              upperBound={upperBound}
              updateUpperBound={updateUpperBound}
            />
          );
        })}
      </Animated.View>
      {/* {completedTasks.length > 0 && (
        <CompletedMarker
          onPress={toggleCompletedListVisible}
          opacity={completedListOpacity}
        />
      )} */}
    </Animated.View>
  );
};

export default Section;
