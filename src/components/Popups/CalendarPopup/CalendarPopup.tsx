import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, Pressable, ScrollView, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clock, clockActive } from "../../../../assets/icons/clock";
import { CHOOSE, TODAY, TOMORROW } from "../../../utils/constants";
import { getDate } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/Button";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { calendarPopupStyles } from "./styles";
import { CalendarPopupPropType } from "./types";

const CalendarPopup: FC<CalendarPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
}) => {
  const texts = languageTexts["ru"];
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [state, setState] = useState<string>("");
  const [calendarShown, setCalendarShown] = useState<boolean>(false);
  const [chooseItemTitle, setChooseItemTitle] = useState<string>(
    texts.words[CHOOSE]
  );

  const currDate = new Date();
  const tomorrowDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() + 1
  );

  const calendarHeight = useSharedValue(0);

  const saveTime = () => {
    setDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number.parseInt(time.slice(0, 2)),
        Number.parseInt(time.slice(3, 5))
      )
    );
    Keyboard.dismiss();
    Alert.alert(
      `Срок задачи \n${new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number.parseInt(time.slice(0, 2)),
        Number.parseInt(time.slice(3, 5))
      ).toLocaleString()}`
    );
  };

  const onTimeChange = (value: string) => {
    if (value.length === 1 && Number.parseInt(value) > 2) {
      return;
    } else if (value.length === 2 && Number.parseInt(value) > 23) {
      return;
    } else if (
      (value.length === 3 && Number.parseInt(value.slice(0, 2)) > 23) ||
      Number.parseInt(value[3]) > 5
    ) {
      return;
    } else if (
      (value.length === 4 && Number.parseInt(value.slice(0, 2)) > 23) ||
      Number.parseInt(value.slice(3, 5)) > 59
    ) {
      return;
    }

    if (time.length === 1 && value.length === 2) {
      setTime(value + ":");
    } else if (time.length === 4 && value.length === 3) {
      setTime(time.slice(0, 2));
    } else if (time.length === 2 && value.length === 3) {
      setTime(time + ":" + value[2]);
    } else {
      setTime(value);
    }
  };

  const onItemClick = (state: string, date: Date) => {
    if (state === CHOOSE) {
      if (calendarShown) {
        setCalendarShown(false);
      } else {
        setCalendarShown(true);
        setDate(currDate);
        setChooseItemTitle(getDate("ru", { date: currDate }).date);
      }
    } else {
      setChooseItemTitle(texts.words[CHOOSE]);
      setCalendarShown(false);
      setDate(date);
    }
    setState(state);
  };

  const calendarContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(calendarHeight.value, [0, 300], [0, 1]);
    return {
      overflow: "hidden",
      opacity,
      height: calendarHeight.value,
    };
  }, [calendarHeight.value]);

  useEffect(() => {
    calendarHeight.value = withTiming(calendarShown ? 300 : 0, {
      duration: 300,
    });
  }, [calendarShown]);

  useEffect(() => {
    console.log(date.toLocaleString());
  }, [date]);

  return (
    <BottomPopup
      visible={visible}
      title={title}
      handleKeyboard={handleKeyboard}
    >
      <ScrollView style={[calendarPopupStyles.conatiner]}>
        <DateCheckItem
          title={texts.periods[TODAY]}
          date={currDate}
          isChecked={state === TODAY}
          onPress={() => onItemClick(TODAY, currDate)}
        />
        <DateCheckItem
          title={texts.periods[TOMORROW]}
          date={tomorrowDate}
          isChecked={state === TOMORROW}
          onPress={() => onItemClick(TOMORROW, tomorrowDate)}
        />
        <DateCheckItem
          title={chooseItemTitle}
          isChecked={state === CHOOSE}
          isToggleCalendarShownComponent
          calendarShown={calendarShown}
          onPress={() => onItemClick(CHOOSE, date)}
        />
        <Animated.View style={[calendarContainerStyle]}>
          <Calendar
            date={date}
            setDate={(date) => {
              setDate(date);
              setChooseItemTitle(getDate("ru", { date }).date);
            }}
          />
        </Animated.View>
      </ScrollView>
      <View style={[calendarPopupStyles.buttonsContainer]}>
        <FormButton
          title="Время"
          iconXml={clock}
          iconActiveXml={clockActive}
          isInput
          inputValue={time}
          onInputChange={onTimeChange}
        />
        <FormButton title="Сохранить" onPress={saveTime} />
      </View>
    </BottomPopup>
  );
};

export default CalendarPopup;
