import React, { FC, useRef, useState } from "react";
import { Dimensions, Pressable } from "react-native";
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
import {
  moveGesturePosition,
} from "../../../utils/section/gesturePostions";
import { trash } from "../../../../assets/icons/trash";
import { textColors } from "../../../styles/global/colors";
import { TaskType } from "../../../redux/types/task";

const MovableItem: FC<MovableItemProps> = React.memo(
  ({
    id,
    index,
    positions,
    gesturePositions,
    opacity,
    itemHeight,
    component: Component,
    sectionTitle,
    completeTask,
    deleteTask,
    taskObject,
    upperBound,
  }) => {
    const [isDragged, setIsDragged] = useState(false);
    const { width: SCREEN_WIDTH } = Dimensions.get("screen");
    const translateThreshold = SCREEN_WIDTH * -0.3;
    const top = positions.value[id]
      ? itemHeight * positions?.value[id]?.position +
        (positions?.value[id]?.isCompleted ? 31 : 0)
      : index * itemHeight;
    const translateY = useSharedValue(top);
    const translateX = useSharedValue(0);
    const trashIconOpacity = useSharedValue(0);
    const shadowOpacity = useSharedValue(0);
    const zIndex = useSharedValue(0);
    const timeOut: { current: ReturnType<typeof setTimeout> | null } =
      useRef(null);

    const containerStyleR = useAnimatedStyle(() => {
      return {
        shadowOpacity: shadowOpacity.value,
        top: translateY.value,
        opacity: opacity.value,
        zIndex: zIndex.value,
      };
    }, [positions, translateY, shadowOpacity, opacity]);

    const taskContainerStyleR = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
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
        const isCompletedChanged =
          current?.isCompleted !== previous?.isCompleted;
        const isPositionChanged = current?.position !== previous?.position;
        const isCompleted = positions?.value[id]?.isCompleted;
        if (isPositionChanged || isCompletedChanged) {
          if (!isDragged) {
            const newTop = isCompleted
              ? 31 + current?.position * itemHeight
              : current?.position * itemHeight;

            if (isCompletedChanged) {
              zIndex.value = -1;
            }

            translateY.value = withTiming(
              newTop,
              {
                duration: 300,
              },
              (isFinished) => {
                if (isFinished) {
                  zIndex.value = 0;
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
      zIndex.value = 1;
    };

    const onActiveGestureEvent = (
      event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
      context: ContextType
    ) => {
      "worklet";
      const { translationY, translationX } = event;
      if (isDragged) {
        const newPosition = getNewTaskPosition(
          translationY + top,
          0,
          upperBound,
          itemHeight
        );

        translateY.value = getInsideLayoutTranslationY(
          translationY + top,
          0,
          upperBound,
          itemHeight
        );

        if (newPosition !== positions?.value[id]?.position) {
          const [newPositionsObject, isTaskMovingDisabled, toId] = moveTask(
            positions?.value,
            positions?.value[id]?.position,
            newPosition
          );
          if (
            positions.value[id].timeType === "day" &&
            positions.value[toId].timeType === "day"
          ) {
            const newGesturePositions = moveGesturePosition(
              gesturePositions.value,
              id,
              toId
            );
            gesturePositions.value = newGesturePositions
          }
          positions.value = newPositionsObject;
          context.isMovingDisabled = isTaskMovingDisabled;
        }
      } else {
        translateX.value = translationX;
        if (
          translationX < translateThreshold &&
          trashIconOpacity.value === 0 &&
          !taskObject.isCompleted
        ) {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        }
        trashIconOpacity.value = withTiming(
          translationX < translateThreshold ? 1 : 0,
          { duration: 150 }
        );
      }
    };

    const onFinishGestureEvent = (
      _: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
      context: ContextType
    ) => {
      "worklet";
      if (isDragged) {
        zIndex.value = 0;
        const newPosition = positions?.value[id]?.position;
        if (context.isMovingDisabled) {
          positions.value = context.startPositionsObject;
          translateY.value = withTiming(context.startPosition * itemHeight, {
            duration: 300,
          });
        } else {
          translateY.value = withTiming(newPosition * itemHeight, {
            duration: 300,
          });
        }
        shadowOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(setIsDragged)(false);
      } else {
        if (translateX.value < translateThreshold && !taskObject.isCompleted) {
          translateX.value = withSpring(-SCREEN_WIDTH);
          trashIconOpacity.value = withTiming(
            0,
            { duration: 250 },
            (isFinished) => {
              if (isFinished && deleteTask) {
                runOnJS(deleteTask)(id);
              }
            }
          );
        } else {
          trashIconOpacity.value = withTiming(0, { duration: 150 });
          translateX.value = withSpring(0);
        }
      }
    };

    const gestureEventHanlder = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextType
    >({
      onStart: onStartGestureEvent,
      onActive: onActiveGestureEvent,
      onFinish: onFinishGestureEvent,
    });

    const onLongPress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsDragged(true);
      shadowOpacity.value = withTiming(0.1, { duration: 300 });
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

    return (
      <Animated.View
        entering={
          !positions?.value[id]
            ? SlideInRight.springify().damping(12).delay(100)
            : undefined
        }
        style={[movableItemStyles.container, shadowStyle, containerStyleR]}
      >
        <PanGestureHandler onGestureEvent={gestureEventHanlder}>
          <Animated.View style={movableItemStyles.panGestureContainer}>
            <Pressable
              onLongPress={taskObject.isCompleted ? undefined : onLongPress}
              style={movableItemStyles.pressable}
            ></Pressable>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View
          style={[trashIconStyleR, movableItemStyles.trashIconContainer]}
        >
          {taskObject.isCompleted ? (
            <SvgXml
              xml={trash(textColors.grey)}
              width={movableItemStyles.trashIcon.width}
              height={movableItemStyles.trashIcon.height}
              style={movableItemStyles.trashIcon}
            />
          ) : (
            <SvgXml
              xml={trash(textColors.red)}
              width={movableItemStyles.trashIcon.width}
              height={movableItemStyles.trashIcon.height}
              style={movableItemStyles.trashIcon}
            />
          )}
        </Animated.View>
        <Animated.View style={taskContainerStyleR}>
          <Component
            taskObject={taskObject}
            completeTask={completeTaskHandler}
            sectionType={sectionTitle}
          />
        </Animated.View>
      </Animated.View>
    );
  },
  (prev, curr) => {
    return JSON.stringify(prev.taskObject) === JSON.stringify(curr.taskObject) && prev.upperBound === curr.upperBound;
  }
);

export default MovableItem;
