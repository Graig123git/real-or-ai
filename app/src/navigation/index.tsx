import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import GameplayScreen from '../screens/GameplayScreen';
import ResultsScreen from '../screens/ResultsScreen';

// Define the root stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Gameplay: {
    category: string;
    contentType: 'image' | 'text' | 'audio' | 'video';
  };
  Results: {
    score: number;
    totalQuestions: number;
    xpEarned: number;
    longestStreak: number;
    streakBonus?: number;
    message?: string;
  };
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main Navigation component
const Navigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' }
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="Gameplay" component={GameplayScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
