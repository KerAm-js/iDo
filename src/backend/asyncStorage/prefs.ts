import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrefsState } from "../../redux/types/prefs";
import { PREFS } from "../../utils/constants/asyncStorage";

export const getPrefsFromAS = async (): Promise<PrefsState | undefined> => {
  try {
    const storedPrefs = await AsyncStorage.getItem(PREFS);
    if (storedPrefs) {
      return JSON.parse(storedPrefs);
    }
  } catch (error) {
    console.log("getPrefsFromAS", error);
  }
};

export const savePrefsToAS = async (prefs: PrefsState) => {
  try {
    await AsyncStorage.setItem(PREFS, JSON.stringify(prefs));
  } catch (error) {
    console.log("savePrefsToAS", error);
  }
};