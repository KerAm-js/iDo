import { TaskType } from "../../components/UI/Task/types";

export const sortTasks = (list: Array<TaskType>): [Array<TaskType>, Array<TaskType>] => {
  const uncompletedList: Array<TaskType> = [];
  const completedList: Array<TaskType> = [];
  list.forEach((task) =>
    task.isCompleted ? completedList.push(task) : uncompletedList.push(task)
  );
  uncompletedList.sort((prev, curr) => {
    if (!prev.time && curr.time) {
      return 1;
    } else if (prev.time && !curr.time) {
      return -1;
    } else if (prev.time && curr.time) {
      const prevTime = new Date(prev.time).valueOf();
      const currTime = new Date(curr.time).valueOf();
      return prevTime - currTime;
    }
    return 0;
  })
  completedList.sort((prev, curr) => {
    const prevCompletedTime = new Date(prev.completingTime || '').valueOf();
    const currCompletedTime = new Date(curr.completingTime || '').valueOf();
    return currCompletedTime - prevCompletedTime;
  })
  return [uncompletedList.concat(completedList), completedList];
};