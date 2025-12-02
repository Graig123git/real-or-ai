import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing,
  SafeAreaView,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import theme from '../theme';
import DailyChallengePopup from '../components/DailyChallengePopup';
import ShuffleIcon from '../components/ShuffleIcon';
import VideoIcon from '../components/VideoIcon';
import ImageIcon from '../components/ImageIcon';
import AudioIcon from '../components/AudioIcon';
import HouseIcon from '../components/HouseIcon';
import TrophyIcon from '../components/TrophyIcon';
import AwardIcon from '../components/AwardIcon';
import StoreIcon from '../components/StoreIcon';
import UserIcon from '../components/UserIcon';
import FlipCard from '../components/FlipCard';
import CategoryDetailScreen from '../components/CategoryDetailScreen';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDetailScreen, setShowDetailScreen] = useState(false);
  
  // User level and XP state (mock data - would come from user profile in real app)
  const [userLevel, setUserLevel] = useState(6);
  const [userXP, setUserXP] = useState(720); // Current XP
  const [maxXP, setMaxXP] = useState(1000); // XP needed for next level
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const categoryRotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Create refs for FlipCard components
  const flipCardRefs = useRef<{[key: string]: React.RefObject<any>}>({
    images: React.createRef(),
    videos: React.createRef(),
    audio: React.createRef(),
    text: React.createRef(),
    mixed: React.createRef()
  }).current;
  
  // State to force reset of cards
  const [resetKey, setResetKey] = useState(0);
  
  // Start animations
  useEffect(() => {
    // Pulse animation for category icons
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Rotation animation for mixed mode icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
    
    // Rotation animation for category icons
    Animated.loop(
      Animated.timing(categoryRotateAnim, {
        toValue: 1,
        duration: 5000, // Even faster rotation
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
    
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: userXP / maxXP,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false
    }).start();
    
    // Show the daily challenge popup after a delay
    const timer = setTimeout(() => {
      setShowDailyChallenge(true);
    }, 2500); // 2.5 seconds delay
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle starting a round
  const handleStartRound = () => {
    // Navigate to the gameplay screen with the selected category
    if (selectedCategory) {
      const contentType = selectedCategory === 'mixed' ? 'image' : selectedCategory as 'image' | 'text' | 'audio' | 'video';
      const categoryTitle = selectedCategory === 'mixed' ? 'Mixed Mode' : categories.find(cat => cat.id === selectedCategory)?.detailTitle || 'General';
      
      console.log(`Starting round for category: ${selectedCategory}`);
      navigation.navigate('Gameplay', {
        category: categoryTitle,
        contentType: contentType
      });
    }
    
    // Reset selected category to go back to the grid view
    setSelectedCategory(null);
    setShowDetailScreen(false);
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Show detail screen after a short delay to allow for animation
    setTimeout(() => {
      setShowDetailScreen(true);
    }, 300);
  };
  
  // Handle back from detail screen
  const handleBackFromDetail = () => {
    // First hide the detail screen
    setShowDetailScreen(false);
    
    // Reset the selected category immediately to prevent stale state
    setSelectedCategory(null);
    
    // Force a reset of all cards by incrementing the resetKey
    setResetKey(prev => prev + 1);
  };
  
  // Calculate rotation for icons
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const categorySpin = categoryRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  // Use the ImageIcon component
  const renderImageIcon = () => (
    <Animated.View style={{ transform: [{ scale: pulseAnim }, { rotate: categorySpin }] }}>
      <ImageIcon width={32} height={32} color="#9d4eff" />
    </Animated.View>
  );
  
  // Use the VideoIcon component
  const renderVideoIcon = () => (
    <Animated.View style={{ transform: [{ scale: pulseAnim }, { rotate: categorySpin }] }}>
      <VideoIcon width={32} height={32} color="#20ff8a" />
    </Animated.View>
  );
  
  // Use the AudioIcon component
  const renderAudioIcon = () => (
    <Animated.View style={{ transform: [{ scale: pulseAnim }, { rotate: categorySpin }] }}>
      <AudioIcon width={32} height={32} color="#9d4eff" />
    </Animated.View>
  );
  
  const renderTextIcon = () => (
    <Animated.View style={{ transform: [{ scale: pulseAnim }, { rotate: categorySpin }] }}>
      <View style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 22, height: 26, borderWidth: 1.5, borderColor: '#20ff8a', borderRadius: 3}}>
          <View style={{width: 12, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 8, left: 5}} />
          <View style={{width: 12, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 13, left: 5}} />
          <View style={{width: 8, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 14, left: 4}} />
        </View>
      </View>
    </Animated.View>
  );
  
  // Use the ShuffleIcon component for Mixed Mode
  const renderMixedModeIcon = () => (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <ShuffleIcon width={24} height={24} color="#9d4eff" />
    </Animated.View>
  );
  
  // Define category data with custom icons
  const categories = [
    { 
      id: 'images', 
      title: 'Images', 
      renderIcon: renderImageIcon,
      color: '#9d4eff', // Vibrant purple
      detailTitle: 'Space Exploration', // Example topic for this category
      caption: 'Spot visual AI artifacts'
    },
    { 
      id: 'videos', 
      title: 'Videos', 
      renderIcon: renderVideoIcon,
      color: '#20ff8a', // Vibrant green
      detailTitle: 'Wildlife Documentary',
      caption: 'Detect deepfakes'
    },
    { 
      id: 'audio', 
      title: 'Audio', 
      renderIcon: renderAudioIcon,
      color: '#9d4eff', // Vibrant purple
      detailTitle: 'Music Composition',
      caption: 'Hear synthetic patterns'
    },
    { 
      id: 'text', 
      title: 'Text', 
      renderIcon: renderTextIcon,
      color: '#20ff8a', // Vibrant green
      detailTitle: 'News Article',
      caption: 'Catch AI logic gaps'
    }
  ];

  // Find the selected category
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Render the detail screen if a category is selected
  if (showDetailScreen && selectedCategoryData) {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <CategoryDetailScreen 
          category={{
            id: selectedCategoryData.id,
            title: selectedCategoryData.detailTitle,
            color: selectedCategoryData.color,
            contentType: selectedCategoryData.id as 'image' | 'text' | 'audio' | 'video'
          }}
          onBack={handleBackFromDetail}
          onStartRound={handleStartRound}
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.homeContainer}>
        {/* Clean, Minimal Header */}
        <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : 16 }]}>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileIconContainer}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.profileImage} 
              />
            </View>
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>🔥 Truth or Fake?</Text>
            <Text style={styles.headerTagline}>Test your skills and climb the leaderboard.</Text>
          </View>
          
          <View style={styles.headerSpacer} />
        </View>
        
        {/* XP Progress Bar */}
        <View style={styles.xpContainer}>
          <View style={styles.levelInfo}>
            <Text style={styles.levelText}>Level {userLevel}</Text>
            <Text style={styles.xpText}>{Math.round(userXP / maxXP * 100)}% to Level {userLevel + 1}</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBar, 
                { width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }) }
              ]} 
            />
          </View>
        </View>
        
        {/* Main content */}
        <View style={styles.homeContent}>
          {/* Grid of categories */}
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.categoryCardContainer}
                onPress={() => handleCategorySelect(category.id)}
                activeOpacity={0.7}
              >
                {/* Use the FlipCard component with the correct props */}
                <View style={styles.categoryCard}>
                  <View style={[
                    styles.iconContainer, 
                    { 
                      borderColor: category.color, 
                      borderWidth: 1.5, 
                      borderRadius: 12,
                      shadowColor: category.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 5,
                      elevation: 5
                    }
                  ]}>
                    {category.renderIcon()}
                  </View>
                  <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
                  <Text style={styles.categoryCaption}>{category.caption}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Mixed Mode button */}
          <TouchableOpacity 
            style={[
              styles.mixedModeCard,
              {
                shadowColor: '#9d4eff',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 8
              }
            ]}
            onPress={() => handleCategorySelect('mixed')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.mixedModeIconContainer}>
                {renderMixedModeIcon()}
              </View>
              <View>
                <Text style={styles.mixedModeTitle}>Mixed Mode</Text>
                <Text style={styles.mixedModeCaption}>Ultimate challenge!</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* No custom bottom navigation - using React Navigation's Tab Navigator */}
      </SafeAreaView>
      
      {/* Daily Challenge Popup */}
      <DailyChallengePopup 
        visible={showDailyChallenge} 
        onClose={() => setShowDailyChallenge(false)} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  // Home screen styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerGlow: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(157, 78, 255, 0.1)',
    borderRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9d4eff',
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileImageGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(157, 78, 255, 0.5)',
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#9d4eff',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 4,
    textShadowColor: 'rgba(157, 78, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 4,
  },
  headerTagline: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  xpContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelText: {
    color: '#9d4eff',
    fontFamily: fonts.fontFamily.pixel,
    fontSize: 12,
    fontWeight: 'bold',
  },
  xpText: {
    color: '#cccccc',
    fontFamily: fonts.fontFamily.pixel,
    fontSize: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#9d4eff',
    borderRadius: 4,
  },
  homeContent: {
    flex: 1,
    padding: 2,
    paddingTop: 8,
    position: 'relative', // Add position relative to parent
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 0,
    paddingHorizontal: 8,
    paddingBottom: 30, // Further reduced space for the mixed mode button
  },
  categoryCardContainer: {
    width: '48%', // Slightly narrower to ensure proper spacing
    aspectRatio: 0.85, // Taller cards (not square)
    marginBottom: 12, // Reduced bottom margin
  },
  categoryCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
    marginBottom: 4,
  },
  categoryCaption: {
    fontSize: 10,
    color: '#cccccc',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  mixedModeCard: {
    width: '99%',
    aspectRatio: 3.5,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'absolute',
    bottom: 16, // Moved up from bottom of screen
    left: 2,
    right: 2,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#9d4eff',
  },
  mixedModeIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#9d4eff',
  },
  mixedModeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9d4eff',
    textAlign: 'left',
    fontFamily: fonts.fontFamily.pixel,
  },
  mixedModeCaption: {
    fontSize: 10,
    color: '#cccccc',
    textAlign: 'left',
    fontFamily: fonts.fontFamily.pixel,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 60,
  },
  topNavButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  topNavIcon: {
    color: 'white',
    fontSize: 24,
    fontFamily: fonts.fontFamily.pixel,
  },
  topNavSpacer: {
    width: 40,
    height: 40,
  },
});

export default HomeScreen;
