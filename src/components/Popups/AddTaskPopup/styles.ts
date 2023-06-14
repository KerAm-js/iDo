import { StyleSheet } from "react-native";
import { buttonColors } from "../../../styles/global/colors";
import { text16Input, textSemiBold, title18LineHeight } from "../../../styles/global/texts";

export const addTaskPopupStyles = StyleSheet.create({
  taskInput: {
    paddingHorizontal: 20,
    marginBottom: 15,
    ...title18LineHeight,
    ...textSemiBold,
  },
  input: {
    paddingHorizontal: 20,
    marginBottom: 15,
    ...text16Input
  },
  addButton: {
    backgroundColor: buttonColors.blue
  },
  foldersContainer: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 20,
  },
  buttonsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonsGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 5,
  },
})