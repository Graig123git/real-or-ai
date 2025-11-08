import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#808080"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#808080"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#808080"
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main' as never)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.footerText}>Already have an account? Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Welcome' as never)}>
          <Text style={styles.footerText}>Back to Welcome</Text>
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
    marginBottom: theme.spacing[8],
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing[6],
  },
  input: {
    backgroundColor: theme.colors.dark[400],
    color: 'white',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.dark[300],
  },
  button: {
    backgroundColor: theme.colors.neonPurple[600],
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[8],
    width: '100%',
    ...theme.shadows.neonPurple,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing[4],
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.neonPurple[300],
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing[4],
  },
});

export default RegisterScreen;
