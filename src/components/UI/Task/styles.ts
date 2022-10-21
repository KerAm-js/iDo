import { lineColors } from './../../../styles/global/colors';
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
    minHeight: 63,
  },
  title: {
    marginBottom: 6,
    lineHeight: 19,
    paddingRight: 20,
  },
})

export const completedMarkerStyles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: lineColors.grey,
    maxWidth: 86,
    borderRadius: 4,
    marginBottom: 10,
    position: 'absolute',
  },
  icon: {
    marginLeft: 2,
  }
})