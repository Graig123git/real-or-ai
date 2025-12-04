import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useUserProfileStore from '../state/userProfileStore';
import Slider from '@react-native-community/slider';

type PreferencesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preferences'>;

const PreferencesScreen = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  const { profile, setTempProfile } = useUserProfileStore();
  
  // Initialize state with current preferences from the store
  const [appAlerts, setAppAlerts] = useState(profile?.preferences.notifications.appAlerts ?? true);
  const [marketingPromotions, setMarketingPromotions] = useState(profile?.preferences.notifications.marketingPromotions ?? false);
  const [inGameReminders, setInGameReminders] = useState(profile?.preferences.notifications.inGameReminders ?? true);
  const [isDarkMode, setIsDarkMode] = useState(profile?.preferences.theme === 'dark');
  const [audioSfxIntensity, setAudioSfxIntensity] = useState(profile?.preferences.audioSfxIntensity ?? 70);

  // Handle toggle changes - only update local state, don't save to backend yet
  const handleAppAlertsToggle = (value: boolean) => {
    setAppAlerts(value);
  };

  const handleMarketingPromotionsToggle = (value: boolean) => {
    setMarketingPromotions(value);
  };

  const handleInGameRemindersToggle = (value: boolean) => {
    setInGameReminders(value);
  };

  const handleThemeToggle = (value: boolean) => {
    setIsDarkMode(value);
  };

  const handleAudioSfxIntensityChange = (value: number) => {
    setAudioSfxIntensity(value);
  };

  // Collect all preferences to pass to the next screen
  const collectPreferences = () => {
    const theme: 'dark' | 'neon-purple' | 'neon-green' = isDarkMode ? 'dark' : 'neon-purple';
    
    return {
      notifications: {
        appAlerts,
        marketingPromotions,
        inGameReminders
      },
      theme,
      audioSfxIntensity
    };
  };

  // Handle navigation to next screen
  const handleNext = () => {
    // Collect all preferences
    const updatedPreferences = collectPreferences();
    
    // Store preferences in the user profile store's tempProfile
    setTempProfile({
      preferences: updatedPreferences
    });
    
    // Navigate to confirmation screen
    navigation.navigate('Confirmation');
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
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Notifications Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🔔</Text>
              <Text style={styles.sectionTitle}>Notifications</Text>
            </View>
            
            {/* App Alerts Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>App Alerts</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  appAlerts ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {appAlerts ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={appAlerts}
                  onValueChange={handleAppAlertsToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={appAlerts ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Marketing Promotions Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Marketing Promotions</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  marketingPromotions ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {marketingPromotions ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={marketingPromotions}
                  onValueChange={handleMarketingPromotionsToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={marketingPromotions ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* In-Game Reminders Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>In-Game Reminders</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  inGameReminders ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {inGameReminders ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={inGameReminders}
                  onValueChange={handleInGameRemindersToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={inGameReminders ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
          </View>
          
          {/* Appearance Mode Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleCentered}>Appearance Mode</Text>
            
            <View style={styles.themeToggleContainer}>
              <View style={styles.customToggle}>
                <TouchableOpacity 
                  style={[styles.toggleOption, !isDarkMode && styles.selectedToggleOption]}
                  onPress={() => handleThemeToggle(false)}
                >
                  <Text style={styles.sunIcon}>☀️</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleOption, isDarkMode && styles.selectedToggleOption]}
                  onPress={() => handleThemeToggle(true)}
                >
                  <Text style={styles.moonIcon}>🌙</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.themeTextContainer}>
              <Text style={styles.currentThemeText}>
                midas is <Text style={styles.highlightedText}>{isDarkMode ? 'dark' : 'light'}</Text> mode
              </Text>
              <Text style={styles.themeInstructionText}>
                Toggle the switch to change mode
              </Text>
            </View>
          </View>

          {/* Audio SFX Intensity Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleCentered}>Audio SFX Intensity</Text>
            
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={audioSfxIntensity}
                onValueChange={handleAudioSfxIntensityChange}
                minimumTrackTintColor="#7a1cf7"
                maximumTrackTintColor="#3e3e3e"
                thumbTintColor="#9d4eff"
              />
              <Text style={styles.sliderValueText}>
                <Text style={styles.highlightedText}>{Math.round(audioSfxIntensity)}%</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    color: '#9d4eff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  sectionTitleCentered: {
    color: '#9d4eff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleStateText: {
    marginRight: 8,
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  toggleStateOn: {
    color: '#9d4eff',
  },
  toggleStateOff: {
    color: '#8E8E93',
  },
  divider: {
    height: 1,
    backgroundColor: '#2c2c2e',
    marginVertical: 4,
  },
  themeToggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  customToggle: {
    width: 120,
    height: 60,
    backgroundColor: '#2c2c2e',
    borderRadius: 30,
    flexDirection: 'row',
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
  },
  selectedToggleOption: {
    backgroundColor: '#3e3e3e',
  },
  sunIcon: {
    fontSize: 24,
  },
  moonIcon: {
    fontSize: 24,
    color: '#f8e71c',
  },
  themeTextContainer: {
    alignItems: 'center',
  },
  currentThemeText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  highlightedText: {
    color: '#9d4eff',
    fontWeight: 'bold',
  },
  themeInstructionText: {
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  sliderContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValueText: {
    color: 'white',
    fontSize: 18,
    marginTop: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#000000',
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
