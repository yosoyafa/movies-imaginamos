import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MoviesProvider } from './src/context/MoviesContext';

import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <MoviesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Movie' component={MovieScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Results' component={ResultsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MoviesProvider>
  );
};

const styles = StyleSheet.create({});

export default App;