import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { SquircleView } from "react-native-figma-squircle";
import { borderSmoothing, smallBorderRadius } from "../../../styles/global/borderRadiuses";
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
  isToggleCalendarShownComponent,
  isChecked,
}) => {
  const { weekDay } = getDate("ru", { date: date, isShort: true });

  return (
    <Pressable onPress={onPress}>
      <SquircleView
        style={[popupItemStyles.listItem]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: smallBorderRadius,
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
          <SvgXml
            xml={arrowBottomGrey}
            style={{ transform: [{ rotate: '-90deg' }] }}
            width={16}
            height={16}
          />
        ) : (
          <Text style={[text17LineHeight, textGrey]}>{weekDay}</Text>
        )}
      </SquircleView>
    </Pressable>
  );
};

export default DateCheckItem;
