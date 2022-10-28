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
  },
  pressable: {
    width: "100%",
    height: "100%",
  },
  panGestureContainer: {
    position: "absolute",
    width: "30%",
    height: "100%",
    zIndex: 100,
  }
})