import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useUserProfileStore from '../state/userProfileStore';

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;

const ConfirmationScreen = () => {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();
  const { tempProfile, createProfile } = useUserProfileStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleFinish = async () => {
    try {
      setIsCreating(true);
      
      // Create the user profile
      await createProfile();
      
      // Navigate to the main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Summary</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Profile</Text>
          
          <View style={styles.profileContainer}>
            {/* Profile image with purple border */}
            <Image 
              source={{ uri: tempProfile.avatarUrl || 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.profileImage} 
            />
            
            {/* Name displayed prominently */}
            <Text style={styles.profileName}>{tempProfile.name || 'User'}</Text>
            
            {/* Country with flag badge - styled like the image */}
            {tempProfile.country && (
              <View style={styles.countryBadgeContainer}>
                <View style={styles.countryBadge}>
                  <Text style={styles.countryBadgeText}>{tempProfile.country}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        
        {/* Preferences Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Preferences</Text>
          
          <View style={styles.preferencesSection}>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>App Alerts</Text>
              <Text style={styles.preferenceValue}>
                {tempProfile.preferences?.notifications?.appAlerts ? 'On' : 'Off'}
              </Text>
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Marketing Promotions</Text>
              <Text style={styles.preferenceValue}>
                {tempProfile.preferences?.notifications?.marketingPromotions ? 'On' : 'Off'}
              </Text>
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>In-Game Reminders</Text>
              <Text style={styles.preferenceValue}>
                {tempProfile.preferences?.notifications?.inGameReminders ? 'On' : 'Off'}
              </Text>
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Theme</Text>
              <Text style={styles.preferenceValue}>
                {tempProfile.preferences?.theme === 'dark' ? 'Dark' : 
                 tempProfile.preferences?.theme === 'neon-purple' ? 'Neon Purple' : 
                 tempProfile.preferences?.theme === 'neon-green' ? 'Neon Green' : 'Dark'}
              </Text>
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>SFX Intensity</Text>
              <Text style={styles.preferenceValue}>
                {tempProfile.preferences?.audioSfxIntensity || 70}%
              </Text>
            </View>
          </View>
        </View>
        
        {/* Terms and Privacy */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
      
      {/* Finish Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.finishButton, isCreating && styles.finishButtonDisabled]}
          onPress={handleFinish}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.finishButtonText}>Finish</Text>
          )}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  summaryCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  summaryTitle: {
    color: '#9d4eff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: fonts.fontFamily.pixel,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#9d4eff',
    marginBottom: 12,
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  countryBadgeContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  preferencesSection: {
    
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  preferenceLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  preferenceValue: {
    color: '#9d4eff',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  countryBadge: {
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#9d4eff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  countryBadgeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    textAlign: 'center',
  },
  termsSection: {
    marginBottom: 24,
  },
  termsText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.fontFamily.pixel,
  },
  termsLink: {
    color: '#9d4eff',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  finishButton: {
    backgroundColor: '#9d4eff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  finishButtonDisabled: {
    backgroundColor: '#4a4a4a',
    shadowOpacity: 0,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default ConfirmationScreen;
