import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { arrowBottom } from "../../../../assets/icons/arrowBottom";
import { calendarEvent } from "../../../../assets/icons/calendar";
import { textColors } from "../../../styles/global/colors";
import { text17LineHeight, textGrey } from "../../../styles/global/texts";
import { getDate } from "../../../utils/date";
import { popupItemStyles } from "./styles";
import { DateCheckItemPropType } from "./types";
import ListItem from "../../Layouts/ListItem/ListItem";
import { useTheme } from "@react-navigation/native";
import CalendarDateIcon from "./CalendarIcon";
import LangText from "../LangText/LangText";
import { LanguageType } from "../../../redux/types/prefs";

const DateCheckItem: FC<DateCheckItemPropType> = ({
  title,
  onPress,
  date,
  state,
  isToggleCalendarShownComponent,
  isChecked,
}) => {
  const { colors } = useTheme();

  const onPressHandler = () => {
    onPress(state, date);
  };

  const weekDayGetter = (lang: LanguageType) => {
    return getDate(lang, { date: date, isShort: true }).weekDay;
  };

  return (
    <Pressable onPress={onPressHandler}>
      <ListItem style={popupItemStyles.listItem}>
        <View style={popupItemStyles.dateItemLeft}>
          {isToggleCalendarShownComponent ? (
            <View style={[popupItemStyles.calendarIconContainer]}>
              <SvgXml
                xml={calendarEvent(isChecked ? textColors.blue : colors.text)}
                width={22}
                height={22}
              />
            </View>
          ) : (
            <CalendarDateIcon
              size="small"
              date={date ? date : new Date()}
              color={isChecked ? textColors.blue : colors.text}
            />
          )}
          <LangText
            title={title}
            style={[
              text17LineHeight,
              isChecked && { color: textColors.blue },
              { paddingLeft: 10 },
            ]}
          />
        </View>
        {isToggleCalendarShownComponent ? (
          <SvgXml
            xml={arrowBottom(textColors.grey)}
            style={{ transform: [{ rotate: "-90deg" }] }}
            width={16}
            height={16}
          />
        ) : (
          <LangText
            handleTheme={false}
            style={[text17LineHeight, textGrey]}
            title={weekDayGetter}
          />
        )}
      </ListItem>
    </Pressable>
  );
};

export default DateCheckItem;
