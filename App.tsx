import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import TabNavigator from './src/components/Navigators/Tab/TabNavigator';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}