import React, { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { clock } from "../../../../assets/icons/clock";
import {
  updateNewTaskRemindTimeAction,
  updateNewTaskTimeAction,
} from "../../../redux/actions/taskActions";
import { taskSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { TimeType } from "../../../redux/types/task";
import { CHOOSE, TODAY, TOMORROW } from "../../../utils/constants/periods";
import { extractCalendarState, getDate, isToday } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/FormButton";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { calendarPopupStyles } from "./styles";
import { CalendarPopupPropType } from "./types";
import { useKeyboard } from "../../../hooks/useKeyboard";
import ReminderCheckItem from "../../UI/PopupItems/ReminderCheckItem";
import { textColors } from "../../../styles/global/colors";
import { useTimeValidation } from "../../../hooks/useTimeValidation";

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
  {
    id: "4",
    weeks: 1,
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
  const { taskToEdit, newTaskData } = useSelector(taskSelector);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime, onTimeChange, isTimeExpired] = useTimeValidation(date);
  const [state, setState] = useState<string>();
  const [calendarShown, setCalendarShown] = useState<boolean>(false);
  const [timeInputPlaceholder, setTimeInputPlaceholder] =
    useState<string>("Время");
  const [chooseItemTitle, setChooseItemTitle] = useState<string>(
    texts.words[CHOOSE]
  );

  const currDate = new Date();
  const tomorrowDate = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() + 1
  );

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const keyboardHeight = useKeyboard();

  const translateX = useSharedValue(0);
  const translateFormButtonY = useSharedValue(keyboardHeight > 0 ? keyboardHeight - 30 : 0);

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

  const updateChoosedTitle = (newDate: Date) => {
    const isCurrYear = currDate.getFullYear() === newDate.getFullYear();
    const dateText = getDate("ru", { date: newDate }).date;
    setChooseItemTitle(
      isCurrYear ? dateText : dateText + ", " + date.getFullYear()
    );
  };

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
      setState("0");
      setDate(newTaskData.time ? new Date(newTaskData.time) : new Date());
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

      if (state === CHOOSE) {
        updateChoosedTitle(date);
      } else {
        setChooseItemTitle(texts.words[CHOOSE]);
      }

      if (defaultDate && defaultTimeType) {
        addTime(defaultDate, time);
      }
    }
  };

  const addTime = (date: Date, time: string) => {
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
    if (isReminderChoosing) {
      dispatch(updateNewTaskRemindTimeAction(date.valueOf()));
    } else {
      dispatch(updateNewTaskTimeAction(taskTime.valueOf(), timeType));
    }
  };

  const saveTime = () => {
    if (keyboardHeight > 0) {
      Keyboard.dismiss();
    }
    addTime(date, time);
    closePopup();
  };

  const onItemClick = (state: string, newDate: Date) => {
    if (state === CHOOSE) {
      if (calendarShown) {
        setCalendarShown(false);
      } else {
        setCalendarShown(true);
        updateChoosedTitle(date);
      }
    } else {
      setChooseItemTitle(texts.words[CHOOSE]);
      setCalendarShown(false);
      setDate(newDate);
      if (isReminderChoosing) {
        setTime("");
      }
    }
    setState(state);
  };

  const onSubmit = () => {
    if (keyboardHeight) {
      Keyboard.dismiss();
    } else if (calendarShown) {
      setCalendarShown(false);
    } else {
      saveTime();
    }
  };

  const onDateItemClick = (newDate: Date) => {
    setDate(newDate);
    updateChoosedTitle(newDate);
  };

  useEffect(() => {
    translateFormButtonY.value = withTiming(
      keyboardHeight > 0 ? keyboardHeight - 30 : 0,
      { duration: keyboardHeight > 0 ? 300 : 200 }
    );
  }, [keyboardHeight]);

  useEffect(() => {
    translateFormButtonY.value = 0;
    if (isReminderChoosing) {
      setDefaults();
    }
  }, [visible]);

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
    if (!newTaskData.time && !newTaskData.timeType) {
      setDefaults();
    }
  }, [newTaskData]);

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
                onPress={(newDate: Date) => onItemClick(item.id, newDate)}
                isChecked={state === item.id}
                {...item}
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
            <Calendar date={date} setDate={onDateItemClick} />
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View
        style={[formButtonWrapperStyle, calendarPopupStyles.buttonsContainer]}
      >
        <FormButton
          title={timeInputPlaceholder}
          iconXml={timeInputPlaceholder === "Время" ? clock(textColors.grey) : undefined}
          onFocus={() => setTimeInputPlaceholder("чч:мм")}
          onBlur={() => setTimeInputPlaceholder("Время")}
          iconActiveXml={clock(textColors.blue)}
          style={{ marginRight: 10 }}
          textColor={isTimeExpired ? textColors.red : time.length === 5 ? textColors.blue : textColors.black}
          maxLength={5}
          isInput
          value={time}
          onChangeText={onTimeChange}
        />
        <FormButton
          title={calendarShown || keyboardHeight > 0 ? "Готово" : "Сохранить"}
          onPress={onSubmit}
        />
      </Animated.View>
    </BottomPopup>
  );
};

export default CalendarPopup;
