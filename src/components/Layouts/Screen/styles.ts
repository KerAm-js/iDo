import { StyleSheet } from "react-native";
import { textColors } from "../../../styles/global/colors";
import { title30 } from "../../../styles/global/texts";

export const screenLayoutStyles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  title: {
    width: 280,
    color: textColors.blue,
    ...title30,
  },
  headingContainer: {
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  }
});
