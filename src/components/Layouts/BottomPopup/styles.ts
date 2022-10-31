import { StyleSheet } from "react-native";
import { bigBorderRadius } from "../../../styles/global/borderRadiuses";
import { cardColors, lineColors } from "../../../styles/global/colors";

export const bottomPopupStyles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingTop: 30,
    borderTopRightRadius: bigBorderRadius,
    borderTopLeftRadius: bigBorderRadius,
    backgroundColor: cardColors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
  title: {
    marginBottom: 15,
    marginLeft: 20,
  },
})