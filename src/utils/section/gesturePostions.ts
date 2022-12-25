import { GesturePositionsType } from "./../../types/global/GesturePositions";
import { ListObject } from "../../types/global/ListObject";
import { TaskType } from "../../redux/types/task";

export const taskListToPositionsObject = (
  gesturePositions: GesturePositionsType,
  tasks: Array<TaskType>,
): GesturePositionsType => {
  const object: GesturePositionsType = {};
  const gesturePositionsList = Object.keys(gesturePositions);
  const changingType = tasks.length - gesturePositionsList.length;

  if (gesturePositionsList.length === 0) {
    tasks.forEach((task, index) => (object[task.id] = index));
    return object;
  }

  if (changingType === 0) {
    return gesturePositions;
  } else if (changingType > 0) {
    const addedTasks: Array<TaskType> = [];
    const prevTasks: Array<TaskType> = [];

    tasks.forEach((task) => {
      if (gesturePositions[task.id] === undefined) {
        addedTasks.push(task);
      } else {
        prevTasks.push(task);
      }
    });

    prevTasks.sort((prev, curr) => {
      return gesturePositions[prev.id] - gesturePositions[curr.id];
    });

    let indexOfAddedTask = prevTasks.findIndex(
      (task) => task.time === addedTasks[0].time
    );
    if (indexOfAddedTask === -1) {
      indexOfAddedTask = 0;
    }

    [
      ...prevTasks.slice(0, indexOfAddedTask),
      addedTasks[0],
      ...prevTasks.slice(indexOfAddedTask),
    ].forEach((task, index) => {
      object[task.id] = index;
    });
  } else if (changingType < 0) {
    tasks.sort((prev, curr) => {
      return gesturePositions[prev.id] - gesturePositions[curr.id];
    });
    tasks.forEach((task, index) => {
      object[task.id] = index;
    });
  }
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

export const moveGesturePosition = (
  gesturePositions: GesturePositionsType,
  from: number,
  to: number
): GesturePositionsType => {
  "worklet";
  const newObject: GesturePositionsType = {};
  const newPosition = gesturePositions[to];
  const prevPosition = gesturePositions[from];
  const moving = newPosition - prevPosition;

  if (moving === 0) {
    return gesturePositions;
  }

  for (let key in gesturePositions) {
    if (key === from.toString()) {
      newObject[key] = newPosition;
    } else if (key === to.toString()) {
      newObject[key] = prevPosition;
    } else {
      newObject[key] = gesturePositions[key];
    }
  }
  return newObject;
};

export const extractGesturePositionsFromTasksArray = (
  tasks: Array<TaskType>,
  gesturePositions: GesturePositionsType
): GesturePositionsType => {
  const object: GesturePositionsType = {};
  tasks.forEach((task) => {
    object[task.id] = gesturePositions[task.id] || 0;
  });
  return object;
};
