import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import theme from '../theme';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View style={styles.registerContainer}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.registerContent}>
        {/* Title */}
        <View style={styles.registerTitleContainer}>
          <Text style={styles.registerTitle}>Create your account</Text>
          <Text style={styles.registerSubtitle}>Join the future of events with a quick sign-up.</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>👤</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="John Doe"
              placeholderTextColor="#8E8E93"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>✉️</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="john.doe@example.com"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>🔒</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="••••••••"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>🔒</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="••••••••"
              placeholderTextColor="#8E8E93"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
              <TouchableOpacity 
                style={styles.checkboxTouchable}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms && <Text style={styles.checkboxCheck}>✓</Text>}
              </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms and Conditions</Text> and Privacy Policy.
            </Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[
            styles.signUpButton, 
            !agreeToTerms && styles.signUpButtonDisabled
          ]}
          onPress={() => agreeToTerms && navigation.navigate('MainTabs')}
          disabled={!agreeToTerms}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          <Text style={styles.signUpButtonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Register screen styles
  registerContainer: {
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
    fontFamily: 'Courier',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Courier',
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  registerContent: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  registerTitleContainer: {
    marginBottom: 30,
  },
  registerTitle: {
    fontSize: 28, // Reduced from 32
    fontWeight: '600', // Lighter than bold for smoother appearance
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  registerSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#8E8E93',
    fontFamily: 'Courier',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '500', // Medium weight for better readability
    fontFamily: 'Courier',
  },
  registerInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25, // Match login screen
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 45, // Match login screen
  },
  registerInputIcon: {
    marginRight: 12,
    fontSize: 18, // Match login screen
    fontFamily: 'Courier',
  },
  registerInput: {
    flex: 1,
    height: 45, // Match login screen
    color: 'white',
    fontSize: 14, // Reduced from 16 to match login input
    fontFamily: 'Courier',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  checkbox: {
    width: 18, // Reduced from 24
    height: 18, // Reduced from 24
    borderWidth: 1,
    borderColor: '#8a20ff',
    borderRadius: 3, // Reduced from 4
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#8a20ff',
    borderColor: '#8a20ff',
  },
  checkboxTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCheck: {
    color: 'white',
    fontSize: 12, // Reduced from 16
    fontFamily: 'Courier',
  },
  termsText: {
    color: '#8E8E93',
    fontSize: 14,
    flex: 1,
    fontFamily: 'Courier',
  },
  termsLink: {
    color: '#8a20ff',
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  signUpButton: {
    width: '100%',
    height: 45, // Match input height
    borderRadius: 25,
    backgroundColor: '#7a1cf7', // Match login button color
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, // Reduced from 0.5
    shadowRadius: 6, // Reduced from 10
    elevation: 3, // Reduced from 5
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  signUpButtonDisabled: {
    backgroundColor: '#4a4a4a',
    borderColor: '#4a4a4a',
    // Keep the shadow even when disabled
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 18
    fontWeight: '600', // Lighter than bold for smoother appearance
    marginRight: 8,
    fontFamily: 'Courier',
  },
  signUpButtonIcon: {
    color: 'white',
    fontSize: 14, // Reduced from 18
    fontFamily: 'Courier',
  },
});

export default RegisterScreen;
