import { TaskType } from "../../components/UI/Task/types";
import { GesturePositionsType } from "../../types/global/GesturePositions";
import { ListObject } from "../../types/global/ListObject";

export const taskListToPositionsObject = (
  list: Array<TaskType>
): GesturePositionsType => {
  const completedList: Array<TaskType> = [];
  const unCompletedList: Array<TaskType> = [];
  list.forEach((task) =>
    task.isCompleted ? completedList.push(task) : unCompletedList.push(task)
  );
  const newList = unCompletedList.concat(completedList);

  const object: GesturePositionsType = {};
  newList.forEach((task: TaskType, index: number) => {
    object[task.id] = index;
  });
  return object;
};

export const taskObjectToPositionsList = (list: ListObject): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]?.position] = id;
  }
  return arr;
};

export const positionsObjectToList = (
  list: GesturePositionsType
): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]] = id;
  }
  return arr;
};