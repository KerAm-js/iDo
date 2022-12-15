import { GesturePositionsType } from "../../types/global/GesturePositions";
import {
  EXPIRED,
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
  TODAY,
} from "../constants/periods";
import { SwitchPopupStateType } from "../../components/Popups/SwitchPopup/types";
import { SectionsType } from "../../components/screens/Home/types";
import { HomePeriodsKeys } from "../../types/constants";
import { taskListToPositionsObject } from "./gesturePostions";
import { TaskType } from "../../redux/types/task";
import { languageTexts } from "../languageTexts";
import { getDaysDiff } from "../date";
import { LanguageType } from "../../redux/types/prefs";

export const getSectionListEmptyMessage = (title: HomePeriodsKeys, lang: LanguageType) => {
  let clearListMessage = `${languageTexts[lang].sectionEmptyList[FOR_TODAY]} ${languageTexts[lang].periods[
    TODAY
  ].toLowerCase()}?`;

  if (title === FOR_TOMORROW) {
    clearListMessage = `${languageTexts[lang].sectionEmptyList[FOR_TOMORROW]} ${languageTexts[lang].periods[
      title
    ].toLowerCase()}?`;
  } else if (title === FOR_WEEK) {
    clearListMessage = `${languageTexts[lang].sectionEmptyList[FOR_WEEK]} ${languageTexts[lang].periods[
      title
    ].toLowerCase()}?`;
  } else if (title === EXPIRED) {
    clearListMessage = languageTexts[lang].sectionEmptyList[EXPIRED];
  }

  return clearListMessage;
};

export const getSectionTitle = (title: HomePeriodsKeys) => {
  if (title === FOR_WEEK) {
    const currDay = new Date().getDay();
    return currDay === 0 || currDay === 6 ? "nextWeek" : title;
  } else {
    return title;
  }
};

export const sortTasks = (
  list: Array<TaskType>,
  gesturePositions: { value: GesturePositionsType },
  isMultipleDates?: boolean
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
  const newGesturePositions = taskListToPositionsObject(
    gesturePositions?.value,
    forDayList,
    isMultipleDates
  );

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
    const prevCompletedTime = new Date(prev.completionTime || "").valueOf();
    const currCompletedTime = new Date(curr.completionTime || "").valueOf();
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
  let periods: Array<any> = Object.keys(periodsState).filter(
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
    const time = new Date(task.time);
    let timeBound = 7

    if (currWeekDay === 0) {
      timeBound = 8
    } else if (currWeekDay === 6) {
      timeBound = 9
    }

    const isWeeklyTime = task.time < new Date(
      currYear,
      currMonth,
      currDay + timeBound
    ).valueOf() && task.time > new Date().setHours(0, 0, 0, 0);

    if (time < currDate && periodTasks[EXPIRED] && !isWeeklyTime) {
      periodTasks[EXPIRED].list.push(task);
    } else if (isWeeklyTime) {
      const dayDiff = getDaysDiff(currDate, time);
      if (dayDiff < 0) {
        return;
      } else if (dayDiff < 1 && periodTasks[FOR_TODAY]) {
        periodTasks[FOR_TODAY].list.push(task);
      } else if (dayDiff >= 1 && dayDiff < 2 && periodTasks[FOR_TOMORROW]) {
        periodTasks[FOR_TOMORROW].list.push(task);
      } else if (dayDiff >= 2 && periodTasks[FOR_WEEK]) {
        periodTasks[FOR_WEEK].list.push(task);
      }
    }
  });

  return Object.values(periodTasks);
};
