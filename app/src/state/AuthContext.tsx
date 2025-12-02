import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import useAuthStore from './authStore';

// Create the auth context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initialize, isAuthenticated, isLoading, user } = useAuthStore();

  // Initialize authentication on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Provide the auth state to all children
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
