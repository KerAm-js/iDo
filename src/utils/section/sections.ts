import { GesturePositionsType } from "../../types/global/GesturePositions";
import { TaskType } from "../../components/UI/Task/types";
import { getLastDateOfCurrentMonth } from "../date";
import {
  FOR_MONTH,
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
} from "../constants/periods";
import { SwitchPopupStateType } from "../../components/Popups/SwitchPopup/types";
import { SectionsType } from "../../components/screens/Home/types";
import { HomePeriodsKeys } from "../../types/constants";

export const sortTasks = (
  list: Array<TaskType>,
  gesturePositions?: GesturePositionsType
): [Array<TaskType>, Array<TaskType>] => {
  const uncompletedList: Array<TaskType> = [];
  const completedList: Array<TaskType> = [];

  list.forEach((task) =>
    task.isCompleted ? completedList.push(task) : uncompletedList.push(task)
  );

  uncompletedList.sort((prev, curr) => {
    const prevTime = new Date(prev.time).valueOf();
    const currTime = new Date(curr.time).valueOf();
    if (
      gesturePositions &&
      prev.timeType === "day" &&
      curr.timeType === "day" &&
      prevTime === currTime
    ) {
      return gesturePositions[prev.id] - gesturePositions[curr.id];
    }
    return prevTime - currTime;
  });

  completedList.sort((prev, curr) => {
    const prevCompletedTime = new Date(prev.completingTime || "").valueOf();
    const currCompletedTime = new Date(curr.completingTime || "").valueOf();
    return currCompletedTime - prevCompletedTime;
  });

  return [uncompletedList.concat(completedList), completedList];
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
  const [currDay, currMonth, currYear] = [
    currDate.getDate(),
    currDate.getMonth(),
    currDate.getFullYear(),
  ];

  tasks.forEach((task) => {
    if (task?.time && new Date(task.time).getFullYear() - currYear === 0) {
      const time = new Date(task.time);
      const monthDiff = time.getMonth() - currMonth;

      if (monthDiff === 0) {
        const dayDiff = time.getDate() - currDay;
        const lastDayOfTheMonth = getLastDateOfCurrentMonth();
        const isThisWeek = dayDiff <= 6 - new Date().getDay();

        if (dayDiff < 0) {
          return;
        } else if (dayDiff === 0 && periodTasks[FOR_TODAY]) {
          periodTasks[FOR_TODAY].list.push(task);
        } else if (dayDiff === 1 && periodTasks[FOR_TOMORROW]) {
          periodTasks[FOR_TOMORROW].list.push(task);
        } else if (isThisWeek && periodTasks[FOR_WEEK]) {
          periodTasks[FOR_WEEK].list.push(task);
        }
      }
    }
  });

  return Object.values(periodTasks);
};
