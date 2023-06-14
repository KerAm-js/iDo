import { TaskData } from "../redux/types/popups";
import { LanguageType } from "../redux/types/prefs";
import { TaskType } from "../redux/types/task";
import { languageTexts } from "./languageTexts";

export const checkIsTaskEdited = (
  taskToEdit: TaskType,
  {
    task,
    description,
    taskData,
  }: { task: string; description: string; taskData: TaskData }
) => {
  return (
    task === taskToEdit.task &&
    description === taskToEdit.description &&
    taskData?.time === taskToEdit.time &&
    taskData?.remindTime === taskToEdit.remindTime &&
    taskData?.isRegular === !!taskToEdit.isRegular
  );
};

export const getReminderItemTitle = (
  language: LanguageType,
  counter: number,
  period: "minute" | "hour" | "day" | "week"
) => {
  let word = "";

  const declinationObject = languageTexts.periodsDeclination;
  const lastNumber = Number(counter.toString()[-1]);
  if (counter === 1 || (counter > 20 && lastNumber === 1)) {
    word = declinationObject.one[period][language];
  } else if (
    (counter > 1 && counter < 5) ||
    (counter > 20 && lastNumber > 1 && lastNumber < 5)
  ) {
    word = declinationObject.lessThan5[period][language];
  } else {
    word = declinationObject.equalAndMoreThan5[period][language];
  }

  return counter + " " + word;
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
        new Date(item.time || "").valueOf() >
        new Date(task.time || "").valueOf()
    );
    return newTaskIndex === -1
      ? [...timedTasks, task, ...otherTasks]
      : [
          ...timedTasks.slice(0, newTaskIndex),
          task,
          ...timedTasks.slice(newTaskIndex),
          ...otherTasks,
        ];
  } else if (task.time) {
    return [task, ...list];
  } else {
    return [...timedTasks, task, ...otherTasks];
  }
};
