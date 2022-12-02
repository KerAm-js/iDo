type PrefItemType = 'switching' | 'checking' | 'info' | 'navigation';

export type PrefItemPropTypes = {
  iconXml: string,
  title: string,
  type: PrefItemType,
  state?: boolean | string,
  onPress?: () => void,
}