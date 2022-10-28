import { StyleSheet } from "react-native";
import { textColors } from "../../../../styles/global/colors";

export const circleButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 30,
    marginTop: 10,
  },
  shadows: {
    shadowColor: textColors.blue,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  icon: {
    width: 16,
    height: 16,
  },
  containerSmall: {
    width: 30,
    height: 30,
    marginTop: 0,
  },
  iconSmall: {
    width: 12,
    height: 12,
  }
})