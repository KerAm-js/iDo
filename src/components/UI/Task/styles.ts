import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";

export const taskStyles = StyleSheet.create({
  container: {
    backgroundColor: cardColors.while,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 12,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: "center",
  },
  title: {
    marginBottom: 6,
  },
})