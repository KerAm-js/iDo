import { StyleSheet } from "react-native";
import { textColors } from "../../../styles/global/colors";

export const popupItemStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    minHeight: 40,
  },
  buttonContainer: {
    width: '48.5%'
  },
  button: {
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  buttonIcon: {
    marginRight: 5
  },
  buttonTitle: {
    color: textColors.blue,
  },
  calendarIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 10,
  },
  calendarIconText: {
    position: 'absolute',
    top: 7,
  },
  dateItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})