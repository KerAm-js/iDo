import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import {
  borderSmoothing,
  smallBorderRadius,
} from "../../../styles/global/borderRadiuses";
import { backgroundColors } from "../../../styles/global/colors";
import { text17LineHeight } from "../../../styles/global/texts";
import { popupItemStyles } from "./styles";
import { ReminderCheckItemPropType } from "./types";

const ReminderCheckItem: FC<ReminderCheckItemPropType> = ({
  minutes = 0,
  hours = 0,
  days = 0,
  date,
  onPress,
  isChecked,
}) => {
  let titleString = "Срок задачи";

  if (minutes) {
    titleString = `${minutes} минут до окончания`;
  } else if (hours) {
    titleString = `${hours} ${
      hours === 1 ? "час" : hours <= 5 ? "часа" : "часов"
    }`;
    titleString += ' до окончания';
  } else if (days) {
    titleString = `${days} ${days === 1 ? "день" : days <= 5 ? "дня" : "дней"}`;
    titleString += ' до окончания';
  }


  const onPressHandler = () => {
    onPress(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - days,
        date.getHours() - hours,
        date.getMinutes() - minutes,
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
  };

  return (
    <Pressable onPress={onPressHandler}>
      <SquircleView
        style={[popupItemStyles.listItem]}
        squircleParams={{
          cornerSmoothing: borderSmoothing,
          cornerRadius: smallBorderRadius,
          fillColor: backgroundColors.white,
        }}
      >
        <Text
          style={[
            text17LineHeight,
            isChecked && { color: backgroundColors.blue },
          ]}
        >
          {titleString}
        </Text>
      </SquircleView>
    </Pressable>
  );
};

export default ReminderCheckItem;
