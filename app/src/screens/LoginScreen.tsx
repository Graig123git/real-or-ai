import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up/Login</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome,{'\n'}Challenger!</Text>
            <Text style={styles.welcomeSubtitle}>Prove your discernment.</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Continue with Email Button */}
          <TouchableOpacity 
            style={[styles.emailButtonContainer, styles.emailButton]}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            {/* Google Button */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => navigation.navigate('Home' as never)}
            >
              <View style={styles.socialIconContainer}>
                <Text>G</Text>
              </View>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => navigation.navigate('Home' as never)}
            >
              <View style={styles.socialIconContainer}>
                <Text>🍎</Text>
              </View>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Guest Button */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => navigation.navigate('Home' as never)}
            >
              <View style={styles.socialIconContainer}>
                <Text>👤</Text>
              </View>
              <Text style={styles.socialButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark[400],
  },
  headerText: {
    color: 'white',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing[6],
    paddingTop: theme.spacing[10],
  },
  welcomeContainer: {
    width: '100%',
    marginBottom: theme.spacing[8],
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: 'bold',
    color: 'white',
    marginBottom: theme.spacing[4],
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: '#8E8E93',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing[6],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark[400],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  inputIcon: {
    marginRight: theme.spacing[3],
    fontSize: theme.typography.fontSize.xl,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
    fontSize: theme.typography.fontSize.base,
  },
  emailButtonContainer: {
    width: '100%',
    marginBottom: theme.spacing[6],
    shadowColor: 'transparent',
  },
  emailButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neonPurple[600],
  },
  emailButtonText: {
    color: 'white',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.dark[400],
  },
  dividerText: {
    color: '#8E8E93',
    paddingHorizontal: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
  },
  socialButtonsContainer: {
    width: '100%',
    marginBottom: theme.spacing[6],
  },
  socialButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.dark[400],
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[3],
  },
  socialButtonText: {
    color: 'white',
    fontSize: theme.typography.fontSize.base,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: theme.spacing[4],
  },
  signUpText: {
    color: '#8E8E93',
    fontSize: theme.typography.fontSize.base,
  },
  signUpLink: {
    color: theme.colors.neonPurple[500],
    fontWeight: 'bold',
  },
});

export default LoginScreen;
