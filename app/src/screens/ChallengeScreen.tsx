import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { SvgXml } from 'react-native-svg';

type ChallengeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Challenge'>;

// SVG Icons
const userPlusIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 8V14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 11H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const swordsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 17.5L3 6V3H6L17.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 19L19 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 16L20 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 21L21 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 6.5L18 3L21 6L17.5 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 13.5L11 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 16L7 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 19L5 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const settingsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#bf00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#bf00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const backIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 12H5" stroke="#bf00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 19L5 12L12 5" stroke="#bf00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ChallengeScreen = () => {
  const navigation = useNavigation<ChallengeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Challenge</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Ready for the ultimate duel?</Text>
          <Text style={styles.subtitle}>
            Challenge friends or face a random opponent in the ultimate AI detection game.
          </Text>

          {/* Invite Friend Button */}
          <TouchableOpacity style={styles.inviteButton}>
            <SvgXml xml={userPlusIcon} width={20} height={20} />
            <Text style={styles.buttonText}>Invite Friend</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Incoming Challenge Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incoming Challenge</Text>
          
          {/* Scrollable Challenge Cards */}
          <ScrollView 
            style={styles.challengeList}
            showsVerticalScrollIndicator={false}
          >
            {/* Challenge Card - Smaller and more compact */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
                    style={styles.avatar} 
                  />
                  <View style={styles.onlineIndicator} />
                  <View>
                    <Text style={styles.username}>CyberNinja_AI</Text>
                    <Text style={styles.challengeText}>challenges you to a duel!</Text>
                  </View>
                </View>
                <Text style={styles.timeAgo}>2 hours ago</Text>
              </View>
              
              <View style={styles.challengeActions}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Additional Challenge Card */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                    style={styles.avatar} 
                  />
                  <View style={styles.onlineIndicator} />
                  <View>
                    <Text style={styles.username}>AIDetector_Pro</Text>
                    <Text style={styles.challengeText}>challenges you to a duel!</Text>
                  </View>
                </View>
                <Text style={styles.timeAgo}>5 hours ago</Text>
              </View>
              
              <View style={styles.challengeActions}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Third Challenge Card for demonstration */}
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/women/22.jpg' }} 
                    style={styles.avatar} 
                  />
                  <View style={styles.onlineIndicator} />
                  <View>
                    <Text style={styles.username}>TechWizard</Text>
                    <Text style={styles.challengeText}>challenges you to a duel!</Text>
                  </View>
                </View>
                <Text style={styles.timeAgo}>8 hours ago</Text>
              </View>
              
              <View style={styles.challengeActions}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Quick Match Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Match</Text>
          
          <View style={styles.quickMatchCard}>
            <Text style={styles.quickMatchTitle}>Instant Duel</Text>
            <Text style={styles.quickMatchDescription}>
              Jump into a quick match against a random opponent and test your skills.
            </Text>
            
            <TouchableOpacity style={styles.quickMatchButton}>
              <SvgXml xml={swordsIcon} width={24} height={24} />
              <Text style={styles.quickMatchButtonText}>Play Quick Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Get screen dimensions for responsive layout
const { width, height } = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;

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
  content: {
    flex: 1,
    padding: screenWidth * 0.04,
  },
  titleSection: {
    marginBottom: screenHeight * 0.015,
  },
  section: {
    marginBottom: screenHeight * 0.015,
  },
  mainTitle: {
    color: '#bf00ff',
    fontSize: Math.min(26, screenWidth * 0.065),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.008,
    fontFamily: 'Courier',
  },
  subtitle: {
    color: 'white',
    fontSize: Math.min(14, screenWidth * 0.035),
    textAlign: 'center',
    marginBottom: screenHeight * 0.015,
    lineHeight: 20,
    fontFamily: 'Courier',
  },
  inviteButton: {
    backgroundColor: '#bf00ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    borderRadius: 8,
    marginBottom: screenHeight * 0.015,
  },
  buttonText: {
    color: 'white',
    fontSize: Math.min(16, screenWidth * 0.04),
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Courier',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: Math.min(14, screenWidth * 0.035),
    fontFamily: 'Courier',
  },
  sectionTitle: {
    color: 'white',
    fontSize: Math.min(22, screenWidth * 0.055),
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
    fontFamily: 'Courier',
  },
  challengeList: {
    maxHeight: screenHeight * 0.22, // Slightly reduce the height of the challenge list to give more space to Quick Match
  },
  challengeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: screenWidth * 0.03,
    marginBottom: screenHeight * 0.01,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.006,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
    borderRadius: screenWidth * 0.04,
    marginRight: screenWidth * 0.02,
  },
  onlineIndicator: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    backgroundColor: '#4CAF50',
    borderRadius: screenWidth * 0.01,
    position: 'absolute',
    bottom: 0,
    left: screenWidth * 0.06,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  username: {
    color: 'white',
    fontSize: Math.min(14, screenWidth * 0.035),
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  challengeText: {
    color: '#ccc',
    fontSize: Math.min(12, screenWidth * 0.03),
    fontFamily: 'Courier',
  },
  timeAgo: {
    color: '#666',
    fontSize: Math.min(10, screenWidth * 0.025),
    fontFamily: 'Courier',
    alignSelf: 'flex-start',
  },
  challengeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: screenHeight * 0.004,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: screenHeight * 0.006,
    paddingHorizontal: screenWidth * 0.035,
    borderRadius: 6,
    marginRight: 8,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Courier',
    fontSize: Math.min(12, screenWidth * 0.03),
  },
  declineButton: {
    backgroundColor: '#333',
    paddingVertical: screenHeight * 0.006,
    paddingHorizontal: screenWidth * 0.035,
    borderRadius: 6,
  },
  declineButtonText: {
    color: 'white',
    fontFamily: 'Courier',
    fontSize: Math.min(12, screenWidth * 0.03),
  },
  quickMatchCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: screenWidth * 0.05,
    marginBottom: screenHeight * 0.01,
    minHeight: screenHeight * 0.25, // Make the card taller
    justifyContent: 'space-between', // Distribute content evenly
    elevation: 5, // Add shadow on Android
    shadowColor: '#bf00ff', // Add shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  quickMatchTitle: {
    color: 'white',
    fontSize: Math.min(22, screenWidth * 0.055),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    fontFamily: 'Courier',
    textShadowColor: 'rgba(191, 0, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  quickMatchDescription: {
    color: 'white',
    fontSize: Math.min(14, screenWidth * 0.035),
    textAlign: 'center',
    marginBottom: screenHeight * 0.03,
    lineHeight: 20,
    fontFamily: 'Courier',
    paddingHorizontal: screenWidth * 0.02,
  },
  quickMatchButton: {
    backgroundColor: '#8a20ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.018,
    borderRadius: 12,
    marginTop: screenHeight * 0.02,
    elevation: 3,
    shadowColor: '#bf00ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  quickMatchButtonText: {
    color: 'white',
    fontSize: Math.min(18, screenWidth * 0.045),
    fontWeight: 'bold',
    marginLeft: 12,
    fontFamily: 'Courier',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default ChallengeScreen;
