import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";
import { regularBorderRadius } from '../../../styles/global/borderRadiuses';

export const taskStyles = StyleSheet.create({
  container: {
    backgroundColor: cardColors.white,
    borderRadius: regularBorderRadius,
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
  },
  title: {
    lineHeight: 20,
    paddingRight: 20,
  },
  subTitle: {
    marginTop: 7,
  },
  textContainer: {
    paddingVertical: 13,
    paddingLeft: 15,
    flex: 1,
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