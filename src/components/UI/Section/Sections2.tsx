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
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import {
  taskListToObject,
  taskListToPositionsObject,
} from "../../../utils/taskUI";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { GesturePositionsType } from "../../../types/global/GesturePositions";
import { languageTexts } from "../../../utils/languageTexts";
import ClearList from "../ClearList/ClearList";
import { FOR_MONTH, FOR_WEEK } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import {
  changeGesturePositionsAction,
  completeTaskAction,
} from "../../../redux/actions/taskActions";
import { AppDispatch } from "../../../redux/types/appDispatch";

const TaskMargin = 9;
const TaskHeight = 64 + TaskMargin;

const Section: FC<SectionProps> = ({ title, list }) => {
  const dispatch: AppDispatch = useDispatch();
  const { gesturePositions } = useSelector(taskSelector);

  const [isListHidden, setIsListHidden] = useState<boolean>(false);
  const [isCompletedListHidden, setIsCompletedListHidden] =
    useState<boolean>(false);
  const positions = useSharedValue<ListObject>(taskListToObject(list));
  const [upperBound, setUpperBound] = useState<number>(list.length - 1);
  const updatePositionState = (list: GesturePositionsType) =>
    dispatch(changeGesturePositionsAction(list));
  const updateUpperBound = (newUpperBound: number) =>
    setUpperBound(newUpperBound);
  const opacity = useSharedValue(1);
  const completedListOpacity = useSharedValue(1);
  const completedMarkerTop = useSharedValue(upperBound * TaskHeight);
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
    const listheight =
      list.length > 0
        ? interpolate(
            completedListOpacity.value,
            [0, 1],
            [
              list.filter((task) => !task.isCompleted).length * TaskHeight,
              list.length * TaskHeight,
            ]
          )
        : interpolate(completedListOpacity.value, [0, 1], [0, 220]);
    const baseHeight = interpolate(
      completedMarkerOpacity.value,
      [0, 1],
      [listheight, listheight + 36]
    );
    const height = interpolate(opacity.value, [0, 1], [30, baseHeight + 30]);
    return {
      height,
      overflow: isListHidden ? "hidden" : "visible",
    };
  }, [opacity.value, list, completedListOpacity.value]);

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
    dispatch(completeTaskAction(id));
  };

  useEffect(() => {
    if (upperBound === list.length - 1) {
      completedMarkerOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [upperBound]);

  useEffect(() => {
    positions.value = taskListToObject(list);
    updatePositionState(taskListToPositionsObject(list));
  }, [list]);

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
        <CompletedMarker
          top={completedMarkerTop}
          onPress={toggleCompletedListVisible}
          completedListOpacity={completedListOpacity}
          opacity={completedMarkerOpacity}
        />
        {list?.length > 0 ? (
          list.map((item, index) => {
            return (
              <MovableItem
                key={item.task + index}
                positions={positions}
                positionsState={gesturePositions}
                markerOpacity={completedMarkerOpacity}
                id={item.id}
                itemHeight={TaskHeight}
                component={Task}
                componentProps={{ ...item, completeTask, timeType: title }}
                updatePositionsState={updatePositionState}
                upperBound={upperBound}
                upperBoundMax={list.length - 1}
                completedMarkerTop={completedMarkerTop}
                updateUpperBound={updateUpperBound}
                opacity={item.isCompleted ? completedListOpacity : opacity}
              />
            );
          })
        ) : title === FOR_WEEK || title === FOR_MONTH ? (
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
    </Animated.View>
  );
};

export default Section;
