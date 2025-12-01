import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import theme from '../theme';
import fonts from '../theme/fonts';
import useAuthStore from '../state/authStore';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { forgotPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await forgotPassword(email);
      setResetSent(true);
      Alert.alert(
        'Reset Email Sent',
        'Please check your email for instructions to reset your password.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred while sending reset email.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Reset Password</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
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
              editable={!isLoading && !resetSent}
            />
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity 
          style={[
            styles.resetButton, 
            (!email.trim() || isLoading || resetSent) && styles.resetButtonDisabled
          ]}
          onPress={handleResetPassword}
          disabled={!email.trim() || isLoading || resetSent}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.resetButtonText}>
              {resetSent ? 'Email Sent' : 'Send Reset Link'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity 
          style={styles.backToLoginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    paddingHorizontal: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: fonts.fontFamily.pixel,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.fontFamily.pixel,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: fonts.fontFamily.pixel,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
  },
  inputIcon: {
    marginRight: 12,
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: 45,
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  resetButton: {
    width: '100%',
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7a1cf7',
    marginBottom: 24,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  resetButtonDisabled: {
    backgroundColor: '#4a4a4a',
    borderColor: '#4a4a4a',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.fontFamily.pixel,
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    color: '#8a20ff',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default ForgotPasswordScreen;
