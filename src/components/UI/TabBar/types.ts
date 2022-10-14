import { NavigationHelpers } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { TabNavigationState } from '@react-navigation/native';
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

export type tabRenderProps = {
  routes: TabNavigationState<ParamListBase>['routes'],
  stateIndex: number,
  descriptors: BottomTabDescriptorMap,
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
  number: number,
}