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
  },
  navigation?: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  }
}

const GameplayScreen: React.FC<GameplayScreenProps> = ({ route, navigation }) => {
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
  const feedbackScale = useRef(new Animated.Value(0)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  
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
    // Calculate XP change
    const xpChange = correct ? 25 : -10;
    
    // Update score
    setScore(prev => prev + (correct ? 50 : -25));
    
    // Update XP
    setXp(prev => Math.min(1000, prev + xpChange));
    
    // Update streak
    if (correct) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    // Show feedback
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Reset animations
    iconScale.setValue(0);
    iconRotate.setValue(0);
    
    // Show feedback with a hard timeout
    const feedbackTimeout = setTimeout(() => {
      // Force hide feedback after 800ms total, regardless of animation state
      setShowFeedback(false);
      feedbackScale.setValue(0);
      iconScale.setValue(0);
      iconRotate.setValue(0);
    }, 800); // Hard maximum time - increased from 500ms
    
    // Animate feedback - even slower animations
    Animated.parallel([
      // Scale up container
      Animated.timing(feedbackScale, {
        toValue: 1,
        duration: 200, // Increased from 150ms
        useNativeDriver: true
      }),
      
      // Animate icon immediately
      correct ? 
        // Checkmark animation
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 200, // Increased from 150ms
          useNativeDriver: true
        }) 
        : 
        // X mark animation
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 200, // Increased from 150ms
          useNativeDriver: true
        })
    ]).start(() => {
      // Longer delay before fade out
      setTimeout(() => {
        // Start fade out
        Animated.timing(feedbackScale, {
          toValue: 0,
          duration: 200, // Increased from 150ms
          useNativeDriver: true
        }).start(() => {
          // Clean up
          clearTimeout(feedbackTimeout);
          setShowFeedback(false);
          feedbackScale.setValue(0);
          iconScale.setValue(0);
          iconRotate.setValue(0);
        });
      }, 300); // Longer delay before starting fade out - increased from 100ms
    });
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
      // Game over - navigate to results screen
      const correctAnswers = gameLevels.filter((level, index) => {
        // Count levels where the user correctly identified real/AI
        const userGuessedReal = index % 2 === 0; // Simulate user guesses based on level index
        return (level.isReal && userGuessedReal) || (!level.isReal && !userGuessedReal);
      }).length;
      
      // Calculate streak bonus (example calculation)
      const streakBonus = streak >= 3 ? 50 : 0;
      
      // Navigate to results screen with game stats
      navigation?.navigate('Results', {
        score: score,
        totalQuestions: totalLevels,
        xpEarned: 150, // Example XP earned
        longestStreak: 5, // Example longest streak
        streakBonus: streakBonus,
        message: correctAnswers >= 7 ? "Outstanding performance!" : 
                 correctAnswers >= 5 ? "You're getting better!" : 
                 "Keep practicing!"
      });
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
    navigation?.goBack();
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
        <View style={styles.feedbackOverlay}>
          <Animated.View 
            style={[
              styles.feedbackContainer,
              isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
              {
                transform: [{ scale: feedbackScale }]
              }
            ]}
          >
            <View style={styles.feedbackIconContainer}>
              {isCorrect ? (
                <Animated.View 
                  style={[
                    styles.feedbackIcon, 
                    styles.correctIcon,
                    {
                      transform: [
                        { scale: iconScale }
                      ]
                    }
                  ]}
                >
                  <Text style={styles.iconText}>✓</Text>
                </Animated.View>
              ) : (
                <Animated.View 
                  style={[
                    styles.feedbackIcon, 
                    styles.incorrectIcon,
                    {
                      transform: [
                        { scale: iconScale },
                        { rotate: iconRotate.interpolate({
                          inputRange: [-0.15, 0, 0.15],
                          outputRange: ['-15deg', '0deg', '15deg']
                        })}
                      ]
                    }
                  ]}
                >
                  <Text style={styles.iconText}>✕</Text>
                </Animated.View>
              )}
            </View>
            <Text style={styles.feedbackText}>
              {isCorrect ? 'Correct!' : 'Wrong!'}
            </Text>
            <Text style={styles.xpText}>
              {isCorrect ? 'XP Gained' : 'XP Lost'}
            </Text>
            <Text style={[styles.xpAmount, isCorrect ? styles.xpGained : styles.xpLost]}>
              {isCorrect ? '+25' : '-10'}
            </Text>
          </Animated.View>
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
    fontFamily: theme.typography.fontFamily.courier,
  },
  locationText: {
    color: '#AAAAAA',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.courier,
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
    fontFamily: theme.typography.fontFamily.courier,
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
    fontFamily: theme.typography.fontFamily.courier,
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
    fontFamily: theme.typography.fontFamily.courier,
  },
  cardLocation: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: theme.typography.fontFamily.courier,
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
    fontFamily: theme.typography.fontFamily.courier,
  },
  buttonLabel: {
    position: 'absolute',
    bottom: -20,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.courier,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    fontFamily: theme.typography.fontFamily.courier,
  },
  clueText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: theme.typography.fontFamily.courier,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -125,
    marginLeft: -125,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
  },
  correctFeedback: {
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: '#9d4eff',
  },
  incorrectFeedback: {
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: '#ff4d4d',
  },
  feedbackIconContainer: {
    marginBottom: 15,
  },
  feedbackIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  correctIcon: {
    backgroundColor: '#9d4eff', // Purple
    borderWidth: 2,
    borderColor: '#b580ff',
  },
  incorrectIcon: {
    backgroundColor: '#ff4d4d', // Red
    borderWidth: 2,
    borderColor: '#ff8080',
  },
  iconText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.courier,
  },
  feedbackText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: theme.typography.fontFamily.courier,
  },
  xpText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: theme.typography.fontFamily.courier,
  },
  xpAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.courier,
  },
  xpGained: {
    color: '#20ff8a', // Green
  },
  xpLost: {
    color: '#ff4d4d', // Red
  },
  streakText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: theme.typography.fontFamily.courier,
  },
});

export default GameplayScreen;
