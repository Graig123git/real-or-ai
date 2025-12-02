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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useAuthStore from '../state/authStore';
import LoadingOverlay from '../components/LoadingOverlay';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signInWithEmail, signInWithGoogle, signInWithApple, isLoading, error, initialize } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const fullText = 'Welcome,\nChallenger!';
  
  // Refs for input fields
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Handle login logic in a separate function
  const handleLogin = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();
    
    try {
      // Show loading overlay
      setIsAuthenticating(true);

      // Add a small delay to ensure the loading overlay is visible
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = await signInWithEmail(email, password);

      // Check if there's a next step required
      if (result && result.nextStep) {
        // Hide loading overlay
        setIsAuthenticating(false);

        console.log('Handling next step:', result.nextStep);

        // Handle different next steps
        if (result.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
          // Navigate to confirmation screen
          navigation.navigate('ConfirmSignUp', { email });
          return;
        } else if (result.nextStep.signInStep === 'RESET_PASSWORD') {
          // Navigate to reset password screen
          navigation.navigate('ForgotPassword', { email });
          return;
        }
        return;
      }
      
      // If no next step, the user is fully signed in
      console.log('Login successful, user is authenticated');
      
      // Reinitialize auth state to ensure it's updated correctly
      await initialize();
      
      // Explicitly navigate to MainTabs to ensure proper navigation
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

      // Note: We don't need to hide the loading overlay here as the navigation
      // will change to the main app, and this component will be unmounted
    } catch (error) {
      // Hide loading overlay
      setIsAuthenticating(false);
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Please check your credentials and try again.');
    }
  };

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Start typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 50); // Faster typing speed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.loginContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginContainer}>
          {/* Loading Overlay */}
          <LoadingOverlay visible={isAuthenticating} />
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up/Login</Text>
          </View>

          <View style={styles.loginContent}>
            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                {displayText}
                {showCursor && <Text style={styles.cursor}>|</Text>}
              </Text>
              <Text style={styles.welcomeSubtitle}>Prove your discernment.</Text>
            </View>

            {/* Email and Password Inputs */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#8E8E93"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  blurOnSubmit={true}
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.emailButton,
                (!email.trim() || !password.trim() || isAuthenticating) && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={!email.trim() || !password.trim() || isAuthenticating}
            >
              {isAuthenticating ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.emailButtonText}>Login</Text>
              )}
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
                style={[styles.socialButton, isLoading && styles.loginButtonDisabled]}
                onPress={async () => {
                  Keyboard.dismiss();
                  try {
                    await signInWithGoogle();
                    // Auth state will be updated automatically
                  } catch (error) {
                    Alert.alert('Google Login Failed', error instanceof Error ? error.message : 'An error occurred during Google sign in.');
                  }
                }}
                disabled={isLoading}
              >
                <View style={styles.socialIconContainer}>
                  <Text>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Apple Button */}
              <TouchableOpacity
                style={[styles.socialButton, isLoading && styles.loginButtonDisabled]}
                onPress={async () => {
                  Keyboard.dismiss();
                  try {
                    await signInWithApple();
                    // Auth state will be updated automatically
                  } catch (error) {
                    Alert.alert('Apple Login Failed', error instanceof Error ? error.message : 'An error occurred during Apple sign in.');
                  }
                }}
                disabled={isLoading}
              >
                <View style={styles.socialIconContainer}>
                  <Text>🍎</Text>
                </View>
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>

              {/* Remove Guest Button as per handbook requirements */}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => {
                Keyboard.dismiss();
                console.log('Navigating to ForgotPassword screen');
                navigation.navigate('ForgotPassword');
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <Text 
                  style={styles.signUpLink} 
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate('Register');
                  }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Login screen styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#121212', // Darker background
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  headerText: {
    color: 'white',
    fontSize: 20, // Reduced from 18
    fontFamily: fonts.fontFamily.pixel,
  },
  loginContent: {
    flex: 1,
    padding: 24,
    paddingTop: 60, // Increased from 40 for more space at the top
  },
  welcomeContainer: {
    width: '100%',
    marginBottom: 50, // Increased from 32 for more space below welcome text
  },
  welcomeTitle: {
    fontSize: 30, // Reduced from 34
    fontWeight: '600', // Lighter than bold for smoother appearance
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 36, // Adjusted for smaller font
    fontFamily: fonts.fontFamily.pixel,
  },
  cursor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel, // Match the parent text font
  },
  welcomeSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#8E8E93',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30, // Increased from 24 for more space below input
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
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
    fontSize: 14, // Reduced from 16
    fontFamily: fonts.fontFamily.pixel,
  },
  emailButton: {
    width: '100%',
    height: 45, // Match input height
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7a1cf7', // Purple color
    marginBottom: 24,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, // Reduced from 0.5
    shadowRadius: 6, // Reduced from 10
    elevation: 3, // Reduced from 5
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  loginButtonDisabled: {
    backgroundColor: '#4a4a4a', // Same as signUpButtonDisabled
    borderColor: '#4a4a4a',
    // Keep the shadow even when disabled
  },
  emailButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    fontWeight: '600', // Lighter than bold for smoother appearance
    fontFamily: fonts.fontFamily.pixel,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Added margin top
    marginBottom: 30, // Increased from 24
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2c2c2e',
  },
  dividerText: {
    color: '#8E8E93',
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  socialButtonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  socialButton: {
    width: '100%',
    height: 45, // Match input height
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20, // Increased from 12 for more space between buttons
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    marginLeft: 8,
    fontWeight: '500', // Medium weight for better readability
    fontFamily: fonts.fontFamily.pixel,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  signUpLink: {
    color: '#8a20ff',
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#8a20ff',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default LoginScreen;
