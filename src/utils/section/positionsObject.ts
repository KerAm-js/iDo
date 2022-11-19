import { ListObject } from "../../types/global/ListObject";
import { GesturePositionsType } from "../../types/global/GesturePositions";
import { TaskType } from "../../redux/types/task";

export const taskListToObject = (list: Array<TaskType>): ListObject => {
  "worklet";
  const object: ListObject = {};
  list.forEach((task: TaskType, index: number) => {
    object[task.id] = {
      position: index,
      isCompleted: task.isCompleted,
      time: task?.time,
      timeType: task.timeType,
    };
  });
  return object;
};

export const listObjectToPositionsObject = (
  list: ListObject
): GesturePositionsType => {
  "worklet";
  const newPositionState: GesturePositionsType = {};
  for (let id in list) {
    newPositionState[id] = list[id].position;
  }
  return newPositionState;
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
): [ListObject, boolean, string] => {
  "worklet";
  const newObject: ListObject = {};
  const fromItem: ListObject = {};
  const toItem: ListObject = {};
  let fromKey = Object.keys(fromItem)[0];
  let toKey = Object.keys(toItem)[0];

  for (let id in listObject) {
    newObject[id] = { ...listObject[id] };
    if (listObject[id].position === from) {
      fromItem[id] = newObject[id];
      fromKey = id;
    } else if (listObject[id].position === to) {
      toItem[id] = newObject[id];
      toKey = id;
    }
  }

  const fromPosition = fromItem[fromKey].position;
  const toPosition = toItem[toKey].position;
  fromItem[fromKey].position = toPosition;
  toItem[toKey].position = fromPosition;

  const isMovingDisabled =
    fromItem[fromKey].timeType === "time" ||
    toItem[toKey].timeType === "time" ||
    fromItem[fromKey].time !== toItem[toKey].time;

  return [newObject, isMovingDisabled, toKey];
};
