import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { calendar, calendarEvent } from "../../../../assets/icons/calendar";
import { textColors } from "../../../styles/global/colors";
import {
  text12,
  text17LineHeight,
  textGrey,
} from "../../../styles/global/texts";
import { getDate } from "../../../utils/date";
import { popupItemStyles } from "./styles";
import { DateCheckItemPropType } from "./types";
import ListItem from "../../Layouts/ListItem/ListItem";
import { useTheme } from "@react-navigation/native";
import ThemeText from "../../Layouts/Theme/Text/ThemeText";
import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";

const DateCheckItem: FC<DateCheckItemPropType> = ({
  title,
  onPress,
  date,
  state,
  isToggleCalendarShownComponent,
  isChecked,
}) => {
  const { colors } = useTheme();
  const language = useSelector(getLanguage);
  const { weekDay } = getDate(language, { date: date, isShort: true });

  const onPressHandler = () => {
    onPress(state, date);
  };

  return (
    <Pressable onPress={onPressHandler}>
      <ListItem style={popupItemStyles.listItem}>
        <View style={popupItemStyles.dateItemLeft}>
          {isToggleCalendarShownComponent ? (
            <View style={[popupItemStyles.calendarIconContainer]}>
              <SvgXml
                xml={calendarEvent(
                  isChecked ? textColors.blue : colors.text
                )}
                width={22}
                height={22}
              />
            </View>
          ) : (
            <View style={[popupItemStyles.calendarIconContainer]}>
              <SvgXml
                xml={calendar(
                  isChecked ? textColors.blue : colors.text
                )}
                width={22}
                height={22}
              />
              <ThemeText
                style={[
                  text12,
                  popupItemStyles.calendarIconText,
                  isChecked && { color: textColors.blue },
                ]}
              >
                {date?.getDate()}
              </ThemeText>
            </View>
          )}
          <ThemeText
            style={[
              text17LineHeight,
              isChecked && { color: textColors.blue },
            ]}
          >
            {title}
          </ThemeText>
        </View>
        {isToggleCalendarShownComponent ? (
          <SvgXml
            xml={arrowBottom(textColors.grey)}
            style={{ transform: [{ rotate: "-90deg" }] }}
            width={16}
            height={16}
          />
        ) : (
          <Text style={[text17LineHeight, textGrey]}>{weekDay}</Text>
        )}
      </ListItem>
    </Pressable>
  );
};

export default DateCheckItem;
