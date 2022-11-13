import { textColors } from "./../../styles/global/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskType } from "../../components/UI/Task/types";
import { GesturePositionsType } from "../../types/global/GesturePositions";
import { ListObject } from "../../types/global/ListObject";
import { GESTURE_POSITIONS } from "../constants/asyncStorage";
import { sortTasks } from "./sections";

export const sortTasksByTime = (list: Array<TaskType>): [Array<TaskType>] => {
  const result = [...list];

  result.sort((prev, curr) => {
    const prevTime = new Date(prev.time).valueOf();
    const currTime = new Date(curr.time).valueOf();
    return prevTime - currTime;
  });

  return [list];
};

export const taskListToPositionsObject = (
  list: Array<TaskType>,
  gesturePositions?: GesturePositionsType
): GesturePositionsType => {
  const object: GesturePositionsType = {};
  const [sortedList] = sortTasks(list, gesturePositions);

  sortedList.forEach((task: TaskType, index: number) => {
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

export const moveGesturePosition = (
  gesturePositions: GesturePositionsType,
  id: string,
  moving: number
): GesturePositionsType => {
  "worklet";
  const newObject: GesturePositionsType = {};
  if (moving > 0) {
    const newPosition = gesturePositions[id] + 1;
    for (let key in gesturePositions) {
      if (gesturePositions[key] === newPosition) {
        newObject[key] = newPosition - 1;
      } else {
        newObject[key] = gesturePositions[key];
      }
    }
    newObject[id] = newPosition;
  } else {
    const newPosition = gesturePositions[id] - 1;

    for (let key in gesturePositions) {
      if (gesturePositions[key] === newPosition) {
        newObject[key] = newPosition + 1;
      } else {
        newObject[key] = gesturePositions[key];
      }
      newObject[id] = newPosition;
    }
  }

  return newObject;
};

export const updateTaskGesturePosition = (
  gesturePositions: GesturePositionsType,
  id: string,
  moving: number
): GesturePositionsType => {
  "worklet";
  const newGesturePositions: GesturePositionsType = {};
  const prevPosition = gesturePositions[id];
  const currPosition = prevPosition + moving;

  if (moving === 0) {
    return gesturePositions;
  }

  for (let key in gesturePositions) {
    const position = gesturePositions[key];

    if (moving < 0 && position < prevPosition && position >= currPosition) {
      newGesturePositions[key] = position + 1;
    } else if (
      moving > 0 &&
      position > prevPosition &&
      position <= currPosition
    ) {
      newGesturePositions[key] = position - 1;
    } else {
      newGesturePositions[key] = position;
    }
  }
  newGesturePositions[id] = currPosition;
  return newGesturePositions;
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
