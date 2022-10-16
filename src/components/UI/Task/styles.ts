import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";

export const taskStyles = StyleSheet.create({
  container: {
    backgroundColor: cardColors.while,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 12,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: "center",
  },
  title: {
    marginBottom: 6,
    lineHeight: 19,
    paddingRight: 20,
  },
  pressable: {
    position: "absolute",
    width: "30%",
    height: "100%",
    zIndex: 1,
  }
})