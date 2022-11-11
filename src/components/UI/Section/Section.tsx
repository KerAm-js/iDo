import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { title22 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { SectionProps } from "./types";
import IconButton from "../buttons/IconButton/IconButton";
import Task from "../Task/Task";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import { taskListToObject } from "../../../utils/section/positionsObject";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { GesturePositionsType } from "../../../types/global/GesturePositions";
import { languageTexts } from "../../../utils/languageTexts";
import ClearList from "../ClearList/ClearList";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTaskAction,
  deleteTaskAction,
} from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { sortTasks } from "../../../utils/section/others";
import { taskListToPositionsObject } from "../../../utils/section/positionsState";

const TaskMargin = 10;
const TaskHeight = 60 + TaskMargin;

const emptyListHeight = 220;
const baseHeight = 30;

const Section: FC<SectionProps> = ({ title, list }) => {
  const dispatch: AppDispatch = useDispatch();
  const { taskToEdit } = useSelector(taskSelector);
  const [sortedTasks, completedTasks] = sortTasks(list);
  const [isDeleting, setIsDeleting] = useState(false);

  const positions = useSharedValue<ListObject>(taskListToObject(sortedTasks));
  const [positionsState, setPositionsState] = useState<GesturePositionsType>(
    taskListToPositionsObject(sortedTasks)
  );

  const updatePositionState = (list: GesturePositionsType) =>
    setPositionsState(list);

  const upperBound = sortedTasks.length - 1 - completedTasks.length;
  const initialHeight =
    sortedTasks.length > 0
      ? sortedTasks.length * TaskHeight +
        (completedTasks.length > 0 ? 36 : 0) +
        baseHeight
      : emptyListHeight;

  const opacity = useSharedValue(1);
  const height = useSharedValue(initialHeight);
  const emptyListImageOpacity = useSharedValue(
    sortedTasks.length === 0 ? 1 : 0
  );
  const completedListOpacity = useSharedValue(1);
  const completedMarkerTop = useSharedValue(
    upperBound === sortedTasks.length - 1
      ? upperBound * TaskHeight
      : (upperBound + 1) * TaskHeight
  );
  const completedMarkerOpacity = useSharedValue(
    completedTasks.length > 0 ? 1 : 0
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: opacity.value === 1 ? "visible" : "hidden",
    };
  }, [opacity.value, height.value]);

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

  const emptyListImageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: emptyListImageOpacity.value,
    };
  });

  const toggleListVisible = () => {
    height.value = withTiming(
      opacity.value === 0 ? initialHeight : baseHeight,
      {
        duration: 300,
      }
    );
    opacity.value = withTiming(opacity.value === 0 ? 1 : 0, { duration: 300 });
  };

  const toggleCompletedListVisible = () => {
    Animated.block([]);
    height.value = withTiming(
      completedListOpacity.value === 0
        ? initialHeight
        : initialHeight - completedTasks.length * TaskHeight,
      { duration: 300 }
    );
    completedListOpacity.value = withTiming(completedListOpacity.value === 0 ? 1 : 0, {
      duration: 200,
    });
  };

  const updateCompletedMarkerTop = () => {
    if (completedTasks.length === 0) {
      return upperBound * TaskHeight;
    } else {
      return (upperBound + 1) * TaskHeight;
    }
  }

  const completeTask = (id: string) => {
    dispatch(completeTaskAction(id));
  };

  const deleteTask = (id: string) => {
    setIsDeleting(true);
    dispatch(deleteTaskAction(id));
  };

  useEffect(() => {
    positions.value = taskListToObject(sortedTasks);
    emptyListImageOpacity.value =
      sortedTasks.length === 0
        ? withDelay(200, withTiming(1, { duration: 300 }))
        : 0;
    height.value = withTiming(initialHeight, { duration: 300 });
    completedMarkerOpacity.value = withTiming(
      completedTasks.length > 0 ? 1 : 0,
      { duration: 200 }
    );
    completedMarkerTop.value = withTiming(updateCompletedMarkerTop(), {duration: 300});
  }, [list]);

  useEffect(() => {
    if (sortedTasks.length > 0 && !isDeleting) {
      setPositionsState(taskListToPositionsObject(sortedTasks));
      emptyListImageOpacity.value = 0;
    }
    if (isDeleting) {
      setIsDeleting(false);
    }
  }, [list.length]);

  useEffect(() => {
    if (taskToEdit === undefined) {
      positions.value = taskListToObject(sortedTasks);
    }
  }, [taskToEdit]);

  return (
    <Animated.View style={[sectionStyles.container, containerStyle]}>
      <View style={sectionStyles.headerContainer}>
        <Text style={[title22]}>{languageTexts["ru"].periods[title]}</Text>
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
            minHeight: (sortedTasks?.length * TaskHeight) | 0,
          },
        ]}
      >
        {sortedTasks.length > 0 && (
          <CompletedMarker
            top={completedMarkerTop}
            onPress={toggleCompletedListVisible}
            completedListOpacity={completedListOpacity}
            opacity={completedMarkerOpacity}
          />
        )}
        {sortedTasks?.length > 0 ? (
          sortedTasks.map((item, index) => {
            return (
              <MovableItem
                key={item.id + index}
                index={index}
                positions={positions}
                positionsState={positionsState}
                id={item.id}
                itemHeight={TaskHeight}
                component={Task}
                componentProps={{
                  ...item,
                  completeTask,
                  deleteTask,
                  sectionType: title,
                }}
                updatePositionsState={updatePositionState}
                upperBound={upperBound}
                opacity={item.isCompleted ? completedListOpacity : opacity}
              />
            );
          })
        ) : (
          <Animated.View style={[emptyListImageContainerStyle]}>
            {title === FOR_WEEK || title === FOR_MONTH ? (
              <ClearList
                title={`${languageTexts["ru"].periods[title]} больше задач нет`}
              />
            ) : (
              <ClearList
                title={`Добавьте задачи ${languageTexts["ru"].periods[
                  title
                ].toLowerCase()}`}
              />
            )}
          </Animated.View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Section;
 