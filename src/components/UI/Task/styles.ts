import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";
import { regularBorderRadius } from '../../../styles/global/borderRadiuses';

export const taskStyles = StyleSheet.create({
  container: {
    backgroundColor: cardColors.white,
    borderRadius: regularBorderRadius,
    paddingHorizontal: 15,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    minHeight: 60,
  },
  title: {
    // marginLeft: 10,
    lineHeight: 20,
    paddingRight: 20,
  },
  subTitle: {
    marginTop: 7,
    // marginLeft: 10,
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