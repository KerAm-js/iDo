import { SwitchPopupStateType } from "./../components/Popups/SwitchPopup/types";
import { SectionsType } from "./../components/screens/Home/types";
import { TaskType } from "./../components/UI/Task/types";
import { getLastDateOfCurrentMonth } from "./date";
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "./constants";
import { HomePeriodsKeys } from "../types/constants";

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
        } else if (
          !isThisWeek &&
          lastDayOfTheMonth - currDay > 0 &&
          periodTasks[FOR_MONTH]
        ) {
          periodTasks[FOR_MONTH].list.push(task);
        }
      }
    } else if (periodTasks[FOR_TODAY]) {
      periodTasks[FOR_TODAY].list.push(task);
    }
  });

  return Object.values(periodTasks);
};

export const addTaskWithSorting = (
  task: TaskType,
  list: Array<TaskType>
): Array<TaskType> => {
  const timedTasks: Array<TaskType> = [];
  const otherTasks: Array<TaskType> = [];

  list.forEach((item) => {
    if (item.time) {
      timedTasks.push(item);
    } else {
      otherTasks.push(item);
    }
  });

  if (task.time && timedTasks.length > 0) {
    const newTaskIndex = timedTasks.findIndex(
      (item) =>
        new Date(item.time || "").valueOf() > new Date(task.time || "").valueOf()
    );
    return newTaskIndex === -1
      ? [...timedTasks, task, ...otherTasks]
      : [
          ...timedTasks.slice(0, newTaskIndex),
          task,
          ...timedTasks.slice(newTaskIndex),
          ...otherTasks
        ];
  } else if (task.time) {
    return [task, ...list];
  } else {
    return [...timedTasks, task, ...otherTasks];
  }
};