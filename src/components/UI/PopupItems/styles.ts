import { StyleSheet } from "react-native";
import { lineColors } from "../../../styles/global/colors";

export const bottomPopupStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    borderBottomColor: lineColors.grey,
    borderBottomWidth: 1,
    minHeight: 49,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})