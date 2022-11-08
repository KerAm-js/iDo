import { backgroundColors } from './../../../styles/global/colors';
import { StyleSheet } from "react-native";

export const calendarStyles = StyleSheet.create({
  container: {
  },
  calendarItem: {
    minWidth: 36,
    minHeight: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginLeft: 20,
    marginVertical: 20,
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