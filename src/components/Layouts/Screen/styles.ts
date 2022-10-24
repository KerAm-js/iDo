import { StyleSheet } from "react-native";
import { backgroundColors } from "../../../styles/global/colors";

export const screenLayoutStyles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColors.white,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  title: {
    width: 280,
    marginBottom: 10,
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
