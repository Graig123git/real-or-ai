import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import theme from '../theme';
import { SvgXml } from 'react-native-svg';

// Import SVG icons
const zapGreenSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1213 0.873521C11.3308 0.852915 11.5424 0.885888 11.7357 0.969162L11.8306 1.01537L11.9214 1.06886C12.0978 1.1835 12.2421 1.34116 12.3412 1.52682L12.3874 1.62166L12.4247 1.72054C12.4909 1.92003 12.5059 2.13313 12.4677 2.3398L12.4433 2.44274C12.4404 2.45348 12.4378 2.46455 12.4344 2.47516L10.8409 7.47137L10.8271 7.51028L16.6395 7.51028C16.9528 7.50967 17.2601 7.59741 17.5254 7.76398C17.7915 7.93098 18.0043 8.17043 18.1399 8.45378C18.2754 8.73706 18.3283 9.05287 18.2914 9.36479C18.2592 9.63769 18.1597 9.89773 18.0029 10.1218L17.9316 10.2159L17.8829 10.271L9.66559 18.7371L9.66476 18.7363C9.48324 18.9305 9.24528 19.0632 8.98308 19.1116C8.70544 19.163 8.41835 19.1184 8.16931 18.9852C7.92031 18.852 7.72389 18.6375 7.61247 18.3781C7.50117 18.1187 7.48168 17.8292 7.55654 17.557L7.56545 17.5246L9.15895 12.5284L9.17273 12.4903L3.35953 12.4903C3.04652 12.4907 2.73956 12.4022 2.47441 12.2358C2.20855 12.0688 1.99558 11.83 1.86002 11.5468C1.72442 11.2634 1.67158 10.9469 1.70844 10.6349C1.74534 10.3231 1.87048 10.0277 2.06833 9.78385L2.11696 9.72874L10.3343 1.2634C10.5158 1.06914 10.7545 0.937439 11.0167 0.888917L11.1213 0.873521ZM3.36196 10.8303L9.1695 10.8303C9.43725 10.8298 9.70119 10.894 9.93874 11.0175C10.1769 11.1414 10.3819 11.3208 10.5353 11.5411C10.6887 11.7615 10.7863 12.0164 10.8198 12.2828C10.8516 12.5356 10.8219 12.7913 10.7388 13.0317L10.7412 13.0326L9.68991 16.3282L16.6379 9.17032L10.8295 9.17032C10.5622 9.17065 10.2984 9.10641 10.0612 8.98307C9.82295 8.85915 9.61803 8.67896 9.46456 8.45859C9.31126 8.23836 9.21365 7.98404 9.18004 7.71778C9.14816 7.46461 9.17688 7.20798 9.2603 6.96721H9.25872L10.3092 3.67072L3.36196 10.8303Z" fill="#00FF55"/>
</svg>`;

const zapPurpleSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1213 0.873521C11.3308 0.852915 11.5424 0.885888 11.7357 0.969162L11.8306 1.01537L11.9214 1.06886C12.0978 1.1835 12.2421 1.34116 12.3412 1.52682L12.3874 1.62166L12.4247 1.72054C12.4909 1.92003 12.5059 2.13313 12.4677 2.3398L12.4433 2.44274C12.4404 2.45348 12.4378 2.46455 12.4344 2.47516L10.8409 7.47137L10.8271 7.51028L16.6395 7.51028C16.9528 7.50967 17.2601 7.59741 17.5254 7.76398C17.7915 7.93098 18.0043 8.17043 18.1399 8.45378C18.2754 8.73706 18.3283 9.05287 18.2914 9.36479C18.2592 9.63769 18.1597 9.89773 18.0029 10.1218L17.9316 10.2159L17.8829 10.271L9.66559 18.7371L9.66476 18.7363C9.48324 18.9305 9.24528 19.0632 8.98308 19.1116C8.70544 19.163 8.41835 19.1184 8.16931 18.9852C7.92031 18.852 7.72389 18.6375 7.61247 18.3781C7.50117 18.1187 7.48168 17.8292 7.55654 17.557L7.56545 17.5246L9.15895 12.5284L9.17273 12.4903L3.35953 12.4903C3.04652 12.4907 2.73956 12.4022 2.47441 12.2358C2.20855 12.0688 1.99558 11.83 1.86002 11.5468C1.72442 11.2634 1.67158 10.9469 1.70844 10.6349C1.74534 10.3231 1.87048 10.0277 2.06833 9.78385L2.11696 9.72874L10.3343 1.2634C10.5158 1.06914 10.7545 0.937439 11.0167 0.888917L11.1213 0.873521ZM3.36196 10.8303L9.1695 10.8303C9.43725 10.8298 9.70119 10.894 9.93874 11.0175C10.1769 11.1414 10.3819 11.3208 10.5353 11.5411C10.6887 11.7615 10.7863 12.0164 10.8198 12.2828C10.8516 12.5356 10.8219 12.7913 10.7388 13.0317L10.7412 13.0326L9.68991 16.3282L16.6379 9.17032L10.8295 9.17032C10.5622 9.17065 10.2984 9.10641 10.0612 8.98307C9.82295 8.85915 9.61803 8.67896 9.46456 8.45859C9.31126 8.23836 9.21365 7.98404 9.18004 7.71778C9.14816 7.46461 9.17688 7.20798 9.2603 6.96721H9.25872L10.3092 3.67072L3.36196 10.8303Z" fill="#ff00ff"/>
</svg>`;

type LeaderboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Leaderboard'>;

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
  accuracy: number;
  country: string;
  isCurrentUser?: boolean;
  highlighted?: boolean;
};

const LeaderboardTab = ({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.tab, active && styles.activeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

// Helper function to get avatar image URL based on username
const getAvatarUrl = (username: string) => {
  // Use a service that provides human avatars
  // We'll use a hash of the username to get a consistent avatar for each user
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gender = hash % 2 === 0 ? 'men' : 'women';
  const id = hash % 100; // Get a number between 0-99
  
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => (
  <View style={[
    styles.leaderboardRow, 
    entry.isCurrentUser && styles.currentUserRow,
    entry.highlighted && styles.highlightedRow
  ]}>
    <Text style={[styles.rankText, entry.isCurrentUser && styles.currentUserText]}>
      {entry.rank}
    </Text>
    
    <View style={styles.userContainer}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: getAvatarUrl(entry.username) }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={[styles.usernameText, entry.isCurrentUser && styles.currentUserText]}>
          {entry.username}
        </Text>
        <View style={styles.countryAccuracyRow}>
          <Text style={styles.countryText}>{entry.country}</Text>
          <Text style={styles.accuracyText}>{entry.accuracy}% Accuracy</Text>
        </View>
      </View>
    </View>
    
    <View style={styles.scoreContainer}>
      <SvgXml 
        xml={entry.isCurrentUser ? zapPurpleSvg : zapGreenSvg} 
        width={16} 
        height={16} 
      />
      <Text style={[styles.scoreText, entry.isCurrentUser && styles.currentUserText]}>
        {entry.score.toLocaleString()}
      </Text>
    </View>
  </View>
);

const LeaderboardScreen = () => {
  const navigation = useNavigation<LeaderboardScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState('global');
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    
    // In a real app, you would fetch new data here
    // For example:
    // fetchLeaderboardData().then(() => setRefreshing(false));
  }, []);
  
  const dailyLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'NeonGamer', score: 15432, accuracy: 98, country: '🇺🇸', highlighted: false },
    { rank: 2, username: 'AIWhisperer', score: 14876, accuracy: 97, country: '🇬🇧', highlighted: true },
    { rank: 3, username: 'DataDiva', score: 13567, accuracy: 95, country: '🇨🇦', highlighted: false },
    { rank: 4, username: 'CodeMaestro', score: 12987, accuracy: 94, country: '🇮🇳', highlighted: true },
    { rank: 5, username: 'PixelPirate', score: 12109, accuracy: 93, country: '🇦🇺', highlighted: false },
    { rank: 6, username: 'SynthSorcerer', score: 11500, accuracy: 92, country: '🇯🇵', highlighted: false },
    { rank: 7, username: 'QuantumQuasar', score: 10870, accuracy: 91, country: '🇧🇷', highlighted: false },
    { rank: 8, username: 'CyberPhoenix', score: 10250, accuracy: 90, country: '🇩🇪', highlighted: false },
    { rank: 9, username: 'TechTitan', score: 9800, accuracy: 89, country: '🇫🇷', highlighted: false },
    { rank: 10, username: 'YourUsername', score: 9500, accuracy: 88, country: '🇨🇦', isCurrentUser: true, highlighted: false },
    { rank: 11, username: 'ByteMaster', score: 9200, accuracy: 87, country: '🇪🇸', highlighted: false },
    { rank: 12, username: 'DigitalNomad', score: 8900, accuracy: 86, country: '🇮🇹', highlighted: false },
    { rank: 13, username: 'CyberSamurai', score: 8700, accuracy: 85, country: '🇯🇵', highlighted: false },
    { rank: 14, username: 'AlgoRhythm', score: 8500, accuracy: 84, country: '🇰🇷', highlighted: false },
    { rank: 15, username: 'CodeCrusader', score: 8300, accuracy: 83, country: '🇸🇪', highlighted: false },
    { rank: 16, username: 'PixelPerfect', score: 8100, accuracy: 82, country: '🇳🇴', highlighted: false },
    { rank: 17, username: 'DataDragon', score: 7900, accuracy: 81, country: '🇨🇳', highlighted: false },
    { rank: 18, username: 'TechMage', score: 7700, accuracy: 80, country: '🇷🇺', highlighted: false },
    { rank: 19, username: 'BinaryBaron', score: 7500, accuracy: 79, country: '🇵🇱', highlighted: false },
    { rank: 20, username: 'QuantumKnight', score: 7300, accuracy: 78, country: '🇮🇳', highlighted: false },
  ];
  
  const allTimeLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'AIWhisperer', score: 154320, accuracy: 98, country: '🇬🇧', highlighted: false },
    { rank: 2, username: 'NeonGamer', score: 148760, accuracy: 97, country: '🇺🇸', highlighted: true },
    { rank: 3, username: 'PixelPirate', score: 135670, accuracy: 96, country: '🇦🇺', highlighted: false },
    { rank: 4, username: 'DataDiva', score: 129870, accuracy: 95, country: '🇨🇦', highlighted: false },
    { rank: 5, username: 'CodeMaestro', score: 121090, accuracy: 94, country: '🇮🇳', highlighted: true },
    { rank: 6, username: 'SynthSorcerer', score: 115000, accuracy: 93, country: '🇯🇵', highlighted: false },
    { rank: 7, username: 'QuantumQuasar', score: 108700, accuracy: 92, country: '🇧🇷', highlighted: false },
    { rank: 8, username: 'CyberPhoenix', score: 102500, accuracy: 91, country: '🇩🇪', highlighted: false },
    { rank: 9, username: 'YourUsername', score: 98000, accuracy: 90, country: '🇨🇦', isCurrentUser: true, highlighted: false },
    { rank: 10, username: 'TechTitan', score: 95000, accuracy: 89, country: '🇫🇷', highlighted: false },
  ];
  
  const friendsLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'YourUsername', score: 98000, accuracy: 90, country: '🇨🇦', isCurrentUser: true, highlighted: false },
    { rank: 2, username: 'Friend1', score: 85000, accuracy: 88, country: '🇺🇸', highlighted: false },
    { rank: 3, username: 'Friend2', score: 72000, accuracy: 86, country: '🇬🇧', highlighted: true },
    { rank: 4, username: 'Friend3', score: 65000, accuracy: 84, country: '🇦🇺', highlighted: false },
    { rank: 5, username: 'Friend4', score: 58000, accuracy: 82, country: '🇯🇵', highlighted: false },
  ];
  
  const getLeaderboardData = () => {
    switch (activeTab) {
      case 'global':
        return dailyLeaderboard;
      case 'friends':
        return friendsLeaderboard;
      default:
        return dailyLeaderboard;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>7:28</Text>
        <View style={styles.statusBarIcons}>
          <Text style={styles.statusBarIcon}>•••</Text>
          <Text style={styles.statusBarIcon}>📶</Text>
          <Text style={styles.statusBarIcon}>🔋</Text>
        </View>
      </View>
      
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.tabContainer}>
        <LeaderboardTab 
          title="Global" 
          active={activeTab === 'global'} 
          onPress={() => setActiveTab('global')} 
        />
        <LeaderboardTab 
          title="Friends" 
          active={activeTab === 'friends'} 
          onPress={() => setActiveTab('friends')} 
        />
      </View>
      
      <ScrollView 
        style={styles.leaderboardContainer}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff00ff" // Bright neon magenta
            colors={["#ff00ff", "#bf00ff", "#9d4eff"]}
            progressBackgroundColor="#111111"
            progressViewOffset={20}
            title="Refreshing..."
            titleColor="#ff00ff"
          />
        }
        showsVerticalScrollIndicator={true}
        bounces={true}
        alwaysBounceVertical={true}
      >
        {getLeaderboardData().map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 0,
  },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#000000',
  },
  statusBarTime: {
    color: 'white',
    fontFamily: 'Courier',
    fontSize: 16,
  },
  statusBarIcons: {
    flexDirection: 'row',
  },
  statusBarIcon: {
    color: 'white',
    marginLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier',
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#9d4eff',
  },
  tabText: {
    color: '#a0a0a0',
    fontWeight: 'bold',
    fontFamily: 'Courier',
    fontSize: 16,
  },
  activeTabText: {
    color: '#9d4eff',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 40, // Add extra padding at the bottom to ensure scrollability
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
  },
  highlightedRow: {
    backgroundColor: '#2a1a3a',
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  currentUserRow: {
    backgroundColor: '#1a2a3a',
    borderWidth: 1,
    borderColor: '#4e8eff',
  },
  rankText: {
    width: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Courier',
  },
  userInfo: {
    flex: 1,
  },
  usernameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 1,
    fontFamily: 'Courier',
  },
  countryAccuracyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryText: {
    fontSize: 11,
    marginRight: 6,
    fontFamily: 'Courier',
  },
  accuracyText: {
    color: '#a0a0a0',
    fontSize: 11,
    fontFamily: 'Courier',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
  },
  scoreIcon: {
    color: '#20ff8a',
    marginRight: 2,
    fontSize: 14,
    fontFamily: 'Courier',
  },
  scoreText: {
    color: '#00FF55',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Courier',
    marginLeft: 4,
  },
  currentUserText: {
    color: '#ff00ff',
  },
});

export default LeaderboardScreen;
