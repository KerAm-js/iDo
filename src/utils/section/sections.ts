import { GesturePositionsType } from "../../types/global/GesturePositions";
import { EXPIRED, FOR_TODAY, FOR_TOMORROW, FOR_WEEK, TODAY } from "../constants/periods";
import { SwitchPopupStateType } from "../../components/Popups/SwitchPopup/types";
import { SectionsType } from "../../components/screens/Home/types";
import { HomePeriodsKeys } from "../../types/constants";
import { taskListToPositionsObject } from "./gesturePostions";
import { TaskType } from "../../redux/types/task";
import { languageTexts } from "../languageTexts";

export const getSectionListEmptyMessage = (title: HomePeriodsKeys) => {
  let clearListMessage = `Что планируете ${languageTexts["ru"].periods[
    title
  ].toLowerCase()}?`;

  if (title === FOR_TODAY) {
    clearListMessage = `Что делаем ${languageTexts["ru"].periods[
      TODAY
    ].toLowerCase()}?`;
  } else if (title === FOR_TOMORROW) {
    clearListMessage = `Какие планы ${languageTexts["ru"].periods[
      title
    ].toLowerCase()}?`;
  }

  return clearListMessage;
}

export const getSectionTitle = (title: HomePeriodsKeys) => {
  if (title === FOR_WEEK) {
    const currDay = new Date().getDay();
    return currDay === 0 || currDay === 6 ? "nextWeek" : title;
  } else {
    return title;
  }
}

export const sortTasks = (
  list: Array<TaskType>,
  gesturePositions: {value: GesturePositionsType},
  isMultipleDates?: boolean,
): [Array<TaskType>, number, Array<TaskType>] => {
  const uncompletedList: Array<TaskType> = [];
  const completedList: Array<TaskType> = [];
  const forDayList: Array<TaskType> = [];

  list.forEach((task) => {
    if (task.timeType === "day") {
      forDayList.push(task);
    }
    if (task.isCompleted) {
      completedList.push(task);
    } else {
      uncompletedList.push(task);
    }
  });

  const gesturesList = Object.keys(gesturePositions.value);
  const newGesturePositions = taskListToPositionsObject(gesturePositions?.value, forDayList, isMultipleDates);

  uncompletedList.sort((prev, curr) => {
    const prevTime = new Date(prev.time).valueOf();
    const currTime = new Date(curr.time).valueOf();
    if (
      gesturesList.length > 0 &&
      prev.timeType === "day" &&
      curr.timeType === "day" &&
      prevTime === currTime
    ) {
      return newGesturePositions[prev.id] - newGesturePositions[curr.id];
    }
    return prevTime - currTime;
  });

  completedList.sort((prev, curr) => {
    const prevCompletedTime = new Date(prev.completingTime || "").valueOf();
    const currCompletedTime = new Date(curr.completingTime || "").valueOf();
    return currCompletedTime - prevCompletedTime;
  });

  gesturePositions.value = newGesturePositions;

  return [
    uncompletedList.concat(completedList),
    completedList.length,
    forDayList,
  ];
};

export const getSections = (
  periodsState: SwitchPopupStateType,
  tasks: Array<TaskType>
): SectionsType[] => {
  let periods: Array<HomePeriodsKeys> = Object.keys(periodsState).filter(
    (key) => periodsState[key]
  );

  const periodTasks: { [key: string]: SectionsType } = {};

  periods.forEach(
    (period) =>
      (periodTasks[period] = {
        title: period,
        list: [],
      })
  );

  const currDate = new Date();
  const [currWeekDay, currDay, currMonth, currYear] = [
    currDate.getDay(),
    currDate.getDate(),
    currDate.getMonth(),
    currDate.getFullYear(),
  ];

  tasks.forEach((task) => {
    if (new Date(task.time) < new Date() && periodTasks[EXPIRED] ) {
      periodTasks[EXPIRED].list.push(task);
    }
    if (new Date(task.time).getFullYear() - currYear === 0) {
      const time = new Date(task.time);
      const monthDiff = time.getMonth() - currMonth;

      if (monthDiff === 0) {
        const dayDiff = (task.time - currDate.valueOf()) / (1000 * 60 * 60 * 24);
        const isThisWeek = dayDiff < 7;
        const isNextWeek = (currWeekDay === 6 || currWeekDay === 0) && (dayDiff < 9)
        if (dayDiff < 0) {
          return;
        } else if (dayDiff < 1 && periodTasks[FOR_TODAY]) {
          periodTasks[FOR_TODAY].list.push(task);
        } else if (dayDiff < 2 && periodTasks[FOR_TOMORROW]) {
          periodTasks[FOR_TOMORROW].list.push(task);
        } else if ((isThisWeek || isNextWeek) && periodTasks[FOR_WEEK]) {
          periodTasks[FOR_WEEK].list.push(task);
        }
      }
    }
  });

  return Object.values(periodTasks);
};
