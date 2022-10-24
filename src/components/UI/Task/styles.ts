import { moveTask } from './../../../utils/taskUI';
import { backgroundColors, lineColors, textColors } from './../../../styles/global/colors';
import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";
import { regularBorderRadius } from '../../../styles/global/borderRadiuses';

export const taskStyles = StyleSheet.create({
  container: {
    backgroundColor: cardColors.white,
    borderRadius: regularBorderRadius,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 9,
    justifyContent: 'space-between',
    alignItems: "center",
    minHeight: 64,
  },
  title: {
    lineHeight: 20,
    paddingRight: 20,
  },
  subTitle: {
    marginTop: 7,
  }
})

export const completedMarkerStyles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: cardColors.white,
    borderRadius: 4,
    marginBottom: 10,
    position: 'absolute',
  },
  icon: {
    marginLeft: 2,
  }
})