import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useAuthStore from '../state/authStore';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const { signUp, isLoading } = useAuthStore();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Refs for input fields
  const fullNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  
  // Set initial email from route params if available
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      // Focus the next field if email is pre-filled
      setTimeout(() => {
        if (fullNameInputRef.current) {
          fullNameInputRef.current.focus();
        }
      }, 300);
    }
  }, [route.params]);
  
  const handleSignUp = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Validate inputs
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }
    
    try {
      const result = await signUp(email, password, fullName);
      // If no confirmation required, show success message
      Alert.alert(
        'Registration Successful', 
        'Please check your email for a verification code to complete your registration.',
        [{ text: 'OK', onPress: () =>  navigation.navigate('ConfirmSignUp', { email }) }]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'An error occurred during registration.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.registerContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.registerContainer}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Login');
              }}
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
                  ref={fullNameInputRef}
                  style={styles.registerInput}
                  placeholder="John Doe"
                  placeholderTextColor="#8E8E93"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>

              {/* Email */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.registerInputWrapper}>
                <Text style={styles.registerInputIcon}>✉️</Text>
                <TextInput
                  ref={emailInputRef}
                  style={styles.registerInput}
                  placeholder="john.doe@example.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!route.params?.email} // Make email non-editable if provided in route params
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>

              {/* Password */}
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.registerInputWrapper}>
                <Text style={styles.registerInputIcon}>🔒</Text>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.registerInput}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>

              {/* Confirm Password */}
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.registerInputWrapper}>
                <Text style={styles.registerInputIcon}>🔒</Text>
                <TextInput
                  ref={confirmPasswordInputRef}
                  style={styles.registerInput}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                  blurOnSubmit={true}
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
                (!agreeToTerms || isLoading) && styles.signUpButtonDisabled
              ]}
              onPress={handleSignUp}
              disabled={!agreeToTerms || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                  <Text style={styles.signUpButtonIcon}>→</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    fontFamily: fonts.fontFamily.pixel,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  registerSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#8E8E93',
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
  },
  registerInput: {
    flex: 1,
    height: 45, // Match login screen
    color: 'white',
    fontSize: 14, // Reduced from 16 to match login input
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
  },
  termsText: {
    color: '#8E8E93',
    fontSize: 14,
    flex: 1,
    fontFamily: fonts.fontFamily.pixel,
  },
  termsLink: {
    color: '#8a20ff',
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
  },
  signUpButtonIcon: {
    color: 'white',
    fontSize: 14, // Reduced from 18
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default RegisterScreen;
