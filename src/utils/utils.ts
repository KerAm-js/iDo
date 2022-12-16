import { LanguageType } from "../redux/types/prefs";
import { TaskType } from "../redux/types/task";
import { languageTexts } from "./languageTexts";

export const getReminderItemTitle = (language: LanguageType, counter: number, period: 'minute' | 'hour' | 'day' | 'week') => {
  let word = '';

  if (language === 'ru') {
    const declinationObject = languageTexts['ru'].periodsDeclination;
    const lastNumber = Number(counter.toString()[-1])
    if (counter === 1 || (counter > 20 && lastNumber === 1)) {
      word = declinationObject.one[period];
    } else if ((counter > 1 && counter < 5) || (counter > 20 && lastNumber > 1 && lastNumber < 5)) {
      word = declinationObject.lessThan5[period];
    } else {
      word = declinationObject.equalAndMoreThan5[period];
    }
  } else if (language === 'ch') {
    word = languageTexts['ch'].periodsDeclination[period];
  } else {
    if (counter === 1) {
      word = languageTexts[language].periodsDeclination.one[period];
    } else {
      word = languageTexts[language].periodsDeclination.moreThanOne[period];
    }
  }

  return counter + ' ' + word.toLowerCase();
}

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