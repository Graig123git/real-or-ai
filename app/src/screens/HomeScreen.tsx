import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
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
  
  useEffect(() => {
    // Show the daily challenge popup after a delay
    // Use a slightly longer delay for a better user experience
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
  
  // Use the ImageIcon component
  const renderImageIcon = () => (
    <ImageIcon width={32} height={32} color="#9d4eff" />
  );
  
  // Use the VideoIcon component
  const renderVideoIcon = () => (
    <VideoIcon width={32} height={32} color="#20ff8a" />
  );
  
  // Use the AudioIcon component
  const renderAudioIcon = () => (
    <AudioIcon width={32} height={32} color="#9d4eff" />
  );
  
  const renderTextIcon = () => (
    <View style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 22, height: 26, borderWidth: 1.5, borderColor: '#20ff8a', borderRadius: 3}}>
        <View style={{width: 12, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 8, left: 5}} />
        <View style={{width: 12, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 13, left: 5}} />
        <View style={{width: 8, height: 1.5, backgroundColor: '#20ff8a', position: 'absolute', top: 14, left: 4}} />
      </View>
    </View>
  );
  
  // Use the ShuffleIcon component for Mixed Mode
  const renderMixedModeIcon = () => (
    <ShuffleIcon width={24} height={24} color="#9d4eff" />
  );
  
  // Define category data with custom icons
  const categories = [
    { 
      id: 'images', 
      title: 'Images', 
      renderIcon: renderImageIcon,
      color: '#9d4eff', // Vibrant purple
      detailTitle: 'Space Exploration' // Example topic for this category
    },
    { 
      id: 'videos', 
      title: 'Videos', 
      renderIcon: renderVideoIcon,
      color: '#20ff8a', // Vibrant green
      detailTitle: 'Wildlife Documentary'
    },
    { 
      id: 'audio', 
      title: 'Audio', 
      renderIcon: renderAudioIcon,
      color: '#9d4eff', // Vibrant purple
      detailTitle: 'Music Composition'
    },
    { 
      id: 'text', 
      title: 'Text', 
      renderIcon: renderTextIcon,
      color: '#20ff8a', // Vibrant green
      detailTitle: 'News Article'
    }
  ];

  // Find the selected category
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Render the detail screen if a category is selected
  if (showDetailScreen && selectedCategoryData) {
    return (
      <View style={styles.homeContainer}>
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
      </View>
    );
  }

  return (
    <>
      <View style={styles.homeContainer}>
        {/* Top navigation */}
        <View style={styles.topNav}>
          <View style={styles.topNavSpacer}></View>

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
                <FlipCard
                  ref={flipCardRefs[category.id]}
                  resetKey={resetKey}
                  frontContent={
                    <View style={styles.categoryCard}>
                      <View style={[styles.iconContainer, { borderColor: category.color, borderWidth: 1.5, borderRadius: 12 }]}>
                        {category.renderIcon()}
                      </View>
                      <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
                    </View>
                  }
                  backContent={
                    <View style={styles.categoryCard}>
                      <View style={[styles.iconContainer, { borderColor: category.color, borderWidth: 1.5, borderRadius: 12 }]}>
                        {category.renderIcon()}
                      </View>
                      <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
                    </View>
                  }
                  onFlip={(isFront) => {
                    if (!isFront && !showDetailScreen) {
                      handleCategorySelect(category.id);
                    }
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Mixed Mode button */}
          <TouchableOpacity 
            style={styles.mixedModeCard}
            onPress={() => handleCategorySelect('mixed')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.mixedModeIconContainer}>
                {renderMixedModeIcon()}
              </View>
              <Text style={styles.mixedModeTitle}>Mixed Mode</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* No custom bottom navigation - using React Navigation's Tab Navigator */}
      </View>
      
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
  },
  categoryCardContainer: {
    width: '49.9%',
    aspectRatio: 0.65, // Adjusted to find a balance in height
    marginBottom: 2,
  },
  categoryCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    bottom: 10, // Position at bottom of screen
    left: 2,
    right: 2,
    alignSelf: 'center',
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
    color: '#8a20ff',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#1c1c1e',
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
    paddingBottom: 4,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  navIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeNavText: {
    color: '#9d4eff',
    fontWeight: '600',
  },
  navText: {
    color: '#8E8E93',
    fontSize: 10,
    textAlign: 'center',
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
