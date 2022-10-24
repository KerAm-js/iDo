import { StyleSheet } from "react-native";
import { backgroundColors } from "../../../styles/global/colors";

export const modalLayoutStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  backdrop: {
    height: '100%',
    width: '100%',
    backgroundColor: backgroundColors.backdrop,
    alignItems: "center",
    justifyContent: "center",
  }
})