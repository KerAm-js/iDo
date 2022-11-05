import React, { FC } from "react";
import { View } from "react-native";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import { CalendarPopupPropType } from "./types";

const CalendarPopup: FC<CalendarPopupPropType> = ({ visible, title }) => {
  return (
    <BottomPopup visible={visible} title={title}>
      <Calendar />
    </BottomPopup>
  )
}

export default CalendarPopup;