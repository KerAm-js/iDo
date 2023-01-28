import { LangObjectType } from "../../../../types/global/LangObject";

export type TextButtonPropTypes = {
  color?: string,
  title: LangObjectType,
  onPress: () => void,
}