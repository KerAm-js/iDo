import React, { FC, useCallback, useEffect, useState } from "react";
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
} from "../../../redux/actions/taskActions";
import { taskStateSelector } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { TimeType } from "../../../redux/types/task";
import { CHOOSE } from "../../../utils/constants/periods";
import {
  extractReminderState,
  reminderStateList,
  toLocaleStateString,
} from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/FormButton";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { reminderPopupStyles } from "./styles";
import { ReminderPopupPropType } from "./types";
import { useKeyboard } from "../../../hooks/useKeyboard";
import ReminderCheckItem from "../../UI/PopupItems/ReminderCheckItem";
import { textColors } from "../../../styles/global/colors";
import { useTimeValidation } from "../../../hooks/useTimeValidation";
import { useTheme } from "@react-navigation/native";
import {
  LangObjectType,
  TextGetterType,
} from "../../../types/global/LangObject";
import { LanguageType } from "../../../redux/types/prefs";

const ReminderPopup: FC<ReminderPopupPropType> = ({
  visible,
  title,
  handleKeyboard,
  setDefaultsFlag,
  hasDeleteButton,
  closePopup,
}) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { taskToEdit, newTaskData, calendarChoosedDate } =
    useSelector(taskStateSelector);
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

  const setDefaults = (defaultTaskTime?: Date, defaultTimeType?: TimeType) => {
    if (newTaskData.remindTime && defaultTaskTime) {
      const state = extractReminderState(
        defaultTaskTime,
        newTaskData.remindTime
      );
      setState(state);
      setDate(new Date(newTaskData.remindTime));
      if (state === CHOOSE) {
        setChooseItemTitleDate(new Date(newTaskData.remindTime));
        setTime(new Date(newTaskData.remindTime).toTimeString().slice(0, 5));
      } else {
        setChooseItemTitleDate(null);
      }
    } else {
      setDate(newTaskData.time ? new Date(newTaskData.time) : new Date());
      setChooseItemTitleDate(null);
      setState("");
      setTime("");
    }
  };

  const addTime = () => {
    const dateCopy = new Date(date.valueOf());
    const hours = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    const isTimeCorrect =
      !(isNaN(hours) && isNaN(minutes)) && time.length === 5;

    const timeType: TimeType = time ? "time" : "day";
    const reminderTime: number =
      state === CHOOSE || (!state && newTaskData.isRegular && isTimeCorrect)
        ? dateCopy.setHours(hours, minutes, 0, 0)
        : dateCopy.valueOf();
    const timeValue: number = isTimeCorrect
      ? dateCopy.setHours(hours, minutes, 0, 0)
      : dateCopy.setHours(23, 59, 59, 999);

    dispatch(updateNewTaskRemindTimeAction(state ? reminderTime : undefined));
  };

  const saveTime = () => {
    if (keyboardHeight > 0) {
      Keyboard.dismiss();
    }
    addTime();
    closePopup();
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
      setTime("");
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
    if (visible && !newTaskData.remindTime) {
      setDefaults();
    }
  }, [visible]);

  useEffect(() => {
    if (
      !newTaskData.remindTime ||
      (!newTaskData.time && !newTaskData.timeType)
    ) {
      setDefaults();
    }
    if (newTaskData.remindTime && newTaskData.time) {
      setDefaults(new Date(newTaskData.time), newTaskData.timeType);
    }
  }, [newTaskData]);

  useEffect(() => {
    if (taskToEdit) {
      setDefaults(new Date(taskToEdit.time), taskToEdit.timeType);
    }
  }, [taskToEdit]);

  useEffect(() => {
    translateX.value = withTiming(calendarShown ? -SCREEN_WIDTH : 0, {
      duration: 300,
    });
  }, [calendarShown]);

  useEffect(() => {
    if (state !== CHOOSE && time) {
      const taskTime = new Date(newTaskData.time || "");
      setState(CHOOSE);
      setDate(new Date(taskTime));
      setChooseItemTitleDate(new Date(taskTime));
    }
  }, [time]);

  useEffect(() => {
    if (!visible && setDefaultsFlag.current) {
      setDefaults();
    }
  }, [setDefaultsFlag.current]);

  const isReminderSetted =
    state !== "" || time !== "" || !!taskToEdit?.remindTime;

  const deleteButtonHandler = () => {
    if (taskToEdit?.remindTime) {
      dispatch(updateNewTaskRemindTimeAction(undefined));
    }
    setDefaults();
  };

  return (
    <BottomPopup
      visible={visible}
      title={title}
      handleKeyboard={handleKeyboard}
      rightButtonTitle={
        hasDeleteButton && isReminderSetted && languageTexts.words.delete
      }
      rightButtonColor={textColors.red}
      onRightButtonPress={
        hasDeleteButton && isReminderSetted && deleteButtonHandler
      }
    >
      <Animated.View style={[reminderPopupStyles.container, containerStyle]}>
        <Animated.View style={[reminderPopupStyles.screen, scrollViewsStyle]}>
          {reminderStateList.map((item) => (
            <ReminderCheckItem
              key={item.id}
              onPress={onItemClick}
              isChecked={state === item.id}
              {...item}
            />
          ))}
          {!newTaskData.isRegular && (
            <DateCheckItem
              title={chooseItemTitleGetter}
              isChecked={state === CHOOSE}
              state={CHOOSE}
              isToggleCalendarShownComponent
              onPress={onItemClick}
            />
          )}
        </Animated.View>

        <View style={[reminderPopupStyles.screen]}>
          {calendarShown && (
            <Animated.View style={[scrollViewsStyle]}>
              <Calendar
                isCardBackgroundColor={true}
                date={date}
                setDate={onDateItemClick}
                pastDatesShown
              />
            </Animated.View>
          )}
        </View>
      </Animated.View>
      <Animated.View
        style={[formButtonWrapperStyle, reminderPopupStyles.buttonsContainer]}
      >
        <FormButton
          title={timeInputPlaceholder}
          placeholder="чч:мм"
          iconXml={clock(
            isTimeExpired && !newTaskData.isRegular && time.length > 0
              ? textColors.red
              : isTimeValid
              ? textColors.blue
              : textColors.grey
          )}
          onBlur={onTimeInputBlur}
          style={{ marginRight: 10 }}
          textColor={
            isTimeExpired && !newTaskData.isRegular && time.length > 0
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
    </BottomPopup>
  );
};

export default ReminderPopup;