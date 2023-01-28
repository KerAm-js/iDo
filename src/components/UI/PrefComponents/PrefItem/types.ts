import { LangObjectType, TextGetterType } from "../../../../types/global/LangObject";

type PrefItemType = 'switching' | 'checking' | 'info' | 'navigation';

export type PrefItemPropTypes = {
  iconXml: string,
  title: TextGetterType | LangObjectType,
  type: PrefItemType,
  state?: boolean | string,
  onPress?: () => void,
}