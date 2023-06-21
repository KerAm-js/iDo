import { StyleSheet } from "react-native";
import { text14, text14LineHeight, textBold } from "../../../styles/global/texts";

export const messageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    minHeight: 40,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 15,
    shadowColor: '#000',
  },
  title: {
    ...text14LineHeight,
    ...textBold,
  },
  titleCenter: {
    ...text14LineHeight,
    ...textBold,
    textAlign: "center"
  },
  text: {
    ...text14,
    lineHeight: 17,
  }
})