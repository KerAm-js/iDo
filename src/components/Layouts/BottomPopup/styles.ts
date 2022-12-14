import { StyleSheet } from "react-native";
import { bigBorderRadius } from "../../../styles/global/borderRadiuses";

export const bottomPopupStyles = StyleSheet.create({
  container: {
    paddingTop: 30,
    borderTopRightRadius: bigBorderRadius,
    borderTopLeftRadius: bigBorderRadius,
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 100,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
