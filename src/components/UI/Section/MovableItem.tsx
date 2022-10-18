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
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { shadowStyle } from "../../../styles/global/shadow";
import {
  getInsideLayoutTranslationY,
  getNewTaskPosition,
  moveTask,
} from "../../../utils/taskUI";
import { movableItemStyles } from "./style";
import { MovableItemProps } from "./types";

const MovableItem: FC<MovableItemProps> = ({
  id,
  positions,
  itemHeight,
  component: Component,
  componentProps,
  updateData,
}) => {
  const [isDragged, setIsDragged] = useState(false);

  const top = itemHeight * positions.value[id] | 0;
  const translateY = useSharedValue(top);
  const opacity = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!isDragged) {
          translateY.value = withSpring(currentPosition * itemHeight, {
            damping: 11,
          });
        }
      }
    }
  );

  const gestureEventHanlder =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: (event) => {
        if (isDragged) {
          const { translationY } = event;
          const newTop = getNewTaskPosition(
            translationY + top,
            0,
            Object.keys(positions.value).length - 1,
            itemHeight
          );

          translateY.value = getInsideLayoutTranslationY(
            translationY + top,
            0,
            Object.keys(positions.value).length - 1,
            itemHeight,
          );

          if (newTop / itemHeight !== positions.value[id] * itemHeight) {
            positions.value = moveTask(
              positions.value,
              positions.value[id],
              newTop / itemHeight
            );
          }
        }
      },
      onFinish: () => {
        if (isDragged) {
          opacity.value = withTiming(0, { duration: 200 });
          const newTop = getNewTaskPosition(
            translateY.value,
            0,
            Object.keys(positions.value).length - 1,
            itemHeight
          );
          translateY.value = withSpring(newTop, { damping: 12 });
          runOnJS(setIsDragged)(false);
          runOnJS(updateData)(positions.value);
        }
      },
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: opacity.value,
      top: translateY.value,
    };
  }, [positions, translateY, opacity]);

  const onLongPress = () => {
    setIsDragged(true);
    opacity.value = withTiming(0.12, { duration: 200 });
  };

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
            onLongPress={onLongPress}
            style={[movableItemStyles.pressable]}
          ></Pressable>
        </Animated.View>
      </PanGestureHandler>
      <Component {...componentProps} />
    </Animated.View>
  );
};

export default MovableItem;
