import React, { FC, useRef, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SlideInRight,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { shadowStyle } from "../../../styles/global/shadow";
import {
  getInsideLayoutTranslationY,
  getNewTaskPosition,
  moveTask,
} from "../../../utils/section/positionsObject";
import { movableItemStyles } from "./style";
import { ContextType, MovableItemProps } from "./types";
import { trash } from "../../../../assets/icons/trash";
import { textColors } from "../../../styles/global/colors";
import { TaskType } from "../../../redux/types/task";
import Task from "../Task/Task";
import { CALENDAR_DAY } from "../../../utils/constants/periods";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { useDispatch } from "react-redux";
import { setTaskToEditAction } from "../../../redux/actions/popupsActions";

const MovableItem: FC<MovableItemProps> = ({
  id,
  index,
  positions,
  updatePositions,
  isInsertingAnimated,
  opacity,
  itemHeight,
  sectionTitle,
  completeTask,
  deleteTask,
  taskObject,
  upperBound,
}) => {
  const [isDragged, setIsDragged] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const translateThreshold = SCREEN_WIDTH * -0.35;
  const top = positions.value[id]
    ? itemHeight * positions?.value[id]?.position +
      (positions?.value[id]?.isCompleted ? 28 : 0)
    : index * itemHeight;
  const translateY = useSharedValue(top);
  const translateX = useSharedValue(0);
  const trashIconOpacity = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);
  const timeOut: { current: ReturnType<typeof setTimeout> | null } =
    useRef(null);

  const containerStyleR = useAnimatedStyle(() => {
    return {
      top: translateY.value,
      opacity: opacity.value,
      zIndex: zIndex.value,
      transform: [{ scale: scale.value }],
    };
  }, [positions, translateY, shadowOpacity, opacity]);

  const taskStyleR = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      ...shadowStyle,
      shadowOpacity: shadowOpacity.value,
    };
  }, [translateX]);

  const trashIconStyleR = useAnimatedStyle(() => {
    return {
      opacity: trashIconOpacity.value,
    };
  }, [translateX]);

  useAnimatedReaction(
    () => positions?.value[id],
    (current, previous) => {
      const isCompletedChanged = current?.isCompleted !== previous?.isCompleted;
      const isPositionChanged = current?.position !== previous?.position;
      const isCompleted = positions?.value[id]?.isCompleted;
      if (isPositionChanged || isCompletedChanged) {
        if (!isDragged) {
          const newTop = isCompleted
            ? 28 + current?.position * itemHeight
            : current?.position * itemHeight;
          if (isCompletedChanged) {
            zIndex.value = -10;
            if (previous && current.position !== previous?.position) {
              zIndex.value = -110;
              const scaling =
                Math.abs(current.position - previous?.position) / 100;
              scale.value = withTiming(
                0.96 - scaling,
                { duration: 80 },
                (isFinished) => {
                  if (isFinished) {
                    scale.value = withTiming(1, { duration: 220 });
                  }
                }
              );
            }
          }
          translateY.value = withTiming(
            newTop,
            {
              duration: 300,
            },
            (isFinished) => {
              if (isFinished) {
                zIndex.value = 0;
                if (isCompletedChanged) {
                  scale.value = withTiming(1, { duration: 150 });
                }
              }
            }
          );
        }
      }
    }
  );

  const onStartGestureEvent = (
    _: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    context: ContextType
  ) => {
    "worklet";
    context.startPositionsObject = positions.value;
    context.startPosition = positions.value[id].position;
  };

  const onActiveGestureEvent = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    context: ContextType
  ) => {
    "worklet";
    const { translationY } = event;
    if (isDragged) {
      const newPosition = getNewTaskPosition(
        translationY + top,
        0,
        upperBound.current,
        itemHeight
      );

      translateY.value = getInsideLayoutTranslationY(
        translationY + top,
        0,
        upperBound.current,
        itemHeight
      );

      if (newPosition !== positions?.value[id]?.position) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        const [newPositionsObject, isTaskMovingDisabled] = moveTask(
          positions?.value,
          positions?.value[id]?.position,
          newPosition
        );
        positions.value = newPositionsObject;
        context.isMovingDisabled = isTaskMovingDisabled;
      }
    }
  };

  const onActiveDeleteGestureEvent = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    context: ContextType
  ) => {
    "worklet";
    const { translationX } = event;

    if (isDragged) {
      onActiveGestureEvent(event, context);
      return;
    }

    translateX.value = translationX;
    if (translationX < translateThreshold && trashIconOpacity.value === 0) {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    }
    trashIconOpacity.value = withTiming(
      translationX < translateThreshold ? 1 : 0,
      { duration: 150 }
    );
  };

  const onFinishGestureEvent = (
    _: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    context: ContextType
  ) => {
    "worklet";
    if (isDragged) {
      const newPosition = positions?.value[id]?.position;
      let newTranslateY = newPosition * itemHeight;
      const onAnimationEnd = (isFinished: boolean | undefined) => {
        if (isFinished) {
          zIndex.value = 0;
          runOnJS(setIsDragged)(false);
          runOnJS(updatePositions)(positions.value);
        }
      };
      if (context.isMovingDisabled) {
        positions.value = context.startPositionsObject;
        newTranslateY = context.startPosition * itemHeight;
      }
      translateY.value = withTiming(newTranslateY, {
        duration: 300,
      });
      scale.value = withTiming(1);
      shadowOpacity.value = withTiming(0, undefined, onAnimationEnd);
    }
  };

  const onFinishDeleteGestureEvent = (
    _: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    context: ContextType
  ) => {
    "worklet";
    if (isDragged) {
      onFinishGestureEvent(_, context);
    }
    if (translateX.value < translateThreshold) {
      translateX.value = withSpring(-SCREEN_WIDTH);
      trashIconOpacity.value = withTiming(
        0,
        { duration: 250 },
        (isFinished) => {
          if (isFinished && deleteTask) {
            runOnJS(deleteTask)(taskObject);
          }
        }
      );
    } else {
      trashIconOpacity.value = withTiming(0, { duration: 150 });
      translateX.value = withSpring(0);
    }
  };

  const moveGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: onStartGestureEvent,
    onActive: onActiveGestureEvent,
    onFinish: onFinishGestureEvent,
  });

  const deleteGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: onStartGestureEvent,
    onActive: onActiveDeleteGestureEvent,
    onFinish: onFinishDeleteGestureEvent,
  });

  const onLongPress = () => {
    if (!isDragged && !taskObject.isCompleted) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsDragged(true);
      zIndex.value = 10 * upperBound.current;
      scale.value = withTiming(1.04);
      shadowOpacity.value = withTiming(0.8);
    }
  };

  const clearCompletingTimeout = () => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
  };

  const completeTaskHandler = (task: TaskType) => {
    if (taskObject.isCompleted || timeOut.current) {
      if (timeOut.current) {
        clearCompletingTimeout();
        return;
      }
      completeTask(task);
    } else {
      timeOut.current = setTimeout(() => {
        clearCompletingTimeout();
        completeTask(task);
      }, 500);
    }
  };

  const openEditTaskPopup = () =>
    dispatch(setTaskToEditAction({ ...taskObject }));

  return (
    <Animated.View
      entering={
        isInsertingAnimated && sectionTitle !== CALENDAR_DAY
          ? SlideInRight.springify().damping(12).delay(100)
          : undefined
      }
      style={[movableItemStyles.container, shadowStyle, containerStyleR]}
    >
      <View style={movableItemStyles.panGestureContainer}>
        <Pressable
          onPress={openEditTaskPopup}
          onLongPress={onLongPress}
          style={movableItemStyles.pressable}
        >
          <PanGestureHandler
            activateAfterLongPress={500}
            onGestureEvent={moveGestureEventHandler}
            onActivated={onLongPress}
          >
            <Animated.View
              style={movableItemStyles.panGestureItem}
            ></Animated.View>
          </PanGestureHandler>
          <PanGestureHandler onGestureEvent={deleteGestureEventHandler}>
            <Animated.View
              style={[
                movableItemStyles.panGestureItem,
                {
                  maxWidth: "30%",
                  maxHeight: "65%",
                },
              ]}
            ></Animated.View>
          </PanGestureHandler>
        </Pressable>
      </View>
      <Animated.View
        style={[trashIconStyleR, movableItemStyles.trashIconContainer]}
      >
        <SvgXml
          xml={trash(textColors.red)}
          width={movableItemStyles.trashIcon.width}
          height={movableItemStyles.trashIcon.height}
          style={movableItemStyles.trashIcon}
        />
      </Animated.View>
      <Task
        rStyle={taskStyleR}
        taskObject={taskObject}
        completeTask={completeTaskHandler}
        sectionType={sectionTitle}
      />
    </Animated.View>
  );
};

const shouldTaskRerender = (prev: MovableItemProps, curr: MovableItemProps) => {
  return JSON.stringify(curr.taskObject) === JSON.stringify(prev.taskObject);
};

export default React.memo(MovableItem, shouldTaskRerender);
