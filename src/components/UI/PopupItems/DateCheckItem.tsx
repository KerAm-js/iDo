import React, { FC, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, littleBorderRadius } from "../../../styles/global/borderRadiuses";
import { arrowBottomGrey } from "../../../../assets/icons/arrowBottom";
import {
  calendar,
  calendarBlue,
  calendarEvent,
  calendarEventBlue,
} from "../../../../assets/icons/calendar";
import { backgroundColors, textColors } from "../../../styles/global/colors";
import {
  text12,
  text17LineHeight,
  textGrey,
} from "../../../styles/global/texts";
import { getDate } from "../../../utils/date";
import { popupItemStyles } from "./styles";
import { DateCheckItemPropType } from "./types";

const DateCheckItem: FC<DateCheckItemPropType> = ({
  title,
  onPress,
  date,
  calendarShown,
  isToggleCalendarShownComponent,
  isChecked,
}) => {
  const { weekDay } = getDate("ru", { date: date, isShort: true });
  const iconRotation = useSharedValue(-90);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotation.value}deg` }],
    };
  }, [iconRotation.value]);

  useEffect(() => {
    if (calendarShown) {
      iconRotation.value = withTiming(0, { duration: 200 })
    } else {
      iconRotation.value = withTiming(-90, { duration: 200 })
    }
  }, [calendarShown])

  return (
    <Pressable onPress={onPress}>
      <SquircleView
        style={[popupItemStyles.listItem]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: littleBorderRadius,
          fillColor: backgroundColors.white,
        }}
      >
        <View style={popupItemStyles.dateItemLeft}>
          {isToggleCalendarShownComponent ? (
            <View style={[popupItemStyles.calendarIconContainer]}>
              <SvgXml
                xml={isChecked ? calendarEventBlue : calendarEvent}
                width={22}
                height={22}
              />
            </View>
          ) : (
            <View style={[popupItemStyles.calendarIconContainer]}>
              <SvgXml
                xml={isChecked ? calendarBlue : calendar}
                width={22}
                height={22}
              />
              <Text
                style={[
                  text12,
                  popupItemStyles.calendarIconText,
                  isChecked && { color: textColors.blue },
                ]}
              >
                {date?.getDate()}
              </Text>
            </View>
          )}
          <Text
            style={[text17LineHeight, isChecked && { color: textColors.blue }]}
          >
            {title}
          </Text>
        </View>
        {isToggleCalendarShownComponent ? (
          <Animated.View style={[iconStyle]}>
            <SvgXml
              xml={arrowBottomGrey}
              width={16}
              height={16}
            />
          </Animated.View>
        ) : (
          <Text style={[text17LineHeight, textGrey]}>{weekDay}</Text>
        )}
      </SquircleView>
    </Pressable>
  );
};

export default DateCheckItem;
