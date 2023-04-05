import React, { useCallback, useEffect, useState } from "react";
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
import { CHOOSE } from "../../../utils/constants/periods";
import {
  extractReminderState,
  reminderStateObject,
  toLocaleStateString,
} from "../../../utils/date";
import { languageTexts } from "../../../utils/languageTexts";
import BottomPopup from "../../Layouts/BottomPopup/BottomPopup";
import Calendar from "../../UI/Calendar/Calendar";
import FormButton from "../../UI/PopupItems/FormButton";
import DateCheckItem from "../../UI/PopupItems/DateCheckItem";
import { reminderPopupStyles } from "./styles";
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
import ModalLayout from "../../Layouts/Modal/ModalLayout";
import {
  setReminderPopupVisibleAction,
  setTaskRemindTimeAction,
} from "../../../redux/actions/popupsActions";
import {
  addTaskPopupVisibilitiesSelector,
  taskDataSelector,
  taskReminderPopupVisibilitySelector,
  taskToEditSelector,
} from "../../../redux/selectors/popupsSelector";

const ReminderPopup = () => {
  const visible = useSelector(taskReminderPopupVisibilitySelector);
  const dispatch: AppDispatch = useDispatch();

  const deleteButtonHandler = () => {
    dispatch(setTaskRemindTimeAction(undefined));
  };

  const close = () => {
    dispatch(setReminderPopupVisibleAction(false));
  };

  return (
    <ModalLayout visible={visible} close={close}>
      <BottomPopup
        visible={visible}
        title={languageTexts.popupTitles.reminder}
        rightButtonTitle={languageTexts.words.clear}
        rightButtonColor={textColors.red}
        onRightButtonPress={deleteButtonHandler}
      >
        <Content />
      </BottomPopup>
    </ModalLayout>
  );
};

const Content = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const addTaskPopupVisibilities = useSelector(
    addTaskPopupVisibilitiesSelector
  );
  const taskData = useSelector(taskDataSelector);
  const taskToEdit = useSelector(taskToEditSelector);
  const visible = !!addTaskPopupVisibilities?.reminder;
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

  const setDefaults = (defaultTaskTime?: Date) => {
    if (taskData?.remindTime && defaultTaskTime) {
      const reminderState = extractReminderState(
        defaultTaskTime,
        taskData?.remindTime
      );
      setState(reminderState.id);
      setDate(new Date(taskData?.remindTime));
      if (reminderState.id === CHOOSE) {
        setChooseItemTitleDate(new Date(taskData?.remindTime));
        setTime(new Date(taskData?.remindTime).toTimeString().slice(0, 5));
      } else {
        setChooseItemTitleDate(null);
      }
    } else {
      setDate(taskData?.time ? new Date(taskData?.time) : new Date());
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

    const reminderTime: number =
      state === CHOOSE || (!state && taskData?.isRegular && isTimeCorrect)
        ? dateCopy.setHours(hours, minutes, 0, 0)
        : dateCopy.valueOf();

    dispatch(setTaskRemindTimeAction(state ? reminderTime : undefined));
  };

  const saveTime = () => {
    if (keyboardHeight > 0) {
      Keyboard.dismiss();
    }
    addTime();
    dispatch(setReminderPopupVisibleAction(false));
  };

  const onItemClick = (newState: string, newDate: Date | undefined) => {
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
    if (visible && !taskData?.remindTime) {
      setDefaults();
    }
  }, [visible]);

  useEffect(() => {
    if (!taskData?.remindTime || (!taskData?.time && !taskData?.timeType)) {
      setDefaults();
    }
    if (taskData?.remindTime && taskData?.time) {
      setDefaults(new Date(taskData?.time));
    }
  }, [taskData]);

  useEffect(() => {
    if (taskToEdit) {
      setDefaults(new Date(taskToEdit.time));
    }
  }, [taskToEdit]);

  useEffect(() => {
    translateX.value = withTiming(calendarShown ? -SCREEN_WIDTH : 0, {
      duration: 300,
    });
  }, [calendarShown]);

  useEffect(() => {
    if (state !== CHOOSE && time) {
      const taskTime = new Date(taskData?.time || "");
      setState(CHOOSE);
      setDate(new Date(taskTime));
      setChooseItemTitleDate(new Date(taskTime));
    }
  }, [time]);

  useEffect(() => {
    if (!addTaskPopupVisibilities) setDefaults();
  }, [addTaskPopupVisibilities]);

  return (
    <>
      <Animated.View style={[reminderPopupStyles.container, containerStyle]}>
        <Animated.View style={[reminderPopupStyles.screen, scrollViewsStyle]}>
          {Object.entries(reminderStateObject).map((item) => (
            <ReminderCheckItem
              key={item[0]}
              id={item[0]}
              onPress={onItemClick}
              isChecked={state === item[0]}
              {...item[1]}
            />
          ))}
          {!taskData?.isRegular && (
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

export default ReminderPopup;
