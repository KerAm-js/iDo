import React, { FC, useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  BounceInRight,
  FadeIn,
  FadeInRight,
  runOnJS,
  SlideInRight,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { shadowStyle } from "../../../styles/global/shadow";
import {
  getInsideLayoutTranslationY,
  getNewTaskPosition,
  listObjectToPositionsObject,
  moveCompletedTask,
  moveTask,
  moveUncompletedTask,
} from "../../../utils/taskUI";
import { movableItemStyles } from "./style";
import { MovableItemProps } from "./types";

const MovableItem: FC<MovableItemProps> = ({
  id,
  positions,
  positionsState,
  opacity,
  itemHeight,
  component: Component,
  componentProps,
  completedMarkerTop,
  updatePositionsState,
  upperBound,
  upperBoundMax,
  updateUpperBound,
  markerOpacity,
}) => {
  const [isDragged, setIsDragged] = useState(false);
  const top = itemHeight * positions?.value[id]?.position | 0;
  const translateY = useSharedValue(top);
  const shadowOpacity = useSharedValue(0);
  const timeOut: { current: ReturnType<typeof setTimeout> | null } =
    useRef(null);

  useAnimatedReaction(
    () => positions?.value[id],
    (current, previous) => {
      const isCompletedChanged = current?.isCompleted !== previous?.isCompleted
      const isPositionChanged = current?.position !== previous?.position
      const isCompleted = positions?.value[id]?.isCompleted;

      if (isPositionChanged || isCompletedChanged ) {
        if (!isDragged) {
          const newTop = isCompleted ? 31 + current?.position * itemHeight : current?.position * itemHeight;
          translateY.value = withTiming(newTop, {
            duration: 300,
          });
        }
      }
    }
  );

  const onActiveGestureEvent = (translationY: number) => {
    "worklet";
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

      if (newPosition !== positions?.value[id]?.position && !componentProps?.time) {
        positions.value = moveTask(
          positions?.value,
          positions?.value[id]?.position,
          newPosition,
        );
      }
    }
  };

  const onFinishGestureEvent = () => {
    "worklet";
    if (isDragged) {
      if (componentProps.time) {
        translateY.value = withTiming(top, { duration: 300 });
      } else {
        const newPosition = positions?.value[id]?.position;
        translateY.value = withTiming(newPosition * itemHeight, { duration: 300 });
      }
      runOnJS(setIsDragged)(false);
      runOnJS(updatePositionsState)(
        listObjectToPositionsObject(positions.value)
      );
      shadowOpacity.value = withTiming(0, { duration: 300 });
    }
  };

  const gestureEventHanlder =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: (event) => {
        onActiveGestureEvent(event?.translationY);
      },
      onFinish: () => {
        onFinishGestureEvent();
      },
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: shadowOpacity.value,
      top: translateY.value,
      opacity: opacity.value,
      zIndex: shadowOpacity.value > 0 ? 1 : 0,
    };
  }, [positions, translateY, shadowOpacity, opacity]);

  const onLongPress = () => {
    setIsDragged(true);
    shadowOpacity.value = withTiming(0.12, { duration: 300 });
  };

  const completeTask = (taskId: string) => {
    if (componentProps.isCompleted) {
      const newUpperBound = upperBound + 1;
      if (timeOut.current) {
        clearTimeout(timeOut.current);
        timeOut.current = null;
      }

      updateUpperBound(newUpperBound);
      positions.value = moveUncompletedTask(
        positions.value,
        positionsState,
        id
      );
      if (newUpperBound !== upperBoundMax) {
        completedMarkerTop.value = withTiming(completedMarkerTop.value + itemHeight, {
          duration: 300,
        })
      }
    } else {
      updateUpperBound(upperBound - 1);
      timeOut.current = setTimeout(() => {
        positions.value = moveCompletedTask(
          positions.value,
          id,
          positions?.value[id]?.position,
          upperBound
        );
        if (upperBound !== upperBoundMax) {
          completedMarkerTop.value = withTiming(completedMarkerTop.value - itemHeight, {
            duration: 300,
          })
        }
        if (markerOpacity.value < 1) {
          markerOpacity.value = withTiming(1, { duration: 300 });
        }
      }, 500);
    }
    componentProps.completeTask(taskId);
  };

  return (
    <Animated.View
      entering={(top === 0 && !positions?.value[id]) && SlideInRight.delay(200)}
      style={[
        movableItemStyles.container,
        shadowStyle,
        containerStyle,
      ]}
    >
      <PanGestureHandler onGestureEvent={gestureEventHanlder}>
        <Animated.View style={[movableItemStyles.panGestureContainer]}>
          <Pressable
            onLongPress={componentProps.isCompleted ? () => {} : onLongPress}
            style={[movableItemStyles.pressable]}
          ></Pressable>
        </Animated.View>
      </PanGestureHandler>
      <Component {...componentProps} completeTask={completeTask} />
    </Animated.View>
  );
};

export default MovableItem;
