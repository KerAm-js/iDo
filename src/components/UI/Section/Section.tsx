import React, { FC, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { text14, text14LineHeight, textGrey, textSemiBold, title22 } from "../../../styles/global/texts";
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
import {
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
  TODAY,
} from "../../../utils/constants/periods";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTaskAction,
  deleteTaskAction,
} from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { sortTasks } from "../../../utils/section/sections";
import { taskListToPositionsObject } from "../../../utils/section/positionsState";

const TaskMargin = 10;
const TaskHeight = 60 + TaskMargin;

const emptyListHeight = 220;
const baseHeight = 25;

const Section: FC<SectionProps> = ({ title, list }) => {
  const dispatch: AppDispatch = useDispatch();
  const { taskToEdit } = useSelector(taskSelector);
  const positionsState = useSharedValue(taskListToPositionsObject(list));
  const [sortedTasks, completedTasks] = sortTasks(list, positionsState.value);
  const [isDeleting, setIsDeleting] = useState(false);
  // const [sectionOpened, setSectionOpened] = useState(true);
  const [completedListOpened, setCompletedListOpened] = useState(true);

  const positions = useSharedValue<ListObject>(taskListToObject(sortedTasks));

  // const updatePositionState = (list: GesturePositionsType) => {
  //   dispatch(updateGesturePositionsAction(list))
  // }

  const upperBound = sortedTasks.length - 1 - completedTasks.length;
  const initialHeight =
    sortedTasks.length > 0
      ? sortedTasks.length * TaskHeight +
        (completedTasks.length > 0 ? 36 : 0) +
        baseHeight + 30
      : emptyListHeight;

  const opacity = useSharedValue(1);
  const height = useSharedValue(
    opacity.value === 1 ? initialHeight : baseHeight
  );
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

  const listContainerOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity.value]);

  const counterStyle = useAnimatedStyle(() => {
    const counterOpacity = interpolate(opacity.value, [0, 1], [1, 0]);
    return {
      opacity: counterOpacity
    }
  })

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
      opacity.value === 0
        ? completedListOpacity.value === 1
          ? initialHeight
          : initialHeight - completedTasks.length * TaskHeight
        : baseHeight,
      {
        duration: 300,
      }
    );
    opacity.value = withTiming(opacity.value === 0 ? 1 : 0, { duration: 250 });
  };

  const toggleCompletedListVisible = () => {
    height.value = withTiming(
      completedListOpacity.value === 0
        ? initialHeight
        : initialHeight - completedTasks.length * TaskHeight,
      { duration: 200 },
    );
    completedListOpacity.value = withTiming(
      completedListOpacity.value === 0 ? 1 : 0,
      {
        duration: 200,
      }
    );
  };

  const updateCompletedMarkerTop = () => {
    if (completedTasks.length === 0) {
      return upperBound * TaskHeight;
    } else {
      return (upperBound + 1) * TaskHeight;
    }
  };

  const completeTask = (id: string) => {
    dispatch(completeTaskAction(id));
  };

  const deleteTask = (id: string) => {
    setIsDeleting(true);
    dispatch(deleteTaskAction(id));
  };

  const runEffectAnimations = () => {
    emptyListImageOpacity.value =
      sortedTasks.length === 0
        ? withDelay(200, withTiming(1, { duration: 300 }))
        : 0;
    completedMarkerOpacity.value = withTiming(
      completedTasks.length > 0 ? 1 : 0,
      { duration: 200 }
    );
    completedMarkerTop.value = withDelay(
      1,
      withTiming(updateCompletedMarkerTop(), { duration: 300 })
    );
    if (opacity.value === 1) {
      height.value = withDelay(
        1,
        withTiming(
          completedListOpacity.value === 1
            ? initialHeight
            : initialHeight - completedTasks.length * TaskHeight,
          { duration: 300 }
        )
      );
    }
  };

  useEffect(() => {
    positions.value = taskListToObject(sortedTasks);
    runEffectAnimations();
  }, [list]);

  useEffect(() => {
    if (sortedTasks.length > 0 && !isDeleting) {
      emptyListImageOpacity.value = 0;
    }
    if (isDeleting) {
      setIsDeleting(false);
    }
    positionsState.value = taskListToPositionsObject(
      list,
      positionsState.value
    );
  }, [list.length]);

  useEffect(() => {
    if (taskToEdit === undefined) {
      positions.value = taskListToObject(sortedTasks);
    }
  }, [taskToEdit]);

  let clearListMessage = `Что планируете ${languageTexts["ru"].periods[
    title
  ].toLowerCase()}?`;
  let titleString: string = title;

  if (title === FOR_TODAY) {
    clearListMessage = `Что делаем ${languageTexts["ru"].periods[
      TODAY
    ].toLowerCase()}?`;
  } else if (title === FOR_TOMORROW) {
    clearListMessage = `Какие планы ${languageTexts["ru"].periods[
      title
    ].toLowerCase()}?`;
  } else if (title === FOR_WEEK) {
    const currDay = new Date().getDay();
    titleString = currDay === 0 || currDay === 6 ? "nextWeek" : title;
  }

  return (
    <Animated.View style={[sectionStyles.container, containerStyle]}>
      <View style={sectionStyles.headerContainer}>
        <View style={sectionStyles.headerTextContainer}>
          <Text style={[title22]}>
            {languageTexts["ru"].periods[titleString]}
          </Text>
          <Animated.View style={[counterStyle]}>
            <Text style={[text14, textGrey, text14LineHeight, textSemiBold, sectionStyles.counter]}>
              {`${completedTasks.length}/${sortedTasks.length}`}
            </Text>
          </Animated.View>
        </View>
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
          listContainerOpacityStyle,
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
          sortedTasks.map((item) => {
            return (
              <MovableItem
                key={item.id}
                index={sortedTasks.findIndex(task => task.id === item.id)}
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
                upperBound={upperBound}
                opacity={item.isCompleted ? completedListOpacity : opacity}
              />
            );
          })
        ) : (
          <Animated.View style={[emptyListImageContainerStyle]}>
            <ClearList title={clearListMessage} />
          </Animated.View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Section;
