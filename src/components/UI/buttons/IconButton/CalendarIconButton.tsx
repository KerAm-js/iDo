import { FC } from "react";
import { Pressable } from "react-native";
import CalendarDateIcon from "../../PopupItems/CalendarIcon";
import { calendarIconButtonStyles } from "./style";
import { CalendarIconPropType } from "./types";

const CalendarIconButton: FC<CalendarIconPropType> = ({
  date,
  color,
  onPress,
}) => {
  return (
    <Pressable style={calendarIconButtonStyles.container} onPress={onPress}>
      <CalendarDateIcon date={date} color={color} size="regular" />
    </Pressable>
  );
};

export default CalendarIconButton;
