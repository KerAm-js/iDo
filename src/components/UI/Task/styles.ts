import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";

export const taskStyles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginRight: 15,
  },
  subTitle: {
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },
})

export const completedMarkerStyles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: cardColors.white,
    borderRadius: 4,
    marginBottom: 10,
    position: 'absolute',
  },
  icon: {
    marginLeft: 2,
  }
})