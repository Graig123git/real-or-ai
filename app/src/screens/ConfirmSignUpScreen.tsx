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

type ConfirmSignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmSignUp'>;
type ConfirmSignUpScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmSignUp'>;

const ConfirmSignUpScreen = () => {
  const navigation = useNavigation<ConfirmSignUpScreenNavigationProp>();
  const route = useRoute<ConfirmSignUpScreenRouteProp>();
  const { confirmSignUp, resendConfirmationCode, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const codeInputRef = useRef<TextInput>(null);
  
  // Set initial email from route params if available
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      // Focus the code input if email is pre-filled
      setTimeout(() => {
        if (codeInputRef.current) {
          codeInputRef.current.focus();
        }
      }, 300);
    }
  }, [route.params]);
  
  const handleConfirmation = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Validate inputs
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!confirmationCode.trim()) {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }
    
    try {
      await confirmSignUp(email, confirmationCode);
      Alert.alert(
        'Confirmation Successful',
        'Your account has been verified. You can now log in.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Navigate back to login screen
              navigation.navigate('Login');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Confirmation Failed', error instanceof Error ? error.message : 'An error occurred during confirmation.');
    }
  };

  const handleResendCode = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Validate email
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    try {
      await resendConfirmationCode(email);
      Alert.alert(
        'Code Sent',
        'A new confirmation code has been sent to your email.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Failed to Resend Code', error instanceof Error ? error.message : 'An error occurred while resending the code.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Confirm Sign Up</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.content}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Verify Your Account</Text>
              <Text style={styles.subtitle}>Please enter the verification code sent to your email.</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Email */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="john.doe@example.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!route.params?.email} // Make email non-editable if provided in route params
                  returnKeyType="next"
                  onSubmitEditing={() => codeInputRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>

              {/* Confirmation Code */}
              <Text style={styles.inputLabel}>Confirmation Code</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔢</Text>
                <TextInput
                  ref={codeInputRef}
                  style={styles.input}
                  placeholder="123456"
                  placeholderTextColor="#8E8E93"
                  value={confirmationCode}
                  onChangeText={setConfirmationCode}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onSubmitEditing={handleConfirmation}
                  blurOnSubmit={true}
                />
              </View>
            </View>

            {/* Resend Code Link */}
            <TouchableOpacity 
              style={styles.resendCodeContainer}
              onPress={handleResendCode}
              disabled={!email.trim() || isLoading}
            >
              <Text style={[
                styles.resendCodeText, 
                (!email.trim() || isLoading) && styles.resendCodeDisabled
              ]}>
                Didn't receive a code? Resend Code
              </Text>
            </TouchableOpacity>

            {/* Confirm Button */}
            <TouchableOpacity 
              style={[
                styles.confirmButton, 
                (!email.trim() || !confirmationCode.trim() || isLoading) && styles.confirmButtonDisabled
              ]}
              onPress={handleConfirmation}
              disabled={!email.trim() || !confirmationCode.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    width: 40, // Same width as back button for centering
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '500',
    fontFamily: fonts.fontFamily.pixel,
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
    fontFamily: fonts.fontFamily.pixel,
  },
  input: {
    flex: 1,
    height: 45,
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 12,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.fontFamily.pixel,
  },
  confirmButton: {
    width: '100%',
    height: 45,
    borderRadius: 25,
    backgroundColor: '#7a1cf7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  confirmButtonDisabled: {
    backgroundColor: '#4a4a4a',
    borderColor: '#4a4a4a',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.fontFamily.pixel,
  },
  resendCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resendCodeText: {
    color: '#8a20ff',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  resendCodeDisabled: {
    color: '#4a4a4a',
  },
});

export default ConfirmSignUpScreen;
