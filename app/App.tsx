import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simple screen components
const WelcomeScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Real or AI?</Text>
    <Text style={styles.subtitle}>Welcome to the app!</Text>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => onNavigate('Home')}
    >
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
    <Text style={styles.subtitle}>This is the home screen</Text>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => onNavigate('Welcome')}
    >
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

// Main App component with simple navigation
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Welcome':
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
      case 'Home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      default:
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9d4eff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#9d4eff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
