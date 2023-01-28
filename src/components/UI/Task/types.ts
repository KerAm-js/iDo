import { ViewStyle } from "react-native";
import { HomePeriodsKeys } from "../../../types/global/Periods";
import { TaskType } from "./../../../redux/types/task";

export type TaskPropTypes = {
  taskObject: TaskType;
  sectionType?: HomePeriodsKeys;
  rStyle?: ViewStyle;
  completeTask: (task: TaskType) => void;
};

export type CompletedMarkerPropTypes = {
  onPress: () => void;
  completedListOpacity: { value: number };
  top: { value: number };
  opacity: { value: number };
};
