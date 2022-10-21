import { ListObject } from "./../types/global/ListObject";
import { TaskType } from "../components/UI/Task/types";
import { PositionsObject } from "../types/global/PositionsObject";
import { Value } from "react-native-reanimated";

export const sortTasksByTime = (list: Array<TaskType>): Array<TaskType> => {
  const listCopy = [...list];
  listCopy.sort((prev, curr) => {

    if (!prev.time && curr.time) {
      return 1;
    } else if (prev.time && !curr.time) {
      return -1;
    } else if (prev.time && curr.time) {
      const prevTime = prev.time.valueOf();
      const currTime = curr.time.valueOf();
      return prevTime - currTime;
    }
    return 0;
  })
  return listCopy;
}

export const taskListToObject = (list: Array<TaskType>): ListObject => {
  const object: ListObject = {};
  list.reduce((prev, curr, index): ListObject => {
    prev[curr.id] = { position: index, isCompleted: curr.isCompleted, isTimed: !!curr.time };
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
  const newPosition = Math.round(translateY / itemHeight);
  return Math.max(lowerBound, Math.min(newPosition, upperBound));
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
  const fromItem: ListObject = {};
  const toItem: ListObject = {}
  let fromKey = Object.keys(fromItem)[0];
  let toKey = Object.keys(toItem)[0];
  
  for (let id in listObject) {
    newObject[id] = {...listObject[id]}
    if (listObject[id].position === from) {
      fromItem[id] = newObject[id]
      fromKey = id;
    } else if (listObject[id].position === to) {
      toItem[id] = newObject[id];
      toKey = id;
    };
  }

  if (!fromItem[fromKey].isTimed && !toItem[toKey].isTimed ) {
    const fromPosition = fromItem[fromKey].position;
    const toPosition = toItem[toKey].position;
    fromItem[fromKey].position = toPosition;
    toItem[toKey].position = fromPosition
  }

  return newObject;
};

export const moveCompletedTask = (
  listObject: ListObject,
  id: string,
  from: number,
  upperBound: number
): ListObject => {
  "worklet";
  const keys: Array<string> = taskObjectToPositionsList(listObject);
  for (let i = from; i < upperBound; i++) {
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
  uncompletedList?.sort((prev, curr) => positionsState[prev] - positionsState[curr]);
  const obj: ListObject = {};

  for (let i = 0; i < uncompletedList.length; i++) {
    const key = uncompletedList[i];
    obj[key] = { position: i, isCompleted: false, isTimed: listObject[key].isTimed };
  }

  for (let i = 0; i < completedList.length; i++) {
    const key = completedList[i];
    obj[key] = { position: i + uncompletedList.length, isCompleted: true, isTimed: listObject[key].isTimed };
  }

  return obj;
};
