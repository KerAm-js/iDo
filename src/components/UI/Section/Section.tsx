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
  withDelay
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import {
  taskListToObject,
  taskListToPositionsObject,
  updateListObjectAfterTaskAdding,
  updateListObjectAfterTaskDeleting,
  updatePositionsObjectAfterTaskAdding,
  updatePositionsObjectAfterTaskDeleting,
} from "../../../utils/taskUI";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { GesturePositionsType } from "../../../types/global/GesturePositions";
import { languageTexts } from "../../../utils/languageTexts";
import ClearList from "../ClearList/ClearList";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch } from "react-redux";
import {
  completeTaskAction,
  deleteTaskAction,
} from "../../../redux/actions/taskActions";

const TaskMargin = 10;
const TaskHeight = 60 + TaskMargin;
const emptyListHeight = 220;

const Section: FC<SectionProps> = ({ title, list }) => {
  const completedTasks = list.filter((task) => task.isCompleted);
  const baseHeight = 30;
  const listHeight =
    list.length > 0
      ? list.length * TaskHeight +
        (completedTasks.length > 0 ? 36 : 0) +
        baseHeight
      : emptyListHeight;

  const dispatch: AppDispatch = useDispatch();
  const [isListHidden, setIsListHidden] = useState<boolean>(false);
  const [isCompletedListHidden, setIsCompletedListHidden] =
    useState<boolean>(false);

  const positions = useSharedValue<ListObject>(taskListToObject(list));
  const [upperBound, setUpperBound] = useState<number>(
    list.length - 1 - completedTasks.length
  );
  const [positionsState, setPositionsState] = useState<GesturePositionsType>(
    taskListToPositionsObject(list)
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const updatePositionState = (list: GesturePositionsType) =>
    setPositionsState(list);
  const updateUpperBound = (newUpperBound: number) =>
    setUpperBound(newUpperBound);

  const opacity = useSharedValue(1);
  const height = useSharedValue(listHeight);
  const emptyListImageOpacity = useSharedValue(list.length === 0 ? 1 : 0);
  const completedListOpacity = useSharedValue(1);
  const completedMarkerTop = useSharedValue(
    upperBound === list.length - 1
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
  }, [opacity.value, list.length, completedListOpacity.value]);

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

  const emptyListImageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: emptyListImageOpacity.value
    }
  })

  const toggleListVisible = () => {
    setIsListHidden((value) => !value);
    height.value = withTiming(isListHidden ? listHeight : 30, {
      duration: 300,
    });
    opacity.value = withTiming(isListHidden ? 1 : 0, { duration: 300 });
  };

  const toggleCompletedListVisible = () => {
    setIsCompletedListHidden((value) => !value);
    Animated.block([]);
    height.value = withTiming(
      isCompletedListHidden
        ? listHeight
        : listHeight - completedTasks.length * TaskHeight,
      { duration: 300 }
    );
    completedListOpacity.value = withTiming(isCompletedListHidden ? 1 : 0, {
      duration: 200,
    });
  };

  const completeTask = (id: string) => {
    dispatch(completeTaskAction(list, id));
  };

  const deleteTask = (id: string) => {
    setIsDeleting(true);
    dispatch(deleteTaskAction(id));
    positions.value = updateListObjectAfterTaskDeleting(positions.value, id);
    setUpperBound(upperBound - 1);
    setPositionsState(
      updatePositionsObjectAfterTaskDeleting(positionsState, id)
    );
    height.value = withTiming(
      list.length === 1 ? emptyListHeight : height.value - TaskHeight,
      { duration: 300 }
    );
    if (list.length === 1) {
      emptyListImageOpacity.value = withDelay(200, withTiming(1, {duration: 300}));
    }
    completedMarkerTop.value = withTiming(
      completedMarkerTop.value - TaskHeight,
      { duration: 300 }
    );
  };

  useEffect(() => {
    if (list.length > 0 && !isDeleting && !positions.value[list[0].id]) {
      positions.value = updateListObjectAfterTaskAdding(
        positions.value,
        list[0]
      );
      setUpperBound(upperBound + 1);
      setPositionsState(
        updatePositionsObjectAfterTaskAdding(positionsState, list[0])
      );
      height.value = withTiming(
        list.length === 1 ? listHeight : height.value + TaskHeight,
        { duration: 300 }
      );
      emptyListImageOpacity.value = 0;
      completedMarkerTop.value = withTiming(
        completedMarkerTop.value + TaskHeight,
        { duration: 300 }
      );
    }
    if (isDeleting) {
      setIsDeleting(false);
    }
  }, [list.length]);

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
            minHeight: (list?.length * TaskHeight) | 0,
          },
        ]}
      >
        {list.length > 0 && (
          <CompletedMarker
            top={completedMarkerTop}
            onPress={toggleCompletedListVisible}
            completedListOpacity={completedListOpacity}
            opacity={completedMarkerOpacity}
          />
        )}
        {list?.length > 0 ? (
          list.map((item, index) => {
            return (
              <MovableItem
                key={item.id + index}
                positions={positions}
                positionsState={positionsState}
                markerOpacity={completedMarkerOpacity}
                id={item.id}
                sectionHeight={height}
                itemHeight={TaskHeight}
                component={Task}
                componentProps={{
                  ...item,
                  completeTask,
                  deleteTask,
                  timeType: title,
                }}
                updatePositionsState={updatePositionState}
                upperBound={upperBound}
                upperBoundMax={list.length - 1}
                completedMarkerTop={completedMarkerTop}
                updateUpperBound={updateUpperBound}
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
