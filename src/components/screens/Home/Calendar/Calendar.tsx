import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarChoosedDateAction } from "../../../../redux/actions/popupsActions";
import { taskStateSelector } from "../../../../redux/selectors/taskSelector";
import { AppDispatch } from "../../../../redux/types/appDispatch";
import { TaskType } from "../../../../redux/types/task";
import { ListObject } from "../../../../types/global/ListObject";
import { CALENDAR_DAY } from "../../../../utils/constants/periods";
import { isTheSameDate } from "../../../../utils/date";
import Calendar from "../../../UI/Calendar/Calendar";
import Section from "../../../UI/Section/Section";
import ThemeBorder from "../../../UI/Theme/Border/ThemeBorder";
import Options from "./Options";
import { calendarChoosedDateSelector } from "../../../../redux/selectors/popupsSelector";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const { tasks, positions } = useSelector(taskStateSelector);
  const choosedDate = useSelector(calendarChoosedDateSelector);
  const tabBarHeight = useBottomTabBarHeight();

  const updateScreenTitle = useCallback(
    (title: string) =>
      navigation.setOptions({
        title,
      }),
    []
  );

  useEffect(() => {
    return () => {
      dispatch(setCalendarChoosedDateAction(undefined));
    };
  }, []);

  let list: Array<TaskType> = [];
  let listPositions: ListObject = {};
  tasks.forEach((task) => {
    if (choosedDate && isTheSameDate(task.time, choosedDate.valueOf())) {
      list.push(task);
      listPositions[task.id] = positions[task.id];
    }
  });

  const borderStyle = { width: "100%", height: 0.5, marginTop: 5 };

  return (
    <View>
      <Calendar
        setGlobalTitle={updateScreenTitle}
        pastDatesShown
        busynessShown
      />
      <ThemeBorder style={borderStyle} />
      <Options />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20, paddingTop: 25 }}
      >
        <Section
          title={CALENDAR_DAY}
          disableAnimationsTrigger={choosedDate}
          list={list}
          initPositions={listPositions}
        />
        <View style={{ height: tabBarHeight + 275 }} />
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
