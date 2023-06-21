import React, { useEffect, useRef, useState } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { messageStyles } from "./styles";
import { SquircleView } from "react-native-figma-squircle";
import {
  bigBorderRadius,
  borderSmoothing,
} from "../../../styles/global/borderRadiuses";
import { useTheme } from "@react-navigation/native";
import LangText from "../LangText/LangText";
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { messageSelector } from "../../../redux/selectors/popupsSelector";
import { MessageGestureContextType } from "./types";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { setMessageAction } from "../../../redux/actions/popupsActions";

const Message = () => {
  const dispatch: AppDispatch = useDispatch();
  const message = useSelector(messageSelector);
  const visible = message.title || message.body;

  const [height, setHeight] = useState(0);
  const { top } = useSafeAreaInsets();
  const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
  const translateY = useSharedValue(0);
  const containerTop = top + 55;

  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const { colors, dark } = useTheme();

  const styleR = useAnimatedStyle(() => {
    return {
      left: 20,
      right: 20,
      bottom: SCREEN_HEIGHT + 50,
      transform: [{ translateY: translateY.value }],
    };
  }, [translateY]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const resetMessage = () => dispatch(setMessageAction());
  const clearTimeoutId = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = undefined;
  };
  const setMessageResettingTimeout = (seconds: number = 7000) => {
    timeoutId.current = setTimeout(() => {
      timeoutId.current = undefined;
      translateY.value = withTiming(0, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(resetMessage)();
        }
      });
    }, seconds);
  };

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(height + containerTop, {
        easing: Easing.bezierFn(0, 0, 0.5, 1),
      });
      clearTimeoutId();
      setMessageResettingTimeout();
    }
  }, [message]);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(height + containerTop, {
        easing: Easing.bezierFn(0, 0, 0.5, 1),
      });
    }
  }, [height]);

  const moveGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    MessageGestureContextType
  >({
    onStart: (
      _: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
      context: MessageGestureContextType
    ) => {
      context.startTrasnlateY = translateY.value;
      runOnJS(clearTimeoutId)();
    },
    onActive: (
      event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
      context: MessageGestureContextType
    ) => {
      translateY.value = context.startTrasnlateY + event.translationY;
    },
    onFinish: (
      event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>
    ) => {
      if (event.translationY < 0) {
        runOnJS(clearTimeoutId)();
        translateY.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) runOnJS(resetMessage)();
        });
      } else if (event.translationY > 0) {
        translateY.value = withSpring(height + containerTop);
        runOnJS(setMessageResettingTimeout)(2500);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={moveGestureEventHandler}>
      <Animated.View
        style={[styleR, { position: "absolute" }]}
        onLayout={onLayout}
      >
        <SquircleView
          style={[messageStyles.container, { shadowOpacity: dark ? 0.9 : 0.2 }]}
          squircleParams={{
            cornerSmoothing: borderSmoothing,
            cornerRadius: bigBorderRadius,
            fillColor: colors.card,
          }}
        >
          {message.title && (
            <LangText
              title={message.title}
              style={
                message.body ? messageStyles.title : messageStyles.titleCenter
              }
            />
          )}
          {message.body && (
            <LangText title={message.body} style={messageStyles.text} />
          )}
        </SquircleView>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Message;
