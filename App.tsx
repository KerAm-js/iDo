import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Root from './src/components/Navigators/Root/Root';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}