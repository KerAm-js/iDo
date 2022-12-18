import { StyleSheet } from "react-native";
import { textColors } from "../../../../styles/global/colors";

export const circleButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  shadows: {
    shadowColor: textColors.blue,
    shadowRadius: 6,
    shadowOpacity: 0.6,
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
    width: 36,
    height: 36,
    marginTop: 0,
  },
  iconSmall: {
    width: 14,
    height: 14,
  }
})