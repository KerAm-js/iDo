import { StyleSheet } from "react-native";

export const sectionStyles = StyleSheet.create({
  container: {
  },
  counter: {
    marginRight: 10,
  },
  arrowButton: {
    height: 22,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 36,
  },  
  headerTextContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  }
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
    right: 0,
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