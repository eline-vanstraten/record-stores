import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator.js';
import { LayoutProvider } from './src/contexts/LayoutContext.js';

export default function App() {


  return (
    <LayoutProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer >
    </LayoutProvider>
  );
}

