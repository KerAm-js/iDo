import { shadowStyle } from './../../../styles/global/shadow';
import { StyleSheet } from "react-native";

export const taskStyles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
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
    position: 'absolute',
    zIndex: -100,
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 2,
  }
})