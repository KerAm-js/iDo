import { GesturePositionsType } from './../../types/global/GesturePositions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskType } from "../../components/UI/Task/types";
import { ListObject } from "../../types/global/ListObject";
import { GESTURE_POSITIONS } from "../constants/asyncStorage";

export const taskListToPositionsObject = (
  gesturePositions: GesturePositionsType,
  forDayTasks: Array<TaskType>,
  isMultipleDates?: boolean,
): GesturePositionsType => {
  "worklet";
  const object: GesturePositionsType = {};
  const gesturePositionsList = Object.keys(gesturePositions);
  const changingType = forDayTasks.length - gesturePositionsList.length;

  if (gesturePositionsList.length === 0) {
    forDayTasks.forEach((task, index) => object[task.id] = index);
    return object;
  }

  if (changingType === 0) {
    return gesturePositions;
  } else if (changingType > 0) {
    const addedTasks: Array<TaskType> = [];
    const prevTasks: Array<TaskType> = [];

    forDayTasks.forEach(task => {
      if (gesturePositions[task.id] === undefined) {
        addedTasks.push(task);
      } else {
        prevTasks.push(task);
      }
    })

    prevTasks.sort((prev, curr) => {
      return gesturePositions[prev.id] - gesturePositions[curr.id];
    });

    if (isMultipleDates) {
      let indexOfAddedTask = prevTasks.findIndex(task => task.time === addedTasks[0].time);
      if (indexOfAddedTask === -1) {
        indexOfAddedTask = 0;
      }

      [...prevTasks.slice(0, indexOfAddedTask), addedTasks[0], ...prevTasks.slice(indexOfAddedTask)].forEach((task, index) => {
        object[task.id] = index;
      });
    } else {
      [addedTasks[0], ...prevTasks].forEach((task, index) => {
        object[task.id] = index;
      });
    }

  } else if (changingType < 0) {
    forDayTasks.sort((prev, curr) => {
      return gesturePositions[prev.id] - gesturePositions[curr.id];
    });
    forDayTasks.forEach((task, index) => {
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
  from: string,
  to: string
): GesturePositionsType => {
  "worklet";
  const newObject: GesturePositionsType = {};
  const newPosition = gesturePositions[to];
  const prevPosition = gesturePositions[from];
  const moving = newPosition - prevPosition;

  if (moving === 0) {
    return gesturePositions;
  } else if (moving < 0) {
    for (let key in gesturePositions) {
      const position = gesturePositions[key];
      if (key === from) {
        newObject[key] = gesturePositions[to];
      } else if (position >= newPosition && position < prevPosition) {
        newObject[key] = gesturePositions[key] + 1;
      } else {
        newObject[key] = gesturePositions[key];
      }
    }
  } else {
    for (let key in gesturePositions) {
      const position = gesturePositions[key];
      if (key === from) {
        newObject[key] = gesturePositions[to];
      } else if (position <= newPosition && position > prevPosition) {
        newObject[key] = gesturePositions[key] - 1;
      } else {
        newObject[key] = gesturePositions[key];
      }
    }
  }

  return newObject;
};

export const saveGesturePositions = async (
  gesturePositions: GesturePositionsType
) => {
  try {
    await AsyncStorage.setItem(
      GESTURE_POSITIONS,
      JSON.stringify(gesturePositions)
    );
  } catch (e) {
    console.log(e);
  }
};

export const getGesturePositionsFromAS = async (): Promise<
  GesturePositionsType | undefined
> => {
  try {
    const result = (await AsyncStorage.getItem(GESTURE_POSITIONS)) || "";
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
  }
};
