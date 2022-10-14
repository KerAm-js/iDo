import { StyleSheet } from "react-native";
import { backgroundColors, lineColors } from "../../../../styles/global/colors";

export const checkButtonStyles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: lineColors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  containerFill: {
    backgroundColor: backgroundColors.dark,
    borderColor: backgroundColors.dark,
  }
})