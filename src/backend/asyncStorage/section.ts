import AsyncStorage from "@react-native-async-storage/async-storage";
import { SectionVisibilityValueType } from "../../redux/types/interface";
import { HomePeriodsKeys } from "../../types/global/Periods";
import { PERIODS_LIST } from "../../utils/constants/periods";

export const getSectionsVisibilitiesFromAS = async (): Promise<{[key: string]: SectionVisibilityValueType}> => {
  const obj: {[key: string]: SectionVisibilityValueType} = {};
  for (let i = 0; i < PERIODS_LIST.length; i++) {
    const result = await AsyncStorage.getItem(PERIODS_LIST[i] + "sectionVisibility");
    if (result) {
      obj[PERIODS_LIST[i]] = (JSON.parse(result));
    } else {
      obj[PERIODS_LIST[i]] = {
        list: 1,
        completedList: 1,
      };
    } 
  }
  return obj;
}

export const getSectionVisibilityFromAS = async (
  title: HomePeriodsKeys
): Promise<SectionVisibilityValueType | undefined> => {
  try {
    const visibility = await AsyncStorage.getItem(title + "sectionVisibility");
    if (visibility) {
      return JSON.parse(visibility);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('getSectionVisibilityFromAS', error);
  }
};

export const saveSectionVisibilityToAS = async (
  title: HomePeriodsKeys,
  valueObj: SectionVisibilityValueType
) => {
  try {
    await AsyncStorage.setItem(
      title + "sectionVisibility",
      JSON.stringify(valueObj)
    );
  } catch (error) {
    console.log('saveSectionVisibilityToAS', error);
  }
};
