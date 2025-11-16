import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar
} from 'react-native';
import theme from '../theme';

interface ResultsScreenProps {
  route: {
    params: {
      score: number;
      totalQuestions: number;
      xpEarned: number;
      longestStreak: number;
      streakBonus?: number;
      message?: string;
    }
  },
  navigation?: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  }
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route, navigation }) => {
  
  // Extract params with defaults
  const {
    score = 8,
    totalQuestions = 10,
    xpEarned = 150,
    longestStreak = 5,
    streakBonus = 50,
    message = "You're getting better!"
  } = route.params || {};
  
  // Calculate score percentage for dynamic messaging
  const scorePercentage = (score / totalQuestions) * 100;
  
  // Get appropriate message if not provided
  const getFeedbackMessage = () => {
    if (message) return message;
    
    if (scorePercentage >= 90) return "Outstanding performance!";
    if (scorePercentage >= 70) return "You're getting better!";
    if (scorePercentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  const handleNextRound = () => {
    // Navigate back to the gameplay screen for another round
    navigation?.navigate('Gameplay');
  };
  
  const handleViewLeaderboard = () => {
    // Navigate to the leaderboard screen
    navigation?.navigate('Leaderboard');
  };
  
  const handleBackPress = () => {
    // Navigate back to the home screen
    navigation?.navigate('Home');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with profile */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Round Results</Text>
        
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileAvatar} 
          />
        </View>
      </View>
      
      {/* Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreText}>
          {score}/{totalQuestions}
        </Text>
        <Text style={styles.correctText}>
          Correct!
        </Text>
        <Text style={styles.messageText}>
          {getFeedbackMessage()}
        </Text>
      </View>
      
      {/* Stats Row */}
      <View style={styles.statsRow}>
        {/* XP Earned */}
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>★</Text>
          </View>
          <Text style={styles.statTitle}>XP Earned</Text>
          <Text style={styles.xpValue}>+{xpEarned}</Text>
        </View>
        
        {/* Longest Streak */}
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>🏆</Text>
          </View>
          <Text style={styles.statTitle}>Longest Streak</Text>
          <Text style={styles.streakValue}>{longestStreak}</Text>
          <Text style={styles.streakLabel}>Rounds</Text>
        </View>
      </View>
      
      {/* Streak Bonus - Always show */}
      <View style={styles.bonusCard}>
        <View style={styles.bonusIconContainer}>
          <Text style={styles.bonusIcon}>⚡</Text>
        </View>
        <View style={styles.bonusTextContainer}>
          <Text style={styles.bonusTitle}>Streak Bonus!</Text>
          <Text style={styles.bonusValue}>+{streakBonus || 50} XP</Text>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleNextRound}
        >
          <Text style={styles.primaryButtonText}>Next Round</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleViewLeaderboard}
        >
          <Text style={styles.secondaryButtonText}>View Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Courier',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Courier',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#8a2be2', // Purple border
  },
  scoreCard: {
    backgroundColor: '#8a2be2', // Purple
    borderRadius: 24,
    padding: 24,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  correctText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Courier',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#222222',
    borderRadius: 20,
    padding: 20,
    width: (width - 40) / 2, // Half width minus margins
    height: 180, // Increased height for taller cards
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 32,
    color: 'white',
  },
  statTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  xpValue: {
    color: '#4dff88', // Green
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  streakValue: {
    color: '#8a2be2', // Purple
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  streakLabel: {
    color: '#8a2be2', // Purple
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  bonusCard: {
    backgroundColor: '#222222',
    borderRadius: 20,
    padding: 20,
    height: 100, // Increased height for bonus card
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bonusIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bonusIcon: {
    fontSize: 28,
    color: '#4dff88', // Green
  },
  bonusTextContainer: {
    flex: 1,
  },
  bonusTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  bonusValue: {
    color: '#4dff88', // Green
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  buttonContainer: {
    padding: 16,
    marginTop: 'auto', // Push to bottom
  },
  primaryButton: {
    backgroundColor: '#8a2be2', // Purple
    borderRadius: 30,
    padding: 20,
    height: 60, // Fixed height for button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 30,
    padding: 20,
    height: 60, // Fixed height for button
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Courier',
  },
});

export default ResultsScreen;
