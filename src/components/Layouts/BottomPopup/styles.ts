import { StyleSheet } from "react-native";
import { bigBorderRadius } from "../../../styles/global/borderRadiuses";
import { cardColors } from "../../../styles/global/colors";

export const bottomPopupStyles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
    marginLeft: 20,
  },
})