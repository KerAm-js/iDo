import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";

export const taskStyles = StyleSheet.create({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
  },
  title: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  subTitle: {
    marginTop: 3,
    paddingLeft: 5,
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 5,
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