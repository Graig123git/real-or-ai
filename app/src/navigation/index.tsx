import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Simple placeholder component
const PlaceholderScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Real or AI?</Text>
    <Text style={styles.subtext}>Welcome to the app!</Text>
  </View>
);

// Create navigator
const Stack = createStackNavigator();

// Simple navigation setup with Stack
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={PlaceholderScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9d4eff',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 18,
    color: 'white',
    marginBottom: 32,
  },
});

export default Navigation;
