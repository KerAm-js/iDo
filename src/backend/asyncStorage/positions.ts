import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListObject } from "../../types/global/ListObject";
import { POSITIONS } from "../../utils/constants/asyncStorage";

export const getPositionsFromAS = async (): Promise<ListObject | undefined>=> {
  try {
    const positions = await AsyncStorage.getItem(POSITIONS);
    if (positions) {
      return JSON.parse(positions);
    }
  } catch (error) {
    console.log('getPositionsFromAS');
  }
}

export const savePositions = async (positions: ListObject) => {
  try {
    await AsyncStorage.setItem(POSITIONS, JSON.stringify(positions)); 
  } catch (error) {
    console.log('savePositions', error);
  }
}