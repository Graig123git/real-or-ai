import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { SvgXml } from 'react-native-svg';
import fonts from '../theme/fonts';

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
const isSmallDevice = screenWidth < 375; // iPhone SE, 5, etc.

// Scale factor for smaller devices
const scale = isSmallDevice ? 0.85 : 1;

// Function to scale sizes based on device width
const size = (size: number): number => {
  return Math.round(size * scale);
};

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
          {/* Background and profile image container */}
          <View style={styles.profileImageContainer}>
            {/* Background image */}
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1000' }} 
              style={styles.backgroundImage} 
            />
            
            {/* Camera icon for background */}
            <TouchableOpacity style={styles.backgroundCameraButton}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
            
            {/* Profile image with glow */}
            <View style={styles.profileImageOuterGlow}>
              <View style={styles.profileImageInnerGlow}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                  style={styles.profileImage} 
                />
                
                {/* Camera icon for profile */}
                <TouchableOpacity style={styles.profileCameraButton}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </TouchableOpacity>
              </View>
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
        <View style={{ height: 40 }} />
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
    paddingHorizontal: 16,
    paddingTop: isSmallDevice ? 8 : 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    height: isSmallDevice ? 50 : 60,
  },
  // New profile image container styles
  profileImageContainer: {
    height: isSmallDevice ? screenWidth * 0.4 : screenWidth * 0.5,
    position: 'relative',
    marginBottom: isSmallDevice ? 40 : 50,
    borderRadius: 0,
    overflow: 'visible',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundCameraButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: size(32),
    height: size(32),
    borderRadius: size(16),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  profileCameraButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: size(36),
    height: size(36),
    borderRadius: size(18),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#bf00ff',
  },
  cameraIcon: {
    fontSize: size(16),
  },
  headerTitle: {
    color: 'white',
    fontSize: size(18),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 2,
  },
  profileCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 0,
    paddingBottom: 12,
    marginBottom: 6,
    alignItems: 'center',
    width: '99%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  // Profile image with glow effects
  profileImageOuterGlow: {
    position: 'absolute',
    bottom: isSmallDevice ? -screenWidth * 0.12 : -screenWidth * 0.15,
    alignSelf: 'center',
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bf00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 15,
    zIndex: 3,
  },
  profileImageInnerGlow: {
    width: size(90),
    height: size(90),
    borderRadius: size(45),
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bf00ff',
  },
  profileImage: {
    width: size(80),
    height: size(80),
    borderRadius: size(40),
  },
  
  // Username and level styling
  username: {
    color: 'white',
    fontSize: size(20),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginTop: isSmallDevice ? 40 : 50,
    marginBottom: 8,
    textShadowColor: 'rgba(191, 0, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  levelBadge: {
    backgroundColor: '#8a20ff',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#bf00ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  levelText: {
    color: 'white',
    fontSize: size(12),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  
  // Enhanced XP bar styling
  xpContainerWrapper: {
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  xpContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 2,
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
    paddingHorizontal: 4,
    marginTop: 2,
  },
  xpText: {
    color: '#999',
    fontSize: size(10),
    fontFamily: fonts.fontFamily.pixel,
    fontWeight: 'bold',
  },
  xpPercentage: {
    color: '#4CAF50',
    fontSize: size(10),
    fontFamily: fonts.fontFamily.pixel,
    fontWeight: 'bold',
  },
  
  // Stats row styling
  statsRow: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    marginHorizontal: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: size(16),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  statLabel: {
    color: '#999',
    fontSize: size(10),
    fontFamily: fonts.fontFamily.pixel,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#444',
  },
  upgradeCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
    width: '99%',
    alignSelf: 'center',
  },
  upgradeTitle: {
    color: 'white',
    fontSize: size(18),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 8,
  },
  upgradeDescription: {
    color: '#ccc',
    fontSize: size(12),
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 12,
    lineHeight: size(16),
  },
  planOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  planDetails: {
    flex: 1,
  },
  planTitle: {
    color: 'white',
    fontSize: size(14),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  saveText: {
    color: '#4CAF50',
    fontSize: size(10),
    fontFamily: fonts.fontFamily.pixel,
  },
  planPrice: {
    color: 'white',
    fontSize: size(14),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  getProButton: {
    backgroundColor: '#8a20ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  getProButtonText: {
    color: 'white',
    fontSize: size(14),
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: fonts.fontFamily.pixel,
  },
  coinPacksCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
    width: '99%',
    alignSelf: 'center',
  },
  coinPacksTitle: {
    color: 'white',
    fontSize: size(18),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 8,
  },
  coinPacksDescription: {
    color: '#ccc',
    fontSize: size(12),
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 12,
    lineHeight: size(16),
  },
  coinPackOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  coinPackDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coinAmount: {
    color: 'white',
    fontSize: size(14),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginLeft: 10,
  },
  coinPrice: {
    color: '#999',
    fontSize: size(12),
    fontFamily: fonts.fontFamily.pixel,
    marginLeft: 10,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buyButtonText: {
    color: 'white',
    fontSize: size(12),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  viewAllPacksButton: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  viewAllPacksButtonText: {
    color: '#4CAF50',
    fontSize: size(14),
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: fonts.fontFamily.pixel,
  },
  preferencesCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
    width: '99%',
    alignSelf: 'center',
  },
  preferencesTitle: {
    color: 'white',
    fontSize: size(18),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 12,
  },
  preferenceOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  preferenceIconContainer: {
    width: size(30),
    height: size(30),
    borderRadius: size(15),
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  preferenceText: {
    color: 'white',
    fontSize: size(14),
    fontFamily: fonts.fontFamily.pixel,
    flex: 1,
  },
  dangerZoneCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
    width: '99%',
    alignSelf: 'center',
  },
  dangerZoneTitle: {
    color: 'white',
    fontSize: size(18),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 12,
  },
  deleteAccountButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: '#FF3B30',
    fontSize: size(14),
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default ProfileScreen;
