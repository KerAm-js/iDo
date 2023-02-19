import { StyleSheet } from "react-native";

export const reminderPopupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '200%',
    minHeight: 290,
  },
  screen: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  }
})