import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { SvgXml } from 'react-native-svg';
import theme from '../theme';

type AchievementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Achievement'>;

type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
};

// SVG content for icons
const brainIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 6C13 6 11 8 11 10C11 12 13 14 14 14C14 16 12 18 12 20C12 22 14 24 16 24C18 24 20 22 20 20C20 18 18 16 18 14C19 14 21 12 21 10C21 8 19 6 16 6Z" fill="white"/>
</svg>`;

const gavelIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 16L20 14L22 16L20 18L18 16Z" fill="white"/>
<path d="M14 12L16 10L18 12L16 14L14 12Z" fill="white"/>
<path d="M10 18L12 16L14 18L12 20L10 18Z" fill="white"/>
</svg>`;

const eyeIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 10C12 10 8 14 8 16C8 18 12 22 16 22C20 22 24 18 24 16C24 14 20 10 16 10ZM16 12C18 12 20 14 20 16C20 18 18 20 16 20C14 20 12 18 12 16C12 14 14 12 16 12Z" fill="white"/>
</svg>`;

const earIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8C12 8 10 12 10 16V20C10 22 12 24 14 24H16V20H14V16C14 14 15 12 16 12C17 12 18 14 18 16V20C18 22 16 24 14 24H16C18 24 20 22 20 20V16C20 12 18 8 16 8Z" fill="white"/>
</svg>`;

const textIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10H16V14H14V22H10V14H8V10ZM18 10H24V14H20V22H18V10Z" fill="white"/>
</svg>`;

const starIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8L18 14H24L19 18L21 24L16 20L11 24L13 18L8 14H14L16 8Z" fill="white"/>
</svg>`;

const lockIcon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="20" width="24" height="20" rx="2" fill="white"/>
<path d="M16 20V14C16 10 20 8 24 8C28 8 32 10 32 14V20" stroke="white" stroke-width="4"/>
</svg>`;

// Tab bar icons
const homeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4L4 10V20H9V14H15V20H20V10L12 4Z" fill="white"/>
</svg>`;

const trophyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 4H16V6H18V10C18 12 16 14 14 14C14 16 12 18 10 18H14C16 18 18 16 18 14H20V6H22V4H8ZM6 4V6H4V10C4 12 6 14 8 14C8 16 10 18 12 18H8C6 18 4 16 4 14H2V6H0V4H6Z" fill="white"/>
</svg>`;

const achievementsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#bf00ff"/>
</svg>`;

const storeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20V8H22L18 14H6L2 8H4V4ZM6 16H18V18H6V16Z" fill="white"/>
</svg>`;

const profileIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
<circle cx="12" cy="8" r="3" fill="white"/>
<path d="M6 18C6 15 8 12 12 12C16 12 18 15 18 18" fill="white"/>
</svg>`;

// Achievement Card Component
const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  const { title, description, unlocked, icon } = achievement;
  
  return (
    <View style={styles.achievementCard}>
      <View style={styles.achievementIconContainer}>
        <SvgXml xml={icon} width={32} height={32} />
      </View>
      
      <Text style={styles.achievementTitle}>{title}</Text>
      
      <Text style={styles.achievementDescription}>
        {description}
      </Text>
      
      {!unlocked && (
        <View style={styles.lockedOverlay}>
          <SvgXml xml={`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="14" width="16" height="12" rx="2" fill="white"/>
            <path d="M10 14V10C10 8 12 6 16 6C20 6 22 8 22 10V14" stroke="white" stroke-width="2"/>
          </svg>`} width={32} height={32} />
          <Text style={styles.lockedText}>Locked</Text>
        </View>
      )}
    </View>
  );
};

const AchievementScreen = () => {
  const navigation = useNavigation<AchievementScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // 2 columns with padding
  
  // Mock achievements data based on the image
  const achievements: Achievement[] = [
    {
      id: 'ai_hunter',
      title: 'AI Hunter',
      description: 'Correctly identify 100 AI-generated pieces of content across all categories.',
      unlocked: true,
      icon: brainIcon
    },
    {
      id: 'truth_seeker',
      title: 'Truth Seeker',
      description: 'Achieve 90% accuracy in a single game round in at least 5 different categories.',
      unlocked: true,
      icon: gavelIcon
    },
    {
      id: 'sharp_eye',
      title: 'Sharp Eye',
      description: 'Spot subtle AI anomalies in visual content 50 times.',
      unlocked: false,
      icon: eyeIcon
    },
    {
      id: 'audio_maestro',
      title: 'Audio Maestro',
      description: 'Distinguish real vs AI-generated audio clips 75 times.',
      unlocked: false,
      icon: earIcon
    },
    {
      id: 'detective',
      title: 'Detective',
      description: 'Identify AI-written text with high accuracy in 25 rounds.',
      unlocked: false,
      icon: textIcon
    },
    {
      id: 'mixed_master',
      title: 'Mixed Mode Master',
      description: 'Win 10 Mixed Mode games with over 80% accuracy.',
      unlocked: false,
      icon: starIcon
    }
  ];
  
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarIcons}>
          <Text style={styles.statusBarIcon}>•••</Text>
          <Text style={styles.statusBarIcon}>📶</Text>
          <Text style={styles.statusBarIcon}>🔋</Text>
        </View>
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Achievement</Text>
      </View>
      
      {/* Divider */}
      <View style={styles.divider} />
      
      {/* Achievements Grid */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={[styles.cardContainer, { width: cardWidth }]}>
              <AchievementCard achievement={achievement} />
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* No custom tab bar needed - using React Navigation's Tab Navigator */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Courier',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 0,
  },
  scrollContainer: {
    flex: 1,
    padding: 12,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    height: 180,
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  },
  achievementIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2a1a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#a0a0a0',
    fontFamily: 'Courier',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'Courier',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#bf00ff',
  },
  tabText: {
    color: 'white',
    fontSize: 10,
    marginTop: 4,
    fontFamily: 'Courier',
  },
  activeTabText: {
    color: '#bf00ff',
  },
});

export default AchievementScreen;
