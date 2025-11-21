import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { SvgXml } from 'react-native-svg';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// SVG Icons
const rocketIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 16.5C5.5 17.5 7 18 8.5 17.5L15.5 21.5V14.5L18 12L21 3L12 6L9.5 8.5H2.5L6.5 15.5C6 17 6.5 18.5 7.5 19.5C8.5 20.5 10 21 11.5 20.5C13 20 14 19 14.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9Z" fill="white"/>
</svg>`;

const diamondIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 9L12 21.5L21.5 9L16.5 2.5H7.5L2.5 9Z" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 9H21.5" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 2.5L12 21.5L16.5 2.5" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const giftIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 12V22H4V12" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 7H2V12H22V7Z" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22V7" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const bellIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const emailIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 6L12 13L2 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Get screen dimensions for responsive layout
const { width, height } = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;

const PlanOption = ({ 
  title, 
  price, 
  saveText 
}: { 
  title: string; 
  price: string; 
  saveText?: string;
}) => (
  <View style={styles.planOption}>
    <View style={styles.planDetails}>
      <Text style={styles.planTitle}>{title}</Text>
      {saveText && <Text style={styles.saveText}>{saveText}</Text>}
    </View>
    <Text style={styles.planPrice}>{price}</Text>
  </View>
);

const CoinPackOption = ({ 
  amount, 
  price 
}: { 
  amount: string; 
  price: string;
}) => (
  <View style={styles.coinPackOption}>
    <View style={styles.coinPackDetails}>
      <SvgXml xml={diamondIcon} width={24} height={24} />
      <Text style={styles.coinAmount}>{amount} Coins</Text>
      <Text style={styles.coinPrice}>${price}</Text>
    </View>
    <TouchableOpacity style={styles.buyButton}>
      <Text style={styles.buyButtonText}>Buy</Text>
    </TouchableOpacity>
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  
  // Mock user data
  const user = {
    username: 'NeoSynth User',
    level: 15,
    xp: 75, // percentage
    isPro: false,
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          {/* Glowing profile image container */}
          <View style={styles.profileImageOuterGlow}>
            <View style={styles.profileImageInnerGlow}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.profileImage} 
              />
            </View>
          </View>
          
          {/* User info with enhanced styling */}
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {user.level}</Text>
          </View>
          
          {/* Enhanced XP bar */}
          <View style={styles.xpContainerWrapper}>
            <View style={styles.xpContainer}>
              <View style={[styles.xpProgress, { width: `${user.xp}%` }]}>
                <View style={styles.xpGlow} />
              </View>
              <View style={styles.xpMarkers}>
                {[0, 25, 50, 75, 100].map(marker => (
                  <View key={marker} style={[styles.xpMarker, marker <= user.xp && styles.xpMarkerPassed]} />
                ))}
              </View>
            </View>
            <View style={styles.xpLabelsContainer}>
              <Text style={styles.xpText}>XP</Text>
              <Text style={styles.xpPercentage}>{user.xp}%</Text>
            </View>
          </View>
          
          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>87%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        {/* Upgrade to Pro Section */}
        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
          <Text style={styles.upgradeDescription}>
            Unlock exclusive features, ad-free experience, and advanced tools with Pro Mode.
          </Text>
          
          <PlanOption title="Monthly Plan" price="$9.99/month" />
          <PlanOption title="Yearly Plan" price="$89.99/year" saveText="Save 20%" />
          <PlanOption title="Lifetime Access" price="$249.99" />
          
          <TouchableOpacity style={styles.getProButton}>
            <Text style={styles.getProButtonText}>Get Pro Access</Text>
            <SvgXml xml={rocketIcon} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Purchase Coin Packs Section */}
        <View style={styles.coinPacksCard}>
          <Text style={styles.coinPacksTitle}>Purchase Coin Packs</Text>
          <Text style={styles.coinPacksDescription}>
            Buy coins to unlock premium content, unique items, and special boosts.
          </Text>
          
          <CoinPackOption amount="500" price="4.99" />
          <CoinPackOption amount="1200" price="9.99" />
          <CoinPackOption amount="2500" price="19.99" />
          
          <TouchableOpacity style={styles.viewAllPacksButton}>
            <Text style={styles.viewAllPacksButtonText}>View All Packs</Text>
            <SvgXml xml={giftIcon} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Account Preferences Section */}
        <View style={styles.preferencesCard}>
          <Text style={styles.preferencesTitle}>Account Preferences</Text>
          
          <View style={styles.preferenceOption}>
            <View style={styles.preferenceIconContainer}>
              <SvgXml xml={bellIcon} width={20} height={20} />
            </View>
            <Text style={styles.preferenceText}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#333', true: '#8a20ff' }}
              thumbColor={pushNotifications ? '#bf00ff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.preferenceOption}>
            <View style={styles.preferenceIconContainer}>
              <SvgXml xml={emailIcon} width={20} height={20} />
            </View>
            <Text style={styles.preferenceText}>Email Alerts</Text>
            <Switch
              value={emailAlerts}
              onValueChange={setEmailAlerts}
              trackColor={{ false: '#333', true: '#8a20ff' }}
              thumbColor={emailAlerts ? '#bf00ff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Danger Zone Section */}
        <View style={styles.dangerZoneCard}>
          <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
          
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    height: screenHeight * 0.08,
  },
  headerTitle: {
    color: 'white',
    fontSize: Math.min(20, screenWidth * 0.05),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  scrollContainer: {
    flex: 1,
    padding: 4,
    paddingTop: 8,
  },
  profileCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  // Profile image with glow effects
  profileImageOuterGlow: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.22,
    borderRadius: screenWidth * 0.11,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
    shadowColor: '#bf00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  profileImageInnerGlow: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: screenWidth * 0.1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bf00ff',
  },
  profileImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: screenWidth * 0.09,
  },
  
  // Username and level styling
  username: {
    color: 'white',
    fontSize: Math.min(22, screenWidth * 0.055),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.01,
    textShadowColor: 'rgba(191, 0, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  levelBadge: {
    backgroundColor: '#8a20ff',
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.006,
    borderRadius: 20,
    marginBottom: screenHeight * 0.02,
    shadowColor: '#bf00ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  levelText: {
    color: 'white',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  
  // Enhanced XP bar styling
  xpContainerWrapper: {
    width: '100%',
    marginBottom: screenHeight * 0.02,
  },
  xpContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: screenHeight * 0.005,
    position: 'relative',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    position: 'relative',
  },
  xpGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 15,
    height: '100%',
    backgroundColor: '#fff',
    opacity: 0.6,
    borderRadius: 6,
  },
  xpMarkers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  xpMarker: {
    width: 2,
    height: '60%',
    backgroundColor: '#555',
    marginTop: '2%',
  },
  xpMarkerPassed: {
    backgroundColor: '#fff',
  },
  xpLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpText: {
    color: '#999',
    fontSize: Math.min(12, screenWidth * 0.03),
    fontFamily: 'Courier',
  },
  xpPercentage: {
    color: '#4CAF50',
    fontSize: Math.min(12, screenWidth * 0.03),
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  
  // Stats row styling
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: screenWidth * 0.03,
    marginTop: screenHeight * 0.01,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: Math.min(18, screenWidth * 0.045),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  statLabel: {
    color: '#999',
    fontSize: Math.min(12, screenWidth * 0.03),
    fontFamily: 'Courier',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: screenHeight * 0.04,
    backgroundColor: '#444',
  },
  upgradeCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: 8,
    width: '100%',
  },
  upgradeTitle: {
    color: 'white',
    fontSize: Math.min(20, screenWidth * 0.05),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.01,
  },
  upgradeDescription: {
    color: '#ccc',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.02,
    lineHeight: 20,
  },
  planOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: screenWidth * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  planDetails: {
    flex: 1,
  },
  planTitle: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  saveText: {
    color: '#4CAF50',
    fontSize: Math.min(12, screenWidth * 0.03),
    fontFamily: 'Courier',
  },
  planPrice: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  getProButton: {
    backgroundColor: '#8a20ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    borderRadius: 12,
    marginTop: screenHeight * 0.01,
  },
  getProButtonText: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Courier',
  },
  coinPacksCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: 8,
    width: '100%',
  },
  coinPacksTitle: {
    color: 'white',
    fontSize: Math.min(20, screenWidth * 0.05),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.01,
  },
  coinPacksDescription: {
    color: '#ccc',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.02,
    lineHeight: 20,
  },
  coinPackOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: screenWidth * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  coinPackDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coinAmount: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginLeft: 10,
  },
  coinPrice: {
    color: '#999',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontFamily: 'Courier',
    marginLeft: 10,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.04,
    borderRadius: 20,
  },
  buyButtonText: {
    color: 'white',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  viewAllPacksButton: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    borderRadius: 12,
    marginTop: screenHeight * 0.01,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  viewAllPacksButtonText: {
    color: '#4CAF50',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Courier',
  },
  preferencesCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: 8,
    width: '100%',
  },
  preferencesTitle: {
    color: 'white',
    fontSize: Math.min(20, screenWidth * 0.05),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.02,
  },
  preferenceOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.015,
  },
  preferenceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  preferenceText: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontFamily: 'Courier',
    flex: 1,
  },
  dangerZoneCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: 8,
    width: '100%',
  },
  dangerZoneTitle: {
    color: 'white',
    fontSize: Math.min(20, screenWidth * 0.05),
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: screenHeight * 0.02,
  },
  deleteAccountButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: screenHeight * 0.015,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: '#FF3B30',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
});

export default ProfileScreen;
