import { StyleSheet } from "react-native";

export const calendarPopupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '200%'
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