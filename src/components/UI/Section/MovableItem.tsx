import React, { FC, useState } from "react";
import { Pressable, View } from "react-native";
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
import { getNewTaskPosition, moveTask } from "../../../utils/taskUI";
import { movableItemStyles } from "./style";
import { MovableItemProps } from "./types";

const MovableItem: FC<MovableItemProps> = ({
  id,
  positions,
  itemHeight,
  component: Component,
  componentProps,
}) => {
  const [isDragged, setIsDragged] = useState(false);

  const top = itemHeight * positions.value[id];
  const translateY = useSharedValue(top);
  const opacity = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!isDragged) {
          translateY.value = withSpring(currentPosition * itemHeight);
        }
      }
    }
  )

  const gestureEventHanlder =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: (event) => {
        if (isDragged) {
          translateY.value = event.translationY + top;
          const newTop = getNewTaskPosition(
            translateY.value,
            0,
            Object.keys(positions.value).length - 1,
            itemHeight,
          );

          if (newTop / itemHeight !== positions.value[id] * itemHeight) {
            positions.value = moveTask(
              positions.value,
              positions.value[id],
              newTop / itemHeight,
            )
          }
        }
      },
      onFinish: () => {
        opacity.value = withTiming(0, { duration: 200 });
        const newTop = getNewTaskPosition(
          translateY.value,
          0,
          Object.keys(positions.value).length - 1,
          itemHeight,
        );
        translateY.value = withTiming(newTop);
        runOnJS(setIsDragged)(false);
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
    <PanGestureHandler onGestureEvent={gestureEventHanlder}>
      <Animated.View
        style={[movableItemStyles.container, shadowStyle, containerStyle, {zIndex: isDragged ? 10 : 0,}]}
      >
        <Component {...componentProps} onLongPress={onLongPress} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default MovableItem;
