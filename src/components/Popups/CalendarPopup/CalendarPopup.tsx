import React, { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { clock, clockActive } from "../../../../assets/icons/clock";
import {
  updateNewTaskRemindTimeAction,
  updateNewTaskTimeAction,
} from "../../../redux/actions/taskActions";
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
import ReminderCheckItem from "../../UI/PopupItems/ReminderCheckItem";
import {
  calendarEventBlue,
  calendarEventGrey,
} from "../../../../assets/icons/calendar";

const reminderData = [
  {
    id: "0",
    minutes: 0,
  },
  {
    id: "1",
    minutes: 15,
  },
  {
    id: "2",
    hours: 1,
  },
  {
    id: "3",
    days: 1,
  },
];

const CalendarPopup: FC<CalendarPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  closePopup,
  isReminderChoosing,
}) => {
  const texts = languageTexts["ru"];
  const dispatch: AppDispatch = useDispatch();
  const { tasks, taskToEdit, newTaskData } = useSelector(taskSelector);
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateString, setDateString] = useState<string>("");
  const [state, setState] = useState<string>(TODAY);
  const [calendarShown, setCalendarShown] = useState<boolean>(false);
  const [timeInputPlaceholder, setTimeInputPlaceholder] =
    useState<string>("Время");
  const [dateInputPlaceholder, setDateInputPlaceholder] =
    useState<string>("Дата");
  const [chooseItemTitle, setChooseItemTitle] = useState<string>(
    texts.words[CHOOSE]
  );

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const keyboardHeight = useKeyboard();

  const translateX = useSharedValue(0);
  const translateFormButtonY = useSharedValue(0);

  const scrollViewsStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(keyboardHeight > 0 ? 0 : 1, { duration: 150 }),
    };
  }, [keyboardHeight]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, [translateX.value]);

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

  const setDefaults = (
    defaultDate?: Date,
    defaultTimeType?: TimeType,
    remindTime?: number
  ) => {
    if (isReminderChoosing) {
      if (remindTime && defaultDate) {
        const remindDate = new Date(remindTime);
        const minutesDiff = defaultDate?.getMinutes() - remindDate.getMinutes();
        const hoursDiff = defaultDate.getHours() - remindDate.getHours();
        const daysDiff = defaultDate.getDate() - remindDate.getDate();
      }
    } else {
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
      if (defaultDate && defaultTimeType) {
        addTime(defaultDate, time);
      }
    }
  };

  const addTime = (date: Date, time: string) => {
    console.log('ok')
    const hours = time.slice(0, 2);
    const minutes = time.slice(3, 5);
    const isTimeCorrect =
      !(isNaN(Number(hours)) && isNaN(Number(minutes))) &&
      hours.length === 2 &&
      minutes.length === 2;
    const timeType: TimeType = time && isTimeCorrect ? "time" : "day";
    const taskTime: Date =
      time && isTimeCorrect
        ? new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            Number(hours),
            Number(minutes)
          )
        : new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23,
            59,
            59,
            999
          );
    dispatch(updateNewTaskTimeAction(taskTime.valueOf(), timeType));
  };

  const addReminder = () => {
    dispatch(updateNewTaskRemindTimeAction(date.valueOf()));
  };

  const saveTime = () => {
    if (isReminderChoosing) {
      addReminder();
    } else {
      addTime(date, time);
    }
    Keyboard.dismiss();
    closePopup();
  };

  const setPrintedDate = () => {
    const [day, month, year] = dateString.split(".");
    setDate(new Date(Number(year), Number(month) - 1, Number(day)));
  };

  const onTimeChange = (value: string) => {
    const hours = value.slice(0, 2);
    const minutes = value.slice(5, 7);
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
      setTime(time + ":" + value[value.length - 1]);
    } else {
      setTime(value);
    }
  };

  const onDateChange = (value: string) => {
    if (
      (dateString.length === 1 && value.length === 2) ||
      (dateString.length === 4 && value.length === 5)
    ) {
      setDateString(value + ".");
    } else if (
      (dateString.length === 2 && value.length === 3) ||
      (dateString.length === 5 && value.length === 6)
    ) {
      setDateString(dateString + "." + value[value.length - 1]);
    } else if (dateString.length === 4 && value.length === 3) {
      setDateString(value.slice(0, 2));
    } else if (dateString.length === 7 && value.length === 6) {
      setDateString(value.slice(0, 5));
    } else {
      setDateString(value);
    }
  };

  useEffect(() => console.log(time), [time]);

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

  const onSubmit = () => {
    if (calendarShown && keyboardHeight > 0) {
      setPrintedDate();
      Keyboard.dismiss();
    } else if (calendarShown) {
      setCalendarShown(false);
    } else if (keyboardHeight) {
      Keyboard.dismiss();
    } else {
      saveTime();
    }
  };

  useEffect(() => {
    translateFormButtonY.value = withTiming(
      keyboardHeight > 0 ? keyboardHeight - 30 : 0,
      { duration: keyboardHeight > 0 ? 300 : 200 }
    );
  }, [keyboardHeight]);

  useEffect(() => {
    translateFormButtonY.value = 0;
  }, [visible]);

  useEffect(() => {
    setDefaults();
  }, [tasks]);

  useEffect(() => {
    if (!taskToEdit) {
      setDefaults();
    } else {
      setDefaults(
        new Date(taskToEdit.time),
        taskToEdit.timeType,
        taskToEdit.remindTime
      );
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
      <Animated.View style={[calendarPopupStyles.container, containerStyle]}>
        {isReminderChoosing ? (
          <Animated.View style={[calendarPopupStyles.screen, scrollViewsStyle]}>
            {reminderData.map((item) => (
              <ReminderCheckItem
                key={item.id}
                minutes={item.minutes}
                hours={item.hours}
                days={item.days}
                date={new Date(newTaskData?.time || "")}
                onPress={(date: Date) => onItemClick(item.id, date)}
                isChecked={state === item.id}
              />
            ))}
            <DateCheckItem
              title={chooseItemTitle}
              isChecked={state === CHOOSE}
              isToggleCalendarShownComponent
              onPress={() => onItemClick(CHOOSE, date)}
            />
          </Animated.View>
        ) : (
          <Animated.View style={[calendarPopupStyles.screen, scrollViewsStyle]}>
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
          </Animated.View>
        )}
        <View style={[calendarPopupStyles.screen]}>
          <Animated.View style={[scrollViewsStyle]}>
            <Calendar
              date={date}
              setDate={(date) => {
                setDate(date);
                setChooseItemTitle(getDate("ru", { date }).date);
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View
        style={[formButtonWrapperStyle, calendarPopupStyles.buttonsContainer]}
      >
        {calendarShown ? (
          <FormButton
            title={dateInputPlaceholder}
            onFocus={() => setDateInputPlaceholder("дд.мм.гггг")}
            onBlur={() => setDateInputPlaceholder("Дата")}
            iconXml={
              dateInputPlaceholder === "Дата" ? calendarEventGrey : undefined
            }
            iconActiveXml={calendarEventBlue}
            style={{ marginRight: 10 }}
            isInput
            value={dateString}
            maxLength={10}
            onChangeText={onDateChange}
          />
        ) : (
          <FormButton
            title={timeInputPlaceholder}
            iconXml={timeInputPlaceholder === "Время" ? clock : undefined}
            onFocus={() => setTimeInputPlaceholder("чч:мм")}
            onBlur={() => setTimeInputPlaceholder("Время")}
            iconActiveXml={clockActive}
            style={{ marginRight: 10 }}
            maxLength={5}
            isInput
            value={time}
            onChangeText={onTimeChange}
          />
        )}
        <FormButton
          title={calendarShown || keyboardHeight > 0 ? "Готово" : "Сохранить"}
          onPress={onSubmit}
        />
      </Animated.View>
    </BottomPopup>
  );
};

export default CalendarPopup;
