import { StyleSheet } from "react-native";
import { regularBorderRadius } from "../../../../styles/global/borderRadiuses";
import { backgroundColors, lineColors } from "../../../../styles/global/colors";

export const checkButtonStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  sqiurcleView: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  containerFill: {
    backgroundColor: backgroundColors.blue,
    borderColor: backgroundColors.blue,
    borderWidth: 0,
  }
})