import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation, useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { updateNewTaskTimeAction, setDefaultNewTaskDataAction, chooseCalendarDate } from "../../../redux/actions/taskActions";
import { getLanguage } from "../../../redux/selectors/prefsSelectors";
import { getGesturePositions, getTasks } from "../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { CALENDAR_DAY } from "../../../utils/constants/periods";
import { isTheSameDate, toMonthYearString } from "../../../utils/date";
import Calendar from "../../UI/Calendar/Calendar";
import Section from "../../UI/Section/Section";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const gesturePositions = useSelector(getGesturePositions);
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
    dispatch(chooseCalendarDate(date.setHours(23, 59, 59, 999)));
    dispatch(updateNewTaskTimeAction(date.setHours(23, 59, 59, 999), 'day'));
    return () => {
      dispatch(chooseCalendarDate(undefined));
      dispatch(setDefaultNewTaskDataAction());
    }
  }, [date])

  return (
    <View>
      <Calendar
        date={date}
        setDate={setDate}
        setGlobalTitle={updateScreenTitle}
      />
      <View
        style={{
          height: 1,
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
          list={tasks.filter(task => isTheSameDate(task.time, date.valueOf()))}
          initialGesturePositions={gesturePositions}
        />
        <View style={{ height: tabBarHeight + 275 }} />
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;