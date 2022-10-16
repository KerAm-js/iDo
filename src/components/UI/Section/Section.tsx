import React, { FC, useRef, useState } from "react";
import { LayoutAnimation, Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { title20 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { SectionProps } from "./types";
import IconButton from "../buttons/IconButton/IconButton";
import Task from "../Task/Task";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MovableItem from "./MovableItem";
import { taskListToObject } from "../../../utils/taskUI";

const TaskMargin = 10;
const TaskHeight = 63 + TaskMargin;

const Section: FC<SectionProps> = ({ title, list }) => {
  const [isListHidden, setIsListHidden] = useState(false);
  const [data, setData] = useState(list);
  const positions = useSharedValue(taskListToObject(list))
  const opacity = useSharedValue(1);

  const listContainerStyle = useAnimatedStyle(() => {
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

  const containerStyle = useAnimatedStyle(() => {
    const height = interpolate(opacity.value, [0,1], [30, list.length * TaskHeight + 30]);
    return {
      height,
      overflow: isListHidden ? "hidden" : "visible",
    }
  }, [opacity.value]);

  const toggleListVisible = () => {
    setIsListHidden(!isListHidden);
    opacity.value = withTiming(isListHidden ? 1 : 0, { duration: 200 });
  };

  return (
    <Animated.View
      key={title}
      style={[
        sectionStyles.container,
        containerStyle
      ]}
    >
      <View style={sectionStyles.headerContainer}>
        <Text style={title20}>{title}</Text>
        <Animated.View style={[arrowStyle]}>
          <IconButton
            xml={arrowBottomGrey}
            onClick={toggleListVisible}
            iconWidth={16}
            iconHeight={16}
          />
        </Animated.View>
      </View>
      <Animated.View style={[listContainerStyle]}>
        {list.map((item, index) => (
          <MovableItem
            key={index + item.task}
            positions={positions}
            id={item.id}
            itemHeight={TaskHeight}
            component={Task}
            componentProps={item}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default Section;
