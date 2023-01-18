import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNewTaskTimeAction,
  setDefaultNewTaskDataAction,
  chooseCalendarDate,
} from "../../../redux/actions/taskActions";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { getPositions, getTasks } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { TaskType } from "../../../redux/types/task";
import { ListObject } from "../../../types/global/ListObject";
import { CALENDAR_DAY } from "../../../utils/constants/periods";
import { isTheSameDate, toMonthYearString } from "../../../utils/date";
import Calendar from "../../UI/Calendar/Calendar";
import Section from "../../UI/Section/Section";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const positions = useSelector(getPositions);
  const theme = useTheme();
  const tasks = useSelector(getTasks);
  const language = useSelector(getLanguage);
  const [date, setDate] = useState(new Date());
  const tabBarHeight = useBottomTabBarHeight();

  const updateScreenTitle = (title: string) =>
    navigation.setOptions({
      title,
    });

  useEffect(() => {
    navigation.setOptions({
      title: toMonthYearString({ date: new Date(), language }),
    });
  }, [language]);

  useEffect(() => {
    const newDate = new Date(date.valueOf()).setHours(23, 59, 59, 999);
    dispatch(chooseCalendarDate(newDate));
    dispatch(updateNewTaskTimeAction(newDate, "day"));
    return () => {
      dispatch(chooseCalendarDate(undefined));
      dispatch(setDefaultNewTaskDataAction());
    };
  }, [date]);

  let list: Array<TaskType> = [];
  let listPositions: ListObject = {};
  tasks.forEach((task) => {
    if (isTheSameDate(task.time, date.valueOf())) {
      list.push(task);
      listPositions[task.id] = positions[task.id];
    }
  });

  return (
    <View>
      <Calendar
        date={date}
        setDate={setDate}
        setGlobalTitle={updateScreenTitle}
      />
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: theme.colors.border,
          marginTop: 10,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20, paddingTop: 25 }}
      >
        <Section
          title={CALENDAR_DAY}
          disableAnimationsTrigger={date}
          list={list}
          initPositions={listPositions}
        />
        <View style={{ height: tabBarHeight + 275 }} />
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
