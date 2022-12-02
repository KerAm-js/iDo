import { StyleSheet } from "react-native"

export const tabBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 0,
    position: 'absolute',
    bottom: 0,
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
})