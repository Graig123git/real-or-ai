import { create } from 'zustand';
import { generateClient } from 'aws-amplify/api';
import { type GraphQLQuery } from '@aws-amplify/api';
import { createUser, updateUser } from '../api/graphql/mutations';
// Import queries dynamically to avoid TypeScript errors
const getUser = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      avatarUrl
      level
      xp
      coins
      country
      createdAt
    }
  }
`;

// Create a GraphQL client
const client = generateClient();

// Helper function to check authentication status
const checkAuth = async () => {
  try {
    // Import fetchAuthSession from aws-amplify/auth
    const { fetchAuthSession } = await import('aws-amplify/auth');
    
    // Get the current auth session
    const session = await fetchAuthSession();
    
    console.log('Auth session:', JSON.stringify(session, null, 2));
    
    // Check if the user is authenticated
    if (session.tokens) {
      console.log('User is authenticated');
      
      // Check if the ID token has the "cognito:groups" claim
      const idToken = session.tokens.idToken;
      if (idToken) {
        const payload = idToken.payload;
        
        console.log('ID token payload:', JSON.stringify(payload, null, 2));
        
        if (payload['cognito:groups']) {
          console.log('User groups:', payload['cognito:groups']);
        } else {
          console.log('User does not belong to any groups');
        }
      } else {
        console.log('ID token is not available');
      }
      
      return true;
    } else {
      console.log('User is not authenticated');
      return false;
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

// Helper function to ensure we're using the userPool auth mode
const graphqlWithAuth = async (options: any) => {
  console.log('Making authenticated GraphQL request with authMode: userPool');
  
  // Check authentication status first
  await checkAuth();
  
  try {
    const result = await client.graphql({
      ...options,
      authMode: 'userPool',
    });
    console.log('GraphQL request successful');
    return result;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};

// Define the user profile state
export interface UserProfile {
  id?: string;
  email: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  country?: string;
  level: number;
  xp: number;
  coins: number;
  preferences: {
    notifications: {
      appAlerts: boolean;
      marketingPromotions: boolean;
      inGameReminders: boolean;
    };
    theme: 'dark' | 'neon-purple' | 'neon-green';
    audioSfxIntensity: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Define the user profile store state
interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  hasProfile: boolean;
  
  // Temporary profile for onboarding
  tempProfile: Partial<UserProfile>;
  
  // Actions
  setTempProfile: (profile: Partial<UserProfile>) => void;
  createProfile: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  resetProfile: () => void;
}

// Create the user profile store
const useUserProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  hasProfile: false,
  
  // Initialize temporary profile with default values
  tempProfile: {
    level: 1,
    xp: 0,
    coins: 100,
    preferences: {
      notifications: {
        appAlerts: true,
        marketingPromotions: false,
        inGameReminders: true,
      },
      theme: 'dark',
      audioSfxIntensity: 70,
    },
  },
  
  // Set temporary profile data during onboarding
  setTempProfile: (profile) => {
    set((state) => ({
      tempProfile: {
        ...state.tempProfile,
        ...profile,
      },
    }));
  },
  
  // Create a new user profile
  createProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { tempProfile } = get();
      
      // Ensure required fields are present
      if (!tempProfile.email || !tempProfile.name) {
        throw new Error('Email and name are required to create a profile');
      }
      
      // Call the createUser mutation
      const result = await graphqlWithAuth({
        query: createUser,
        variables: { 
          email: tempProfile.email || '',
          name: tempProfile.name || '',
          country: tempProfile.country || 'Global'
        }
      });
      const newProfile = (result as any).data?.createUser;
      
      // Store the preferences separately since they're not part of the GraphQL schema
      const fullProfile = {
        ...newProfile,
        preferences: tempProfile.preferences,
      };
      
      set({ 
        profile: fullProfile, 
        hasProfile: true, 
        isLoading: false,
        // Clear the temporary profile
        tempProfile: {
          level: 1,
          xp: 0,
          coins: 100,
          preferences: {
            notifications: {
              appAlerts: true,
              marketingPromotions: false,
              inGameReminders: true,
            },
            theme: 'dark',
            audioSfxIntensity: 70,
          },
        },
      });
      
      console.log('Profile created successfully:', fullProfile);
      
    } catch (error) {
      console.error('Error creating profile:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Fetch a user profile by ID
  fetchProfile: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      
      // Call the getUser query
      const result = await graphqlWithAuth({
        query: getUser,
        variables: { id: userId }
      });
      const fetchedProfile = (result as any).data?.getUser;
      
      // If no profile exists, set hasProfile to false
      if (!fetchedProfile) {
        set({ profile: null, hasProfile: false, isLoading: false });
        return;
      }
      
      // Add default preferences if not present
      const fullProfile = {
        ...fetchedProfile,
        preferences: fetchedProfile.preferences || {
          notifications: {
            appAlerts: true,
            marketingPromotions: false,
            inGameReminders: true,
          },
          theme: 'dark',
          audioSfxIntensity: 70,
        },
      };
      
      set({ profile: fullProfile, hasProfile: true, isLoading: false });
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Update a user profile
  updateProfile: async (profileUpdates) => {
    try {
      set({ isLoading: true, error: null });
      
      const { profile } = get();
      
      if (!profile || !profile.id) {
        throw new Error('No profile exists to update');
      }
      
      // Call the updateUser mutation
      const result = await graphqlWithAuth({
        query: updateUser,
        variables: { 
          id: profile.id,
          name: profileUpdates.name,
          avatarUrl: profileUpdates.avatarUrl,
          country: profileUpdates.country
        }
      });
      const updatedProfile = (result as any).data?.updateUser;
      
      // Merge the updated profile with the existing profile
      const fullProfile = {
        ...profile,
        ...updatedProfile,
        preferences: {
          ...profile.preferences,
          ...(profileUpdates.preferences || {}),
        },
      };
      
      set({ profile: fullProfile, isLoading: false });
      
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
  
  // Reset the profile state
  resetProfile: () => {
    set({ 
      profile: null, 
      hasProfile: false, 
      isLoading: false, 
      error: null,
      tempProfile: {
        level: 1,
        xp: 0,
        coins: 100,
        preferences: {
          notifications: {
            appAlerts: true,
            marketingPromotions: false,
            inGameReminders: true,
          },
          theme: 'dark',
          audioSfxIntensity: 70,
        },
      },
    });
  },
}));

export default useUserProfileStore;
