import { StyleSheet } from "react-native";

export const sectionStyles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
  },  
})

export const movableItemStyles = StyleSheet.create({
  container: {
    position: "absolute", 
    width: '100%',
    justifyContent: 'center',
  },
  pressable: {
    width: "100%",
    height: "100%",
  },
  panGestureContainer: {
    position: "absolute",
    right: 42,
    width: "25%",
    height: "100%",
    zIndex: 100,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  trashIconContainer: {
    position: "absolute",
    right: 20,
    width: 24,
    height: 24,
  }
})