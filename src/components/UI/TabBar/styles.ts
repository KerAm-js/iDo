import { StyleSheet } from "react-native"
import { backgroundColors, textColors } from "../../../styles/global/colors"

export const tabBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    flex: 1,
    marginTop: 15,
  },
  icon: {
    marginBottom: 5,
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 10,
  },
  circleButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 30,
    marginTop: 10,
  },
  circleButtonShadows: {
    shadowColor: textColors.blue,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  circleButtonIcon: {
    width: 16,
    height: 16,
  }
})