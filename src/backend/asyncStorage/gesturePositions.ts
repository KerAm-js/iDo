import { PERIODS_LIST } from "./../../utils/constants/periods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GesturePositionsType } from "../../types/global/GesturePositions";
import { GESTURE_POSITIONS } from "../../utils/constants/asyncStorage";
import { HomePeriodsKeys } from "../../types/global/Periods";

export const deleteGesturePosition = async (id: number) => {
  try {
    const storedGesturePositions = await getGesturePositionsFromAS();
    if (storedGesturePositions) {
      delete storedGesturePositions[id];
      await AsyncStorage.setItem(
        GESTURE_POSITIONS,
        JSON.stringify(storedGesturePositions)
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveGesturePositions = async (
  gesturePositions: GesturePositionsType,
  period: HomePeriodsKeys
) => {
  try {
    await AsyncStorage.setItem(period, JSON.stringify(gesturePositions));
  } catch (e) {
    console.log(e);
  }
};

export const getGesturePositionsFromAS = async (): Promise<
  GesturePositionsType | undefined
> => {
  try {
    let gesturePositions: GesturePositionsType = {};
    for (let i = 0; i < PERIODS_LIST.length; i++) {
      const result = await AsyncStorage.getItem(PERIODS_LIST[i]);
      if (result) {
        gesturePositions = { ...gesturePositions, ...JSON.parse(result) };
      }
    }
    return gesturePositions;
  } catch (e) {
    console.log(e);
  }
};

export const clearASGesturePositions = async () => {
  try {
    await AsyncStorage.removeItem(GESTURE_POSITIONS);
  } catch (e) {
    console.log(e);
  }
};
