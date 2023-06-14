import React, { FC, useCallback, useEffect, useState } from "react";
import { Dimensions, Keyboard, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { clock } from "../../../../assets/icons/clock";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { TimeType } from "../../../redux/types/task";
import { CHOOSE, TODAY, TOMORROW } from "../../../utils/constants/periods";
import { extractCalendarState, toLocaleStateString } from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/FormButton";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { calendarPopupStyles } from "./styles";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { textColors } from "../../../styles/global/colors";
import { useTimeValidation } from "../../../hooks/useTimeValidation";
import { useTheme } from "@react-navigation/native";
import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";
import { LanguageType } from "../../../redux/types/prefs";
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import {
  taskDataSelector,
  taskTimePopupVisibilitySelector,
} from "../../../redux/selectors/popupsSelector";
import {
  setTaskTimeAction,
  setTimePopupVisibleAction,
} from "../../../redux/actions/popupsActions";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";

const CalendarPopup = () => {
  const visible = useSelector(taskTimePopupVisibilitySelector);
  const dispatch: AppDispatch = useDispatch();

  const close = () => {
    dispatch(setTimePopupVisibleAction(false));
  };

  return (
    <ModalLayout visible={visible} close={close}>
      <BottomPopup
        visible={visible}
        title={languageTexts.popupTitles.dateOfCompletion}
      >
        <Content visible={visible} />
      </BottomPopup>
    </ModalLayout>
  );
};

const Content: FC<{ visible: boolean }> = ({ visible }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { autoReminder } = useSelector(prefsSelector);
  const taskData = useSelector(taskDataSelector);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime, onTimeChange, isTimeValid, isTimeExpired] =
    useTimeValidation(date);
  const [state, setState] = useState<string>();
  const [calendarShown, setCalendarShown] = useState<boolean>(false);
  const [timeInputPlaceholder, setTimeInputPlaceholder] = useState<
    TextGetterType | LangObjectType
  >(languageTexts.words.time);
  const [chooseItemTitleDate, setChooseItemTitleDate] = useState<Date | null>(
    null
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
  const translateFormButtonY = useSharedValue(
    keyboardHeight > 0 ? keyboardHeight - 30 : 0
  );

  const itemsWrapperStyle = useAnimatedStyle(() => {
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

  const chooseItemTitleGetter = useCallback(
    (language: LanguageType) => {
      if (chooseItemTitleDate) {
        return toLocaleStateString({
          language,
          dateValue: chooseItemTitleDate?.valueOf(),
          timeType: "day",
        });
      }
      return languageTexts.words[CHOOSE][language];
    },
    [chooseItemTitleDate]
  );

  const setDefaults = (defaultTaskTime: Date, defaultTimeType: TimeType) => {
    const state = defaultTaskTime
      ? extractCalendarState(defaultTaskTime)
      : TODAY;
    const newTime =
      defaultTimeType === "time"
        ? defaultTaskTime.toTimeString().slice(0, 5)
        : "";
    setTime(newTime);
    setState(state);
    setDate(defaultTaskTime);
    setCalendarShown(false);

    if (state === CHOOSE) {
      setChooseItemTitleDate(
        defaultTaskTime ? new Date(defaultTaskTime) : date
      );
    } else {
      setChooseItemTitleDate(null);
    }
  };

  const addTime = () => {
    const dateCopy = new Date(date.valueOf());
    const hours = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    const isTimeCorrect =
      !(isNaN(hours) && isNaN(minutes)) && time.length === 5;

    const timeType: TimeType = time ? "time" : "day";
    const timeValue: number = isTimeCorrect
      ? dateCopy.setHours(hours, minutes, 0, 0)
      : dateCopy.setHours(23, 59, 59, 999);

    if (timeValue.valueOf() !== taskData?.time && state) {
      dispatch(setTaskTimeAction(timeValue, timeType, autoReminder));
    }
  };

  const saveTime = () => {
    if (keyboardHeight > 0) {
      Keyboard.dismiss();
    }
    addTime();
    dispatch(setTimePopupVisibleAction(false));
  };

  const onItemClick = (newState: string, newDate?: Date) => {
    if (newState === CHOOSE) {
      if (calendarShown) {
        setCalendarShown(false);
      } else {
        setCalendarShown(true);
        setChooseItemTitleDate(date);
      }
    } else if (newDate) {
      setChooseItemTitleDate(null);
      setCalendarShown(false);
      setDate(newDate);
    }
    setState(newState);
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
    setChooseItemTitleDate(newDate);
  };

  const onTimeInputBlur = () =>
    setTimeInputPlaceholder(languageTexts.words.time);

  useEffect(() => {
    translateFormButtonY.value = withTiming(
      keyboardHeight > 0 ? keyboardHeight - 30 : 0,
      { duration: keyboardHeight > 0 ? 300 : 200 }
    );
  }, [keyboardHeight]);

  useEffect(() => {
    translateFormButtonY.value = 0;
    const newDate = new Date(taskData.time);
    const hours = time.split(":");
    const currentDate = new Date(date.valueOf()).setHours(
      Number(hours[0]),
      Number(hours[1])
    );
    if (visible && newDate.valueOf() !== currentDate) {
      setDefaults(newDate, taskData.timeType);
    }
  }, [visible]);

  useEffect(() => {
    translateX.value = withTiming(calendarShown ? -SCREEN_WIDTH : 0, {
      duration: 300,
    });
  }, [calendarShown]);

  return (
    <>
      <Animated.View style={[calendarPopupStyles.container, containerStyle]}>
        <Animated.View style={[calendarPopupStyles.screen, itemsWrapperStyle]}>
          <DateCheckItem
            title={languageTexts.periods[TODAY]}
            date={currDate}
            isChecked={state === TODAY}
            state={TODAY}
            onPress={onItemClick}
          />
          <DateCheckItem
            title={languageTexts.periods[TOMORROW]}
            date={tomorrowDate}
            isChecked={state === TOMORROW}
            state={TOMORROW}
            onPress={onItemClick}
          />
          <DateCheckItem
            title={chooseItemTitleGetter}
            isChecked={state === CHOOSE}
            state={CHOOSE}
            isToggleCalendarShownComponent
            onPress={onItemClick}
          />
        </Animated.View>
        <View style={[calendarPopupStyles.screen]}>
          {calendarShown && (
            <Animated.View style={[itemsWrapperStyle]}>
              <Calendar
                isCardBackgroundColor={true}
                date={date}
                setDate={onDateItemClick}
                pastDatesShown
                busynessShown
              />
            </Animated.View>
          )}
        </View>
      </Animated.View>
      <Animated.View
        style={[formButtonWrapperStyle, calendarPopupStyles.buttonsContainer]}
      >
        <FormButton
          title={timeInputPlaceholder}
          placeholder="чч:мм"
          iconXml={clock(
            isTimeExpired && !taskData?.isRegular && time.length > 0
              ? textColors.red
              : isTimeValid
              ? textColors.blue
              : textColors.grey
          )}
          onBlur={onTimeInputBlur}
          style={{ marginRight: 10 }}
          textColor={
            isTimeExpired && !taskData?.isRegular && time.length > 0
              ? textColors.red
              : time.length === 5
              ? textColors.blue
              : theme.colors.text
          }
          maxLength={5}
          isInput
          value={time}
          onChangeText={onTimeChange}
        />
        <FormButton
          title={
            calendarShown || keyboardHeight > 0
              ? languageTexts.words.done
              : languageTexts.words.save
          }
          onPress={onSubmit}
        />
      </Animated.View>
    </>
  );
};

export default CalendarPopup;
