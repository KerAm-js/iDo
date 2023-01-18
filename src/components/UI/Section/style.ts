import { StyleSheet } from "react-native";

export const sectionStyles = StyleSheet.create({
  container: {},
  counter: {
    marginRight: 10,
  },
  arrowButton: {
    height: 22,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 36,
  },
  headerTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
});

export const movableItemStyles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
  },
  pressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  panGestureContainer: {
    position: "absolute",
    left: 50,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    zIndex: 50,
    alignItems: "center",
  },
  panGestureItem: {
    height: '100%',
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
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
  },
});
