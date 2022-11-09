import React, { FC, useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { clock, clockActive } from "../../../../assets/icons/clock";
import { updateNewTaskData } from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
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
  closePopup,
}) => {
  const texts = languageTexts["ru"];
  const dispatch: AppDispatch = useDispatch();
  const { newTaskData } = useSelector(taskSelector);
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

  const setDefaults = () => {
    setTime("");
    setState("");
    setDate(new Date());
    setCalendarShown(false);
    setChooseItemTitle(texts.words[CHOOSE]);
  };

  const saveTime = () => {
    const hours = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    const isTimeCorrect = isNaN(hours) && isNaN(minutes);
    dispatch(
      updateNewTaskData(
        time && isTimeCorrect
          ? {
            timeType: 'time',
            time: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              hours,
              minutes,
            ).toString(),
          }
          : {
            timeType: 'day',
            time: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              23,
              59,
              59,
              999,
            ).toString(),
          }
      )
    );
    Keyboard.dismiss();
    closePopup();
  };

  const onTimeChange = (value: string) => {
    const hours = value.slice(0, 2);
    const minutes = value.slice(3, 5);
    if (
      (hours.length > 0 && isNaN(Number(hours))) ||
      (minutes.length > 0 && isNaN(Number(minutes)))
    ) {
      return;
    }
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
    if (!newTaskData.time) {
      setDefaults();
    }
  }, [visible]);

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
