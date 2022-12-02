import { StyleSheet } from "react-native";
import { textColors } from "../../../styles/global/colors";

export const screenLayoutStyles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  title: {
    width: 280,
    marginBottom: 10,
    color: textColors.blue,
  },
  headingContainer: {
    marginBottom: 35,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
