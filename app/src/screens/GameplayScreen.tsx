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
  Modal
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
  const [score, setScore] = useState(1175);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
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
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileAvatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.helloText}>Hello CyberKnight!</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Washington, USA</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Card */}
        <View style={styles.cardContainer}>
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
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                style={styles.cardGradient}
              >
                {/* Match percentage */}
                <View style={styles.matchContainer}>
                  <Text style={styles.matchText}>Match {level.confidence}%</Text>
                </View>
                
                {/* Image info */}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{level.title}, {level.id}</Text>
                  <Text style={styles.cardLocation}>{level.location}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Animated.View>
        </View>
        
        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          {/* Triangle buttons layout */}
          <View style={styles.triangleContainer}>
            {/* Top button (Clue) */}
            <View style={styles.topButtonContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.clueButton]}
                onPress={handleClue}
              >
                <Text style={styles.actionButtonIcon}>💡</Text>
              </TouchableOpacity>
            </View>
            
            {/* Bottom row (X and Heart) */}
            <View style={styles.bottomButtonsRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.rejectButton]}
                onPress={handleAIChoice}
              >
                <Text style={styles.actionButtonIcon}>✗</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.likeButton]}
                onPress={handleRealChoice}
              >
                <Text style={styles.actionButtonIcon}>♥</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
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
      
      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        {Array.from({ length: totalLevels }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot,
              index === currentLevel ? styles.progressDotActive : 
              index < currentLevel ? styles.progressDotCompleted : {}
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderColor: '#805AD5',
  },
  profileInfo: {
    marginLeft: 12,
  },
  helloText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cardContainer: {
    height: '65%', // Reduced height to make room for buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - 32,
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  matchContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  matchText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardInfo: {
    marginBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardLocation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  buttonsSection: {
    height: '30%', // Dedicated space for buttons
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  topButtonContainer: {
    alignItems: 'center',
    marginBottom: 20, // Reduced space between top and bottom buttons
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rejectButton: {
    backgroundColor: '#FF4D4D',
    marginRight: 60, // Reduced spacing between bottom buttons
  },
  clueButton: {
    backgroundColor: '#805AD5',
  },
  likeButton: {
    backgroundColor: '#4DFF88',
    marginLeft: 60, // Reduced spacing between bottom buttons
  },
  actionButtonIcon: {
    fontSize: 24,
    color: 'white',
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
    backgroundColor: 'rgba(128, 90, 213, 0.9)',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
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
    backgroundColor: 'rgba(77, 255, 136, 0.8)',
  },
  incorrectFeedback: {
    backgroundColor: 'rgba(255, 77, 77, 0.8)',
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#805AD5',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotCompleted: {
    backgroundColor: '#4DFF88',
  },
});

export default GameplayScreen;
