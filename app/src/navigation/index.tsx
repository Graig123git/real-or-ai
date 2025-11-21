import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import { View, Text } from 'react-native';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import AchievementScreen from '../screens/AchievementScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GameplayScreen from '../screens/GameplayScreen';
import ResultsScreen from '../screens/ResultsScreen';

// Tab bar icons
const homeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4L4 10V20H9V14H15V20H20V10L12 4Z" fill="white"/>
</svg>`;

const trophyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 4H16V6H18V10C18 12 16 14 14 14C14 16 12 18 10 18H14C16 18 18 16 18 14H20V6H22V4H8ZM6 4V6H4V10C4 12 6 14 8 14C8 16 10 18 12 18H8C6 18 4 16 4 14H2V6H0V4H6Z" fill="white"/>
</svg>`;

const achievementsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#bf00ff"/>
</svg>`;

const storeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20V8H22L18 14H6L2 8H4V4ZM6 16H18V18H6V16Z" fill="white"/>
</svg>`;

const challengeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 17.5L3 6V3H6L17.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 19L19 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 16L20 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 21L21 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 6.5L18 3L21 6L17.5 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const profileIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
<circle cx="12" cy="8" r="3" fill="white"/>
<path d="M6 18C6 15 8 12 12 12C16 12 18 15 18 18" fill="white"/>
</svg>`;

// Define the tab parameter list
export type TabParamList = {
  Main: undefined;
  Leaderboard: undefined;
  Achievement: undefined;
  Challenge: undefined;
  Profile: undefined;
};

// Define the root stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
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
} & TabParamList;

// Create the tab navigator
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 1,
          borderTopColor: '#333',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#bf00ff',
        tabBarInactiveTintColor: 'white',
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Main" 
        component={HomeScreen} 
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ 
              color, 
              fontSize: 10, 
              marginTop: 2,
              fontFamily: 'Courier',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SvgXml 
              xml={homeIcon.replace('fill="white"', focused ? 'fill="#bf00ff"' : 'fill="white"')} 
              width={24} 
              height={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen} 
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ 
              color, 
              fontSize: 10, 
              marginTop: 2,
              fontFamily: 'Courier',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
              Leaderboard
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SvgXml 
              xml={trophyIcon.replace('fill="white"', focused ? 'fill="#bf00ff"' : 'fill="white"')} 
              width={24} 
              height={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Achievement" 
        component={AchievementScreen} 
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ 
              color, 
              fontSize: 10, 
              marginTop: 2,
              fontFamily: 'Courier',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
              Achievement
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <SvgXml 
              xml={achievementsIcon.replace('fill="#bf00ff"', focused ? 'fill="#bf00ff"' : 'fill="white"')} 
              width={24} 
              height={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Challenge" 
        component={ChallengeScreen} 
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ 
              color, 
              fontSize: 10, 
              marginTop: 2,
              fontFamily: 'Courier',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
              Challenge
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            let modifiedIcon = challengeIcon;
            if (focused) {
              modifiedIcon = modifiedIcon.replace(/stroke="white"/g, 'stroke="#bf00ff"');
            }
            return <SvgXml xml={modifiedIcon} width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ 
              color, 
              fontSize: 10, 
              marginTop: 2,
              fontFamily: 'Courier',
              fontWeight: focused ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            let modifiedIcon = profileIcon;
            if (focused) {
              modifiedIcon = modifiedIcon
                .replace('stroke="white"', 'stroke="#bf00ff"')
                .replace('fill="white"', 'fill="#bf00ff"');
            }
            return <SvgXml xml={modifiedIcon} width={24} height={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
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
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Gameplay" component={GameplayScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
