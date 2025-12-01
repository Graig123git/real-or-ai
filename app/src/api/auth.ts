import { Amplify } from 'aws-amplify';
import { 
  signIn as amplifySignIn, 
  signUp as amplifySignUp, 
  confirmSignUp as amplifyConfirmSignUp, 
  signOut as amplifySignOut, 
  resetPassword as amplifyResetPassword, 
  confirmResetPassword as amplifyConfirmResetPassword, 
  getCurrentUser as amplifyGetCurrentUser, 
  fetchAuthSession
} from 'aws-amplify/auth';
import * as SecureStore from 'expo-secure-store';

// Token storage keys
const AUTH_ID_TOKEN_KEY = 'auth_id_token';
const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token';
const AUTH_ACCESS_TOKEN_KEY = 'auth_access_token';

/**
 * Initialize the Auth module with the Cognito configuration
 */
export const initAuth = () => {
  try {
    // For AWS Amplify v6, we configure auth through the Amplify.configure method
    // Get the client ID from AWS CLI using:
    // aws cognito-idp list-user-pool-clients --user-pool-id us-east-1_OaKtgCyZs
    // Then update the userPoolClientId below with the correct value
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: 'us-east-1_OaKtgCyZs', // This ID is correct
          userPoolClientId: 'h99sb77u05pnor7mhkj8tk6df', // This ID might be incorrect
          identityPoolId: 'us-east-1:a70aaa26-174e-4e88-a307-80a5098c3e81',
          loginWith: {
            email: true,
          },
        }
      }
    });
    
    console.log('Auth initialized successfully with Cognito configuration');
  } catch (error) {
    console.error('Error initializing Auth:', error);
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<any> => {
  try {    
    const signInParams = {
      username: email,
      password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH' as any,
      },
    };
    const result = await amplifySignIn(signInParams);
    
    // Check if there's a next step required
    if (result.nextStep) {
      console.log('Next step required:', result.nextStep);
      return result; // Return the result with nextStep information
    }
    
    // If no next step, store tokens and return the user
    const session = await fetchAuthSession();
    if (session.tokens) {
      await storeTokens(session.tokens);
    }
    
    return result;
  } catch (error: any) {
    console.error('Error during sign in or session fetch:', error);
    throw error;
  }
};

/**
 * Sign up with email, password, and name
 */
export const signUp = async (email: string, password: string, name: string): Promise<any> => {
  try {
    console.log(`Attempting to sign up with email: ${email}`);
    
    // Add more detailed logging
    console.log('Sign-up parameters:', JSON.stringify({ username: email, password: '******', name }, null, 2));
    
    const result = await amplifySignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          given_name: name, // Changed from 'name' to 'given_name' to match Cognito schema
        },
      },
    });
    
    console.log('Sign-up successful, result:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error: any) {
    // More detailed error logging
    console.error('Error signing up:', error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Check for specific error types and provide more descriptive errors
      if (error.message.includes('UsernameExistsException')) {
        const descriptiveError = new Error(`User with email ${email} already exists`);
        descriptiveError.name = 'UsernameExistsException';
        throw descriptiveError;
      } else if (error.message.includes('InvalidPasswordException')) {
        const descriptiveError = new Error('Password does not meet the requirements. It must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
        descriptiveError.name = 'InvalidPasswordException';
        throw descriptiveError;
      } else if (error.message.includes('InvalidParameterException')) {
        const descriptiveError = new Error('Invalid parameter. Please check your input.');
        descriptiveError.name = 'InvalidParameterException';
        throw descriptiveError;
      } else if (error.message.includes('NetworkError')) {
        const descriptiveError = new Error('Network error - check your internet connection');
        descriptiveError.name = 'NetworkError';
        throw descriptiveError;
      }
    } else {
      console.error('Unknown error type:', typeof error);
    }
    
    // If we get here, it's an unknown error
    throw error;
  }
};

/**
 * Confirm sign up with verification code
 */
export const confirmSignUpWithCode = async (email: string, code: string): Promise<any> => {
  try {
    return await amplifyConfirmSignUp({
      username: email,
      confirmationCode: code,
    });
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

/**
 * Resend confirmation code for sign up
 */
export const resendConfirmationCode = async (email: string): Promise<any> => {
  try {
    // Import the resendSignUpCode function from aws-amplify/auth
    const { resendSignUpCode } = await import('aws-amplify/auth');
    
    return await resendSignUpCode({
      username: email,
    });
  } catch (error) {
    console.error('Error resending confirmation code:', error);
    throw error;
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<any> => {
  // Implement actual Google Sign-In using Expo Auth Session
  throw new Error('Google Sign-In is not implemented yet.');
};

/**
 * Sign in with Apple
 */
export const signInWithApple = async (): Promise<any> => {
  // Implement actual Apple Sign-In using Expo Apple Authentication
  throw new Error('Apple Sign-In is not implemented yet.');
};

/**
 * Sign out
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await amplifySignOut();
    await clearTokens();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Forgot password - initiate reset
 */
export const forgotUserPassword = async (email: string): Promise<void> => {
  try {
    await amplifyResetPassword({
      username: email,
    });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw error;
  }
};

/**
 * Confirm new password with verification code
 */
export const confirmNewPassword = async (email: string, code: string, newPassword: string): Promise<void> => {
  try {
    await amplifyConfirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  } catch (error) {
    console.error('Error confirming new password:', error);
    throw error;
  }
};

/**
 * Get current authenticated user
 */
export const getAuthenticatedUser = async (): Promise<any | null> => {
  try {
    return await amplifyGetCurrentUser();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await fetchAuthSession();
    return !!session.tokens;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

/**
 * Refresh tokens if expired
 */
export const refreshSession = async (): Promise<boolean> => {
  try {
    const session = await fetchAuthSession();
    if (session.tokens) {
      await storeTokens(session.tokens);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing session:', error);
    await clearTokens();
    return false;
  }
};

/**
 * Store authentication tokens in secure storage
 */
const storeTokens = async (tokens: any): Promise<void> => {
  try {
    if (tokens.idToken) {
      await SecureStore.setItemAsync(AUTH_ID_TOKEN_KEY, tokens.idToken.toString());
    }
    if (tokens.refreshToken) {
      await SecureStore.setItemAsync(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken.toString());
    }
    if (tokens.accessToken) {
      await SecureStore.setItemAsync(AUTH_ACCESS_TOKEN_KEY, tokens.accessToken.toString());
    }
  } catch (error) {
    console.error('Error storing tokens:', error);
    throw error;
  }
};

/**
 * Clear authentication tokens from secure storage
 */
const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(AUTH_ID_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing tokens:', error);
    throw error;
  }
};

/**
 * Get ID token from secure storage
 */
export const getIdToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(AUTH_ID_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
};

/**
 * Get access token from secure storage
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(AUTH_ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};
