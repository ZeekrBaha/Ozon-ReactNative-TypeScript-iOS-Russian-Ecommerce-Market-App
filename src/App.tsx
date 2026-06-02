import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RepositoryProvider} from './services/RepositoryContext';
import {AppNavigator} from './navigation/AppNavigator';

// Composition root: SafeAreaProvider → RepositoryProvider (DI) → NavigationContainer.
const App: React.FC = () => (
  <SafeAreaProvider>
    <RepositoryProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RepositoryProvider>
  </SafeAreaProvider>
);

export default App;
