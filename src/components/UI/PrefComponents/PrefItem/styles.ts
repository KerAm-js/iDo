import { StyleSheet } from "react-native";

export const prefItemStyles = StyleSheet.create({
  container: {
    minHeight: 50,
    marginBottom: 10,
  },
  leftItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    paddingRight: 15,
    flex: 1,
  },
});
