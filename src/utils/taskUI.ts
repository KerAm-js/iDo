import { TaskType } from "../components/UI/Task/types";
import { dynamicPropObject } from "../types/global/dynamicPropObject";

export const taskListToObject = (list: Array<TaskType>) => {
  const values = list.map((el) => el.id);
  const object: dynamicPropObject<number> = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i]] = i;
  }

  return object;
};

export const getNewTaskPosition = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number,
) => {
  "worklet";
  const newTop = Math.round(translateY / itemHeight) * itemHeight;
  return Math.max(lowerBound, Math.min(newTop, upperBound * itemHeight));
};

export const getInsideLayoutTranslationY = (
  translateY: number,
  lowerBound: number,
  upperBound: number,
  itemHeight: number,
) => {
  'worklet';
  const newLowerBound = (lowerBound * itemHeight) - 15;
  const newUpperBound = (upperBound * itemHeight) + 5;
  return Math.max(newLowerBound, Math.min(translateY, newUpperBound));
}

export const moveTask = (
  listObject: dynamicPropObject<number>,
  from: number,
  to: number
): dynamicPropObject<number> => {
  'worklet';
  const newObject = { ...listObject };

  for (let id in listObject) {
    if (listObject[id] === from) {
      newObject[id] = to;
    }

    if (listObject[id] === to) {
      newObject[id] = from;
    }
  }
  return newObject;
};
