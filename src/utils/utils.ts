import { SwitchPopupStateType } from './../components/Popups/SwitchPopup/types';
import { SectionsType } from './../components/screens/Home/types';
import { TaskType } from "./../components/UI/Task/types";
import { getLastDateOfCurrentMonth } from "./date";
import { FOR_MONTH, FOR_TODAY, FOR_TOMORROW, FOR_WEEK } from "./constants";
import { HomePeriodsKeys } from '../types/constants';

export const getSections = (
  periodsState: SwitchPopupStateType,
  tasks: Array<TaskType>
): SectionsType[] => {
  let periods: Array<HomePeriodsKeys> = Object.keys(periodsState).filter(key => periodsState[key]);

  const periodTasks: {[key: string]: SectionsType} = {};

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

    if (task?.time && task.time.getFullYear() - currYear === 0) {
      const monthDiff = task.time.getMonth() - currMonth;

      if (monthDiff === 0) {
        const dayDiff = task.time.getDate() - currDay;
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
        } else if (!isThisWeek && lastDayOfTheMonth - currDay > 0 && periodTasks[FOR_MONTH]) {
          periodTasks[FOR_MONTH].list.push(task);
        }
      }
    } else if (periodTasks[FOR_TODAY]) {
      periodTasks[FOR_TODAY].list.push(task);
    }
  });

  return Object.values(periodTasks);
};
