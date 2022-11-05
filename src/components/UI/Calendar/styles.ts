import { lineColors } from './../../../styles/global/colors';
import { StyleSheet } from "react-native";

export const calendarStyles = StyleSheet.create({
  container: {
  },
  calendarItem: {
  },
  title: {
    marginLeft: 20,
    marginBottom: 25,
  },
  item: {
    minWidth: 30,
    textAlign: "center",
  },
  weekDaysContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  daysContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  srollView: {
  }
})