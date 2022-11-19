import { StyleSheet } from "react-native";
import { cardColors } from "../../../styles/global/colors";

export const taskStyles = StyleSheet.create({
  container: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
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