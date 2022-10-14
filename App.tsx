import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import TabNavigator from './src/components/Navigators/Tab/TabNavigator';
import { backgroundColors } from './src/styles/global/colors';

export default function App() {
  return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
  );
}