import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CategoryDetailScreenProps {
  category: {
    id: string;
    title: string;
    color: string;
    contentType?: 'image' | 'text' | 'audio' | 'video';
  };
  onBack: () => void;
  onStartRound?: () => void; // Optional prop for starting a round
}

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ 
  category, 
  onBack,
  onStartRound 
}) => {
  const navigation = useNavigation();
  
  const handleStartRound = () => {
    // If onStartRound prop is provided, use it
    if (onStartRound) {
      onStartRound();
      return;
    }
    
    // Otherwise, use the default navigation logic
    // Navigate to the GameplayScreen with the category and contentType
    // @ts-ignore - Ignoring type error for navigation
    if (navigation && navigation.navigate) {
      // Use console.log to track navigation attempts
      console.log(`Starting round for category: ${category.title}`);
      
      try {
        // @ts-ignore - Ignoring type error for navigation
        navigation.navigate('Gameplay', {
          category: category.title,
          contentType: category.contentType || 'image'
        });
      } catch (error) {
        console.log('Navigation error:', error);
        onBack(); // Go back to home screen as fallback
      }
    } else {
      // Fallback for when navigation is not available
      console.log(`Navigation not available for category: ${category.title}`);
      onBack(); // Go back to home screen
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start Round</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.categoryTitle}>CRITICAL</Text>
          <Text style={styles.categoryTitle}>THINKING</Text>
        </View>
        
        <Text style={styles.instructionText}>
          Prepare to unravel{'\n'}
          the mysteries of the{'\n'}
          mind.
        </Text>
        
        <View style={styles.playButtonContainer}>
          <View style={styles.glowEffect} />
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      {/* Start Round Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartRound}
        >
          <Text style={styles.startButtonText}>Start Round</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
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
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  categoryTitle: {
    color: '#b64fc8',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'monospace',
    lineHeight: 40,
  },
  instructionText: {
    color: '#4caf50',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: 1,
    fontWeight: '400',
    marginBottom: 40,
  },
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'transparent',
    shadowColor: '#b64fc8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 15,
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#b64fc8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(182, 79, 200, 0.1)',
  },
  middleCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#b64fc8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#b64fc8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  playIcon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  startButton: {
    backgroundColor: '#b64fc8',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#b64fc8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#c76fd4',
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
});

export default CategoryDetailScreen;
