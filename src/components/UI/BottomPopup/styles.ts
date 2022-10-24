import { StyleSheet } from "react-native";
import { bigBorderRadius } from "../../../styles/global/borderRadiuses";
import { backgroundColors, lineColors } from "../../../styles/global/colors";

export const bottomPopupStyles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingTop: 30,
    borderTopRightRadius: bigBorderRadius,
    borderTopLeftRadius: bigBorderRadius,
    backgroundColor: backgroundColors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  title: {
    marginBottom: 15,
    marginLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    borderBottomColor: lineColors.grey,
    borderBottomWidth: 1,
    minHeight: 49,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  checkIcon: {
    width: 15,
    height: 12,
  }
})