import React, { FC, useCallback, useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { textGrey, textSemiBold, title22 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { SectionProps } from "./types";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import CompletedMarker from "../Task/CompletedMarker";
import { ListObject } from "../../../types/global/ListObject";
import { languageTexts } from "../../../utils/languageTexts";
import ClearList from "../ClearList/ClearList";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTaskAction,
  deleteTaskAction,
  updatePositionsAction,
} from "../../../redux/actions/taskActions";
import {
  getSectionTitle,
  sortTasksAndUpdatePositions,
} from "../../../utils/section/sections";
import { SvgXml } from "react-native-svg";
import { textColors } from "../../../styles/global/colors";
import { TaskType } from "../../../redux/types/task";
import { saveSectionVisibilityToAS } from "../../../backend/asyncStorage/section";
import { CALENDAR_DAY } from "../../../utils/constants/periods";
import { taskListToObject } from "../../../utils/section/positionsObject";
import LangText from "../LangText/LangText";
import { isTaskAddingAnimatedSelector } from "../../../redux/selectors/taskSelector";
import { setMessageAction } from "../../../redux/actions/popupsActions";

export const TaskMargin = 8;
export const TaskHeight = 58 + TaskMargin;

const emptyListHeight = 220;
const baseHeight = 46;

const Section: FC<SectionProps> = ({
  title,
  list,
  initPositions,
  visibilities,
  disableAnimationsTrigger,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const isTaskAddingAnimated = useSelector(isTaskAddingAnimatedSelector);
  const [sortedTasks, completedTasksLength] = sortTasksAndUpdatePositions(
    list,
    initPositions
  );
  const positions = useSharedValue<ListObject>(taskListToObject(sortedTasks));
  const areAnimationsDisabled = useRef(false);
  const upperBound = useRef<number>(0);
  upperBound.current = sortedTasks.length - 1 - completedTasksLength;
  const sectionOpacity = useSharedValue(1);

  const opacity = useSharedValue(
    typeof visibilities?.list === "number" ? visibilities?.list : 1
  );

  const initialHeight =
    sortedTasks.length > 0
      ? sortedTasks.length * TaskHeight +
        (completedTasksLength > 0 ? 28 : 0) +
        baseHeight +
        10
      : emptyListHeight;

  const completedListOpacity = useSharedValue(
    typeof visibilities?.completedList === "number"
      ? visibilities.completedList
      : 1
  );
  const height = useSharedValue(
    opacity.value === 1
      ? initialHeight -
          (completedListOpacity.value === 0
            ? completedTasksLength * TaskHeight
            : 0)
      : baseHeight
  );
  const emptyListImageOpacity = useSharedValue(
    sortedTasks.length === 0 ? 1 : 0
  );
  const completedMarkerTop = useSharedValue(
    upperBound.current === sortedTasks.length - 1
      ? upperBound.current * TaskHeight
      : (upperBound.current + 1) * TaskHeight
  );
  const completedMarkerOpacity = useSharedValue(
    completedTasksLength > 0 ? 1 : 0
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: opacity.value === 1 ? "visible" : "hidden",
      opacity: sectionOpacity.value,
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
    if (title !== CALENDAR_DAY && visibilities) {
      saveSectionVisibilityToAS(title, {
        list: opacity.value === 0 ? 1 : 0,
        completedList: completedListOpacity.value,
      });
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
    }
    emptyListImageOpacity.value = withTiming(
      opacity.value !== 1 && sortedTasks.length === 0 ? 1 : 0,
      { duration: 300 }
    );
    opacity.value = withTiming(opacity.value === 0 ? 1 : 0, {
      duration: 250,
    });
  };

  const toggleCompletedListVisible = () => {
    if (title !== CALENDAR_DAY && visibilities) {
      saveSectionVisibilityToAS(title, {
        list: opacity.value,
        completedList: completedListOpacity.value === 0 ? 1 : 0,
      });
    }
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

  const updateCompletedMarkerTop = (completedLength: number, bound: number) => {
    if (completedLength === 0) {
      return bound * TaskHeight;
    } else {
      return (bound + 1) * TaskHeight;
    }
  };

  const completeTask = useCallback(
    (task: TaskType) => {
      dispatch(completeTaskAction(task));
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (task: TaskType) => {
      dispatch(deleteTaskAction(task));
      if (task.isRegular) {
        dispatch(
          setMessageAction(languageTexts.notifications.regularTaskRemoved)
        );
      }
    },
    [dispatch]
  );

  const updatePositions = (positions: ListObject) => {
    dispatch(updatePositionsAction(positions));
  };

  const runEffectAnimations = (areAnimationsDisabled?: boolean) => {
    if (areAnimationsDisabled && title === CALENDAR_DAY) {
      sectionOpacity.value = 0;
      emptyListImageOpacity.value =
        sortedTasks.length === 0 ? withTiming(1) : 0;
      completedMarkerOpacity.value = withTiming(
        completedTasksLength > 0 ? 1 : 0,
        { duration: 100 }
      );
      completedMarkerTop.value = withTiming(
        updateCompletedMarkerTop(completedTasksLength, upperBound.current),
        {
          duration: 100,
        }
      );
      height.value = withTiming(
        completedListOpacity.value === 1
          ? initialHeight
          : initialHeight - completedTasksLength * TaskHeight,
        { duration: 100 }
      );
      sectionOpacity.value = withTiming(1, { duration: 500 });
      return;
    }
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
      withTiming(
        updateCompletedMarkerTop(completedTasksLength, upperBound.current),
        {
          duration: 300,
        }
      )
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
    areAnimationsDisabled.current = true;
  }, [disableAnimationsTrigger]);

  useEffect(() => {
    positions.value = taskListToObject(sortedTasks);
    runEffectAnimations(areAnimationsDisabled.current);
    areAnimationsDisabled.current = false;
  }, [list]);

  useEffect(() => {
    if (sortedTasks.length > 0) {
      emptyListImageOpacity.value = 0;
    }
  }, [list.length]);

  const titleString = languageTexts.periods[getSectionTitle(title)];
  const clearListMessage = languageTexts.sectionEmptyList[title];

  return (
    <Animated.View style={[sectionStyles.container, containerStyle]}>
      {title !== CALENDAR_DAY && (
        <Pressable
          onPress={toggleListVisible}
          style={sectionStyles.headerContainer}
        >
          <View style={sectionStyles.headerTextContainer}>
            <LangText style={title22} title={titleString} />
            {list.length > 0 && (
              <Text style={[textGrey, textSemiBold, sectionStyles.counter]}>
                {`${completedTasksLength}/${sortedTasks.length}`}
              </Text>
            )}
          </View>
          <Animated.View style={[arrowStyle, sectionStyles.arrowButton]}>
            <SvgXml xml={arrowBottom(textColors.grey)} width={16} height={16} />
          </Animated.View>
        </Pressable>
      )}
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
                isInsertingAnimated={isTaskAddingAnimated}
                index={sortedTasks.findIndex((task) => task.id === item.id)}
                positions={positions}
                updatePositions={updatePositions}
                id={item.id}
                itemHeight={TaskHeight}
                taskObject={item}
                completeTask={completeTask}
                deleteTask={deleteTask}
                sectionTitle={title}
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

const shouldSectionUpdate = (prev: SectionProps, curr: SectionProps) => {
  const result =
    prev.list.length === curr.list.length &&
    JSON.stringify(prev.list) === JSON.stringify(curr.list) &&
    JSON.stringify(prev.initPositions) === JSON.stringify(curr.initPositions);
  return result;
};

export default React.memo(Section, shouldSectionUpdate);
