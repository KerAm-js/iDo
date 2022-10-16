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
  }
})