import { ListObject } from "./../types/global/ListObject";
import { TaskType } from "../components/UI/Task/types";
import { PositionsObject } from "../types/global/PositionsObject";

export const taskListToObject = (list: Array<TaskType>): ListObject => {
  const object: ListObject = {};
  list.reduce((prev, curr, index): ListObject => {
    prev[curr.id] = { position: index, isCompleted: curr.isCompleted };
    return prev;
  }, object);
  return object;
};

export const taskListToPositionsObject = (
  list: Array<TaskType>
): PositionsObject => {
  const object: PositionsObject = {};
  list.reduce((prev, curr, index): PositionsObject => {
    prev[curr.id] = index;
    return prev;
  }, object);
  return object;
};

export const listObjectToPositionsObject = (
  list: ListObject
): PositionsObject => {
  'worklet';
  const newPositionState: PositionsObject = {};
  for (let id in list) {
    newPositionState[id] = list[id].position
  }
  return newPositionState;
}

export const taskObjectToPositionsList = (list: ListObject): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]?.position] = id;
  }
  return arr;
};

export const positionsObjectToList = (list: PositionsObject): Array<string> => {
  const arr = [];
  for (let id in list) {
    arr[list[id]] = id;
  }
  return arr;
};

export const getNewTaskPosition = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number
) => {
  "worklet";
  const newTop = Math.round(translateY / itemHeight) * itemHeight;
  return Math.max(lowerBound, Math.min(newTop, upperBound * itemHeight));
};

export const getInsideLayoutTranslationY = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number
) => {
  "worklet";
  const newLowerBound = lowerBound * itemHeight - 15;
  const newUpperBound = upperBound * itemHeight + 5;
  return Math.max(newLowerBound, Math.min(translateY, newUpperBound));
};

export const moveTask = (
  listObject: ListObject,
  from: number,
  to: number
): ListObject => {
  "worklet";
  const newObject: ListObject = {};

  for (let id in listObject) {
    newObject[id] = {...listObject[id]}
    if (listObject[id].position === from) newObject[id].position = to;
    if (listObject[id].position === to) newObject[id].position = from;
  }

  // for (let id in listObject) {
  //   if (listObject[id].position === from) {
  //     newObject[id].position = to;
  //   }

  //   if (listObject[id].position === to) {
  //     newObject[id].position = from;
  //   }
  // }
  // Object.keys(newObject).forEach(key => {
  //   if (newObject[key].position !== listObject[key].position) {
  //     console.log(true);
  //   } else {
  //     console.log(false);
  //   }
  // })
  return newObject;
};

export const moveCompletedTask = (
  listObject: ListObject,
  id: string,
  from: number,
  to: number
): ListObject => {
  "worklet";
  const keys: Array<string> = taskObjectToPositionsList(listObject);
  for (let i = from; i < to; i++) {
    const curr = keys[i];
    const next = keys[i + 1];
    keys[i] = next;
    keys[i + 1] = curr;
  }
  const obj: ListObject = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = { ...listObject[keys[i]], position: i };
  }
  obj[id].isCompleted = true;
  return obj;
};

export const moveUncompletedTask = (
  listObject: ListObject,
  positionsState: PositionsObject,
  id: string,
  upperBound: number
): ListObject => {
  "worklet";

  const uncompletedList: Array<string> = [];
  const completedList: Array<string> = [];

  Object.keys(listObject).forEach(key => {
    if (key === id) {
      uncompletedList.push(key);
    } else if (listObject[key].isCompleted ) {
      completedList.push(key);
    } else {
      uncompletedList.push(key);
    }
  })

  console.log(uncompletedList.length);
  console.log(completedList.length);
  uncompletedList?.sort((prev, curr) => positionsState[prev] - positionsState[curr]);

  const obj: ListObject = {};

  for (let i = 0; i < uncompletedList.length; i++) {
    const key = uncompletedList[i];
    obj[key] = { position: i, isCompleted: false };
  }

  for (let i = 0; i < completedList.length; i++) {
    const key = completedList[i];
    obj[key] = { position: i + uncompletedList.length, isCompleted: true };
  }

  return obj;
};
