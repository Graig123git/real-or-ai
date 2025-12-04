import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useUserProfileStore from '../state/userProfileStore';

type PreferencesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preferences'>;

const PreferencesScreen = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  const { profile, updateProfile } = useUserProfileStore();
  
  // Initialize state with current preferences from the store
  const [appAlerts, setAppAlerts] = useState(profile?.preferences.notifications.appAlerts ?? true);
  const [marketingPromotions, setMarketingPromotions] = useState(profile?.preferences.notifications.marketingPromotions ?? false);
  const [inGameReminders, setInGameReminders] = useState(profile?.preferences.notifications.inGameReminders ?? true);
  const [isDarkMode, setIsDarkMode] = useState(profile?.preferences.theme === 'dark');

  // Handle toggle changes
  const handleAppAlertsToggle = (value: boolean) => {
    setAppAlerts(value);
    savePreferences({
      notifications: {
        ...profile?.preferences.notifications,
        appAlerts: value
      }
    });
  };

  const handleMarketingPromotionsToggle = (value: boolean) => {
    setMarketingPromotions(value);
    savePreferences({
      notifications: {
        ...profile?.preferences.notifications,
        marketingPromotions: value
      }
    });
  };

  const handleInGameRemindersToggle = (value: boolean) => {
    setInGameReminders(value);
    savePreferences({
      notifications: {
        ...profile?.preferences.notifications,
        inGameReminders: value
      }
    });
  };

  const handleThemeToggle = (value: boolean) => {
    setIsDarkMode(value);
    savePreferences({
      theme: value ? 'dark' : 'neon-purple'
    });
  };

  // Save preferences to the store
  const savePreferences = async (preferencesUpdate: any) => {
    try {
      await updateProfile({
        preferences: {
          ...profile?.preferences,
          ...preferencesUpdate
        }
      });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  // Handle navigation to next screen
  const handleNext = () => {
    navigation.navigate('Home');
  };

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.content}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🔔</Text>
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          
          {/* App Alerts Toggle */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>App Alerts</Text>
            <Switch
              value={appAlerts}
              onValueChange={handleAppAlertsToggle}
              trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
              thumbColor={appAlerts ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          
          <View style={styles.divider} />
          
          {/* Marketing Promotions Toggle */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Marketing Promotions</Text>
            <Switch
              value={marketingPromotions}
              onValueChange={handleMarketingPromotionsToggle}
              trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
              thumbColor={marketingPromotions ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          
          <View style={styles.divider} />
          
          {/* In-Game Reminders Toggle */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>In-Game Reminders</Text>
            <Switch
              value={inGameReminders}
              onValueChange={handleInGameRemindersToggle}
              trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
              thumbColor={inGameReminders ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>
        
        {/* Appearance Mode Section */}
        <View style={styles.section}>
          <Text style={styles.appearanceTitle}>Appearance Mode</Text>
          
          <View style={styles.themeToggleContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#3e3e3e', true: '#3e3e3e' }}
              thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={styles.themeToggle}
            />
          </View>
          
          <View style={styles.themeTextContainer}>
            <Text style={styles.currentThemeText}>
              midas is {isDarkMode ? 'dark' : 'light'} mode
            </Text>
            <Text style={styles.themeInstructionText}>
              Toggle the switch to change mode
            </Text>
          </View>
        </View>
      </View>
      
      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: fonts.fontFamily.pixel,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.fontFamily.pixel,
  },
  divider: {
    height: 1,
    backgroundColor: '#1c1c1e',
  },
  appearanceTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  themeToggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  themeToggle: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  themeTextContainer: {
    alignItems: 'center',
  },
  currentThemeText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  themeInstructionText: {
    color: '#8E8E93',
    fontSize: 16,
    fontFamily: fonts.fontFamily.pixel,
  },
  bottomContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  nextButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7a1cf7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default PreferencesScreen;
