import React, { FC, useRef, useState } from "react";
import { Animated, LayoutAnimation, Text, View } from "react-native";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import { title20 } from "../../../styles/global/texts";
import { sectionStyles } from "./style";
import { sectionProps } from "./types";
import IconButton from "../buttons/IconButton/IconButton";
import Task from "../Task/Task";

const Section: FC<sectionProps> = ({ title, list }) => {

  const [isListHidden, setIsListHidden] = useState(false);

  const opacity = useRef(new Animated.Value(1)).current;
  const iconRotation = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg']
  })

  const toggleListVisible = () => {
    setIsListHidden(!isListHidden);
    Animated.timing(opacity, {
      toValue: isListHidden ? 1 : 0,
      useNativeDriver: true,
      duration: 300,
    }).start();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  };
  
  return (
    <Animated.View key={title} style={[sectionStyles.container, {height: isListHidden ? 30 : 'auto'} ]}>
      <View style={sectionStyles.headerContainer}>
        <Text style={title20}>{title}</Text>
        <Animated.View
          style={{ transform: [{ rotate: iconRotation }] }}
        >
          <IconButton
            xml={arrowBottomGrey}
            onClick={toggleListVisible}
            iconWidth={16}
            iconHeight={16}
          />
        </Animated.View>
      </View>
      <Animated.View style={[{ opacity, }]}>
        {list.map((item, index) => (
          <Task key={index + item.task} {...item} />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default Section;