import React, { FC, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { textGrey, textSemiBold, title22 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { SectionProps } from "./types";
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
import { useDispatch } from "react-redux";
import {
  completeTaskAction,
  deleteTaskAction,
} from "../../../redux/actions/taskActions";
import { getSectionListEmptyMessage, getSectionTitle, sortTasks } from "../../../utils/section/sections";
import { SvgXml } from "react-native-svg";

const TaskMargin = 10;
const TaskHeight = 62 + TaskMargin;

const emptyListHeight = 220;
const baseHeight = 44;

const Section: FC<SectionProps> = ({ title, list }) => {
  const dispatch: AppDispatch = useDispatch();
  const gesturePositions = useSharedValue<GesturePositionsType>({});
  const [sortedTasks, completedTasksLength] = sortTasks(
    list,
    gesturePositions,
    title !== FOR_TODAY && title !== FOR_TOMORROW,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const positions = useSharedValue<ListObject>(taskListToObject(sortedTasks));

  const upperBound = sortedTasks.length - 1 - completedTasksLength;
  const initialHeight =
    sortedTasks.length > 0
      ? sortedTasks.length * TaskHeight +
        (completedTasksLength > 0 ? 36 : 0) +
        baseHeight +
        30
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
    completedTasksLength > 0 ? 1 : 0
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
          : initialHeight - completedTasksLength * TaskHeight
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
        : initialHeight - completedTasksLength * TaskHeight,
      { duration: 200 }
    );
    completedListOpacity.value = withTiming(
      completedListOpacity.value === 0 ? 1 : 0,
      {
        duration: 200,
      }
    );
  };

  const updateCompletedMarkerTop = () => {
    if (completedTasksLength === 0) {
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
      completedTasksLength > 0 ? 1 : 0,
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
            : initialHeight - completedTasksLength * TaskHeight,
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
  }, [list.length]);

  const titleString = getSectionTitle(title);
  const clearListMessage = getSectionListEmptyMessage(title);

  return (
    <Animated.View style={[sectionStyles.container, containerStyle]}>
      <Pressable
        onPress={toggleListVisible}
        style={sectionStyles.headerContainer}
      >
        <View style={sectionStyles.headerTextContainer}>
          <Text style={[title22]}>
            {languageTexts["ru"].periods[titleString]}
          </Text>
          {list.length > 0 && (
            <Text style={[textGrey, textSemiBold, sectionStyles.counter]}>
              {`${completedTasksLength}/${sortedTasks.length}`}
            </Text>
          )}
        </View>
        <Animated.View style={[arrowStyle, sectionStyles.arrowButton]}>
          <SvgXml xml={arrowBottomGrey} width={16} height={16} />
        </Animated.View>
      </Pressable>
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
                index={sortedTasks.findIndex((task) => task.id === item.id)}
                positions={positions}
                gesturePositions={gesturePositions}
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
