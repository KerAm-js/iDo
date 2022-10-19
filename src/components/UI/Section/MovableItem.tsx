import React, { FC, useState } from "react";
import { Pressable } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { shadowStyle } from "../../../styles/global/shadow";
import { ListObject } from "../../../types/global/ListObject";
import { PositionsObject } from "../../../types/global/PositionsObject";
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
  itemHeight,
  component: Component,
  componentProps,
  updatePositionsState,
  upperBound,
  updateUpperBound,
}) => {
  const [isDragged, setIsDragged] = useState(false);
  const top = itemHeight * positions.value[id].position | 0;
  const translateY = useSharedValue(top);
  const opacity = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id].position,
    (current, previous) => {
      if (current !== previous) {
        if (!isDragged) {
          translateY.value = withTiming(current * itemHeight, { duration: 300 });
        }
      }
    }
  );

  const onActiveGestureEvent = (translationY: number) => {
    'worklet';
    if (isDragged) {
      const newTop = getNewTaskPosition(
        translationY + top,
        0,
        upperBound,
        itemHeight
      );

      translateY.value = getInsideLayoutTranslationY(
        translationY + top,
        0,
        upperBound,
        itemHeight,
      );

      if (newTop / itemHeight !== positions.value[id].position) {
        positions.value = moveTask(
          positions.value,
          positions.value[id].position,
          newTop / itemHeight
        );
      }
    }
  }

  const onFinishGestureEvent = () => {
    'worklet';
    if (isDragged) {
      opacity.value = withTiming(0, { duration: 300 });
      const newTop = getNewTaskPosition(
        translateY.value,
        0,
        Object.keys(positions.value).length - 1,
        itemHeight
      );
      translateY.value = withTiming(newTop, { duration: 300 });
      runOnJS(setIsDragged)(false);
      runOnJS(updatePositionsState)(listObjectToPositionsObject(positions.value));
    }
  }

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
      shadowOpacity: opacity.value,
      top: translateY.value
    };
  }, [positions, translateY, opacity]);

  const onLongPress = () => {
    setIsDragged(true);
    opacity.value = withTiming(0.12, { duration: 300 });
  };

  const completeTask = (taskId: string) => {
    if (componentProps.isCompleted) {
      positions.value = moveUncompletedTask(positions.value, positionsState, id, upperBound);
      updateUpperBound(upperBound + 1);
    } else {
      setTimeout(() => {
        positions.value = moveCompletedTask(positions.value, id, positions.value[id].position, upperBound);
        updateUpperBound(upperBound - 1);
      }, 500)
    }
    componentProps.completeTask(taskId);
  }

  return (
    <Animated.View
      style={[
        movableItemStyles.container,
        shadowStyle,
        containerStyle,
        { zIndex: isDragged ? 10 : 0 },
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
