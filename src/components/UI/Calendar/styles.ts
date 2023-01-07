import { StyleSheet } from "react-native";
import { textColors } from "../../../styles/global/colors";

export const calendarStyles = StyleSheet.create({
  container: {
  },
  calendarItem: {
    minWidth: 34,
    minHeight: 34,
    borderRadius: 17,
    borderColor: textColors.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginLeft: 20,
    marginBottom: 20,
  },
  item: {
    marginTop: 3,
  },
  weekDaysContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  daysContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  srollView: {
  }
})