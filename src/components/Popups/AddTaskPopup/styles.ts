import { StyleSheet } from "react-native";
import { backgroundColors } from "../../../styles/global/colors";

export const addTaskPopupStyles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: backgroundColors.blue
  },
  buttonsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  settingButtonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 20,
    marginRight: 15,
  },
})