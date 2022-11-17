import React, { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { clock, clockActive } from "../../../../assets/icons/clock";
import { updateNewTaskDataAction } from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { TimeType } from "../../../redux/types/task";
import { CHOOSE, TODAY, TOMORROW } from "../../../utils/constants/periods";
import { extractCalendarState, getDate } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/FormButton";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { calendarPopupStyles } from "./styles";
import { CalendarPopupPropType } from "./types";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { calendarEventGrey } from "../../../../assets/icons/calendar";


const CalendarPopup: FC<CalendarPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  closePopup,
}) => {
  const texts = languageTexts["ru"];
  const dispatch: AppDispatch = useDispatch();
  const { tasks, taskToEdit } = useSelector(taskSelector);
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [state, setState] = useState<string>(TODAY);
  const [calendarShown, setCalendarShown] = useState<boolean>(false);
  const [chooseItemTitle, setChooseItemTitle] = useState<string>(
    texts.words[CHOOSE]
  );

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const keyboardHeight = useKeyboard();

  const translateX = useSharedValue(0);
  const translateFormButtonY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: withTiming(keyboardHeight > 0 ? 0 : 1, { duration: 150 }),
    };
  }, [translateX.value, keyboardHeight]);

  const formButtonWrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translateFormButtonY.value }],
    };
  }, [translateFormButtonY.value]);

  const currDate = new Date();
  const tomorrowDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() + 1
  );

  const setDefaults = (defaultDate?: Date, defaultTimeType?: TimeType) => {
    const state = defaultDate ? extractCalendarState(defaultDate) : TODAY;
    const time = defaultDate
      ? defaultTimeType === "time"
        ? defaultDate.toTimeString().slice(0, 5)
        : ""
      : "";
    setTime(time);
    setState(state);
    setDate(defaultDate ? defaultDate : new Date());
    setCalendarShown(false);
    setChooseItemTitle(
      state === CHOOSE
        ? getDate("ru", { date: currDate }).date
        : texts.words[CHOOSE]
    );
  };

  const saveTime = () => {
    const hours = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    const isTimeCorrect = !(isNaN(hours) && isNaN(minutes));
    dispatch(
      updateNewTaskDataAction(
        time && isTimeCorrect
          ? {
              timeType: "time",
              time: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                hours,
                minutes
              ).valueOf(),
            }
          : {
              timeType: "day",
              time: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                23,
                59,
                59,
                999
              ).valueOf(),
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

  useEffect(() => {
    translateFormButtonY.value = withTiming(
      keyboardHeight > 0 ? keyboardHeight - 30 : 0,
      { duration: keyboardHeight > 0 ? 300 : 200 }
    );
  }, [keyboardHeight]);

  useEffect(() => {
    translateFormButtonY.value = 0
  }, [visible])

  useEffect(() => {
    setDefaults();
  }, [tasks]);

  useEffect(() => {
    if (!taskToEdit) {
      setDefaults();
    } else {
      setDefaults(new Date(taskToEdit.time), taskToEdit.timeType);
    }
  }, [taskToEdit]);

  useEffect(() => {
    translateX.value = withTiming(calendarShown ? -SCREEN_WIDTH : 0, {
      duration: 300,
    });
  }, [calendarShown]);

  return (
    <BottomPopup
      visible={visible}
      title={title}
      handleKeyboard={handleKeyboard}
    >
      <Animated.View style={[calendarPopupStyles.conatiner, containerStyle]}>
        <ScrollView style={[calendarPopupStyles.scrollView]}>
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
            onPress={() => onItemClick(CHOOSE, date)}
          />
        </ScrollView>
        <ScrollView style={[calendarPopupStyles.scrollView]}>
          <Calendar
            date={date}
            setDate={(date) => {
              setDate(date);
              setChooseItemTitle(getDate("ru", { date }).date);
            }}
          />
        </ScrollView>
      </Animated.View>
      <Animated.View
        style={[formButtonWrapperStyle, calendarPopupStyles.buttonsContainer]}
      >
        <FormButton
          title={"Время"}
          iconXml={clock}
          iconActiveXml={clockActive}
          isInput
          inputValue={time}
          onInputChange={onTimeChange}
        />
        <FormButton
          title={calendarShown || keyboardHeight > 0 ? "Готово" : "Сохранить"}
          onPress={
            keyboardHeight > 0
              ? () => Keyboard.dismiss()
              : calendarShown
              ? () => setCalendarShown(false)
              : saveTime
          }
        />
      </Animated.View>
    </BottomPopup>
  );
};

export default CalendarPopup;
