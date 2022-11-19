import { TaskType } from "../redux/types/task";


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