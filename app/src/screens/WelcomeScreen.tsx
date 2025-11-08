import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Challenger!</Text>
      <Text style={styles.subtitle}>Can you tell what's real?</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Login' as never)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('Connect with Google')}>
          <Text style={styles.footerText}>Connect with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => console.log('Connect with Apple')}>
          <Text style={styles.footerText}>Connect with Apple</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Main' as never)}>
          <Text style={styles.footerText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[6],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: 'white',
    marginBottom: theme.spacing[8],
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.neonPurple[600],
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[8],
    ...theme.shadows.neonPurple,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing[8],
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.neonPurple[300],
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing[4],
  },
});

export default WelcomeScreen;
