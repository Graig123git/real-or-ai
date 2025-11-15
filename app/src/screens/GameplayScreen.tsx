import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';

// Game level definition
interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  clue: string;
  answer: string;
  isReal: boolean;
  confidence: number; // AI confidence score (0-100)
  location: string; // Fictional source location
}

// Mock game levels
const gameLevels: GameLevel[] = [
  {
    id: 1,
    title: 'Quantum Circuit',
    subtitle: 'Advanced computing technology',
    image: { uri: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1974&auto=format&fit=crop' },
    clue: 'Look for patterns in the quantum fluctuations.',
    answer: 'Entanglement',
    isReal: true,
    confidence: 86,
    location: 'MIT Lab, Boston'
  },
  {
    id: 2,
    title: 'Neural Network',
    subtitle: 'AI visualization',
    image: { uri: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1470&auto=format&fit=crop' },
    clue: 'The pattern resembles brain activity during REM sleep.',
    answer: 'Consciousness',
    isReal: false,
    confidence: 92,
    location: 'DeepMind, London'
  },
  {
    id: 3,
    title: 'Cosmic Alignment',
    subtitle: 'Rare astronomical event',
    image: { uri: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1422&auto=format&fit=crop' },
    clue: 'The alignment occurs once every 832 years.',
    answer: 'Conjunction',
    isReal: true,
    confidence: 78,
    location: 'NASA Observatory, Chile'
  },
  {
    id: 4,
    title: 'Time Distortion',
    subtitle: 'Theoretical physics concept',
    image: { uri: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1470&auto=format&fit=crop' },
    clue: 'What happens when past and future collide?',
    answer: 'Causality',
    isReal: false,
    confidence: 95,
    location: 'CERN, Switzerland'
  },
  {
    id: 5,
    title: 'Dimensional Portal',
    subtitle: 'Experimental technology',
    image: { uri: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1471&auto=format&fit=crop' },
    clue: 'The key is hidden in plain sight.',
    answer: 'Threshold',
    isReal: true,
    confidence: 81,
    location: 'Quantum Labs, Tokyo'
  }
];

// Main GameplayScreen component
interface GameplayScreenProps {
  route: {
    params?: {
      level?: number;
      contentType?: 'image' | 'text' | 'audio' | 'video';
      category?: string;
    }
  }
}

const GameplayScreen: React.FC<GameplayScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const initialLevel = route.params?.level || 0; // Default to level 1 (index 0)
  
  // State
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [score, setScore] = useState(1200);
  const [xp, setXp] = useState(750);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  
  // Animation refs
  const cardScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardRotate = useRef(new Animated.Value(0)).current;
  
  // Get current level
  const level = gameLevels[currentLevel];
  const totalLevels = gameLevels.length;
  
  // Handle real choice
  const handleRealChoice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const correct = level.isReal === true;
    processAnswer(correct);
    
    // Animate card swipe right
    Animated.parallel([
      Animated.timing(cardRotate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setTimeout(() => {
        nextLevel();
      }, 500);
    });
  };
  
  // Handle AI choice
  const handleAIChoice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const correct = level.isReal === false;
    processAnswer(correct);
    
    // Animate card swipe left
    Animated.parallel([
      Animated.timing(cardRotate, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setTimeout(() => {
        nextLevel();
      }, 500);
    });
  };
  
  // Process answer
  const processAnswer = (correct: boolean) => {
    // Update score
    setScore(prev => prev + (correct ? 50 : -25));
    
    // Update XP
    setXp(prev => Math.min(1000, prev + (correct ? 100 : 50)));
    
    // Update streak
    if (correct) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    // Show feedback
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Hide feedback after delay
    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };
  
  // Show clue
  const handleClue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowClue(true);
    
    // Hide clue after 3 seconds
    setTimeout(() => {
      setShowClue(false);
    }, 3000);
  };
  
  // Move to next level
  const nextLevel = () => {
    // Reset animations
    cardRotate.setValue(0);
    cardOpacity.setValue(1);
    
    // Check if game is over
    if (currentLevel >= totalLevels - 1) {
      // Game over - show results
      alert(`Game Over! Final Score: ${score}`);
      // @ts-ignore
      navigation.navigate('Home');
      return;
    }
    
    // Move to next level
    setCurrentLevel(prev => prev + 1);
  };
  
  // Card rotation interpolation
  const rotateInterpolation = cardRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg']
  });
  
  // Card translation interpolation
  const translateXInterpolation = cardRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-100, 0, 100]
  });
  
  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.profileAvatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.helloText}>Hello CyberKnight!</Text>
              <Text style={styles.locationText}>Washington, USA</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Card */}
          <Animated.View 
            style={[
              styles.card,
              { 
                opacity: cardOpacity,
                transform: [
                  { scale: cardScale },
                  { rotate: rotateInterpolation },
                  { translateX: translateXInterpolation }
                ]
              }
            ]}
          >
            <ImageBackground
              source={level.image}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              {/* Match percentage */}
              <View style={styles.matchContainer}>
                <Text style={styles.matchText}>Match {level.confidence}%</Text>
              </View>
              
              {/* Image info */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{level.title}, {level.id}</Text>
                  <Text style={styles.cardLocation}>{level.location}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
            
            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
              {Array(totalLevels).fill(0).map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.paginationDot, 
                    index === currentLevel && styles.activeDot
                  ]} 
                />
              ))}
            </View>
          </Animated.View>
          
          {/* Triangle Buttons Layout */}
          <View style={styles.triangleContainer}>
            {/* Top button (Guess) */}
            <View style={styles.topButtonContainer}>
              <TouchableOpacity 
                style={[styles.circleButton, styles.guessButton]}
                onPress={handleClue}
              >
                <Text style={styles.buttonIcon}>⚡</Text>
                <Text style={styles.buttonLabel}>Guess</Text>
              </TouchableOpacity>
            </View>
            
            {/* Bottom row (Clue and Help) */}
            <View style={styles.bottomButtonsRow}>
              <TouchableOpacity 
                style={[styles.circleButton, styles.clueButton]}
                onPress={handleAIChoice}
              >
                <Text style={styles.buttonIcon}>💡</Text>
                <Text style={styles.buttonLabel}>Clue</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.circleButton, styles.helpButton]}
                onPress={handleRealChoice}
              >
                <Text style={styles.buttonIcon}>❓</Text>
                <Text style={styles.buttonLabel}>Help</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      
      {/* Clue overlay */}
      {showClue && (
        <View style={styles.overlayContainer}>
          <View style={styles.clueContainer}>
            <Text style={styles.clueTitle}>CLUE</Text>
            <Text style={styles.clueText}>{level.clue}</Text>
          </View>
        </View>
      )}
      
      {/* Feedback overlay */}
      {showFeedback && (
        <View style={[
          styles.feedbackContainer,
          isCorrect ? styles.correctFeedback : styles.incorrectFeedback
        ]}>
          <Text style={styles.feedbackText}>
            {isCorrect ? 'CORRECT!' : 'WRONG!'}
          </Text>
          {isCorrect && streak > 1 && (
            <Text style={styles.streakText}>{streak}x Streak!</Text>
          )}
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black background
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#8a2be2', // Purple border
  },
  profileInfo: {
    marginLeft: 12,
  },
  helloText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  locationText: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // More subtle
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageStyle: {
    borderRadius: 20,
  },
  matchContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 1,
  },
  matchText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardInfo: {
    marginBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardLocation: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#8a2be2', // Purple
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  // Triangle layout
  triangleContainer: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  clueButton: {
    backgroundColor: '#4dff88', // Green
    marginRight: 60, // Space between bottom buttons
    position: 'relative',
  },
  guessButton: {
    backgroundColor: '#8a2be2', // Purple
    position: 'relative',
  },
  helpButton: {
    backgroundColor: '#4dff88', // Green
    marginLeft: 60, // Space between bottom buttons
    position: 'relative',
  },
  buttonIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonLabel: {
    position: 'absolute',
    bottom: -20,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  clueContainer: {
    backgroundColor: 'rgba(138, 43, 226, 0.9)', // Purple
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  clueTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clueText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  correctFeedback: {
    backgroundColor: 'rgba(77, 255, 136, 0.8)', // Green
    shadowColor: '#4dff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  incorrectFeedback: {
    backgroundColor: 'rgba(255, 77, 77, 0.8)', // Red
    shadowColor: '#ff4d4d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  feedbackText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  streakText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default GameplayScreen;
