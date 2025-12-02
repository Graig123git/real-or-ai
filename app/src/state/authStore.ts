import { create } from 'zustand';
import { CognitoUser } from 'amazon-cognito-identity-js';
import * as authApi from '../api/auth';

// Define the authentication state
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: CognitoUser | null;
  error: Error | null;
  
  // Actions
  initialize: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  resendConfirmationCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

// Create the auth store
const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  
  // Initialize auth state
  initialize: async () => {
    try {
      console.log('Initializing auth...');
      set({ isLoading: true, error: null });
      
      // Initialize the Auth module
      authApi.initAuth();
      
      // Check if user is already authenticated
      const isAuthenticated = await authApi.isAuthenticated();
      
      if (isAuthenticated) {
        // Get current user
        const user = await authApi.getAuthenticatedUser();
        set({ isAuthenticated: true, user, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isAuthenticated: false, user: null, error: error as Error, isLoading: false });
    }
  },
  
  // Sign in with email and password
  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await authApi.signInWithEmail(email, password);
      
      // Check if there's a next step required
      if (result?.nextStep?.signInStep !=='DONE') {
        set({ isLoading: false });
        return result; // Return the result with nextStep information
      }
      
      // If no next step, set authenticated state
      set({ isAuthenticated: true, user: result.isSignedIn ? result : null, isLoading: false });
      return result;
    } catch (error) {
      console.error('Error signing in with email:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await authApi.signInWithGoogle();
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Sign in with Apple
  signInWithApple: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await authApi.signInWithApple();
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Sign up with email, password, and name
  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await authApi.signUp(email, password, name);
      
      // Check if sign-up is complete or requires confirmation
      if (result.isSignUpComplete === false && result.nextStep) {
        console.log('Next step required after sign-up:', result.nextStep);
        set({ isLoading: false });
        return result; // Return the result with nextStep information
      }
      
      set({ isLoading: false });
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Confirm sign up with verification code
  confirmSignUp: async (email: string, code: string) => {
    try {
      set({ isLoading: true, error: null });
      await authApi.confirmSignUpWithCode(email, code);
      set({ isLoading: false });
    } catch (error) {
      console.error('Error confirming sign up:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Resend confirmation code
  resendConfirmationCode: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      await authApi.resendConfirmationCode(email);
      set({ isLoading: false });
    } catch (error) {
      console.error('Error resending confirmation code:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Forgot password - initiate reset
  forgotPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      await authApi.forgotUserPassword(email);
      set({ isLoading: false });
    } catch (error) {
      console.error('Error initiating password reset:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Confirm new password with verification code
  confirmForgotPassword: async (email: string, code: string, newPassword: string) => {
    try {
      set({ isLoading: true, error: null });
      await authApi.confirmNewPassword(email, code, newPassword);
      set({ isLoading: false });
    } catch (error) {
      console.error('Error confirming new password:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await authApi.signOutUser();
      set({ isAuthenticated: false, user: null, isLoading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Refresh session
  refreshSession: async () => {
    try {
      const isRefreshed = await authApi.refreshSession();
      
      if (isRefreshed) {
        const user = await authApi.getAuthenticatedUser();
        set({ isAuthenticated: true, user });
        return true;
      } else {
        set({ isAuthenticated: false, user: null });
        return false;
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      set({ isAuthenticated: false, user: null, error: error as Error });
      return false;
    }
  },
}));

export default useAuthStore;
