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
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  buttonInputsWrapper: {
    flexDirection: 'row'
  },
  buttonInputsSeparator: {
    marginHorizontal: 2,
    color: textColors.grey,
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