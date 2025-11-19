import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import theme from '../theme';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showHuman, setShowHuman] = useState(true);
  const iconAnimation = useRef(new Animated.Value(0)).current;
  const fullText = 'Can you spot the fake?';
  
  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    // Start typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        
        // Auto-navigate to Login screen after typing is complete and a short delay
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500); // Wait 1.5 seconds after typing completes
      }
    }, 30); // Even faster typing
    
    return () => clearInterval(typingInterval);
  }, [navigation]);
  
  // Icon animation effect
  useEffect(() => {
    // Create a repeating animation that toggles between human and robot
    const startAnimation = () => {
      Animated.sequence([
        // Fade out current icon
        Animated.timing(iconAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        // Switch icons and reset animation value
        Animated.timing(iconAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]).start(() => {
        // Toggle which icon is shown
        setShowHuman(prev => !prev);
        // Restart animation
        setTimeout(startAnimation, 1000);
      });
    };
    
    startAnimation();
    
    return () => {
      // Clean up animation when component unmounts
      iconAnimation.stopAnimation();
    };
  }, [iconAnimation]);

  // Function to style the text with different colors
  const renderStyledText = () => {
    if (!displayText) return null;
    
    // Find the positions of "spot" and "fake" in the text
    const spotIndex = fullText.indexOf('spot');
    const fakeIndex = fullText.indexOf('fake');
    
    // Check if we've typed far enough to show these words
    const hasSpot = displayText.length > spotIndex + 4;
    const hasFake = displayText.length > fakeIndex + 4;
    
    // Create the styled text parts
    return (
      <Text style={styles.splashSubtitle}>
        {displayText.slice(0, spotIndex)}
        {hasSpot ? (
          <Text style={styles.greenText}>
            {displayText.slice(spotIndex, spotIndex + 4)}
          </Text>
        ) : (
          displayText.slice(spotIndex)
        )}
        {hasSpot ? displayText.slice(spotIndex + 4, fakeIndex) : ''}
        {hasFake ? (
          <Text style={styles.purpleText}>
            {displayText.slice(fakeIndex, fakeIndex + 4)}
          </Text>
        ) : (
          hasSpot ? displayText.slice(fakeIndex) : ''
        )}
        {hasFake ? displayText.slice(fakeIndex + 4) : ''}
        {showCursor && <Text style={styles.cursor}>|</Text>}
      </Text>
    );
  };

  // Render human or robot icon based on state
  const renderIcon = () => {
    if (showHuman) {
      return (
        <View style={styles.humanIcon}>
          {/* Head */}
          <View style={styles.humanHead} />
          {/* Human eyes */}
          <View style={styles.humanEyes}>
            <View style={styles.humanEye} />
            <View style={styles.humanEye} />
          </View>
          {/* Body */}
          <View style={styles.humanBody} />
        </View>
      );
    } else {
      return (
        <View style={styles.robotIcon}>
          {/* Robot head */}
          <View style={styles.robotHead} />
          {/* Robot antenna */}
          <View style={styles.robotAntenna} />
          {/* Robot eyes */}
          <View style={styles.robotEyes}>
            <View style={styles.robotEye} />
            <View style={styles.robotEye} />
          </View>
          {/* Robot body */}
          <View style={styles.robotBody} />
        </View>
      );
    }
  };

  return (
    <View style={styles.splashContainer}>
      {/* Animated icon container */}
      <Animated.View 
        style={[
          styles.aiIconContainer,
          {
            opacity: iconAnimation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0, 1]
            })
          }
        ]}
      >
        {renderIcon()}
      </Animated.View>
      
      {/* Real or AI heading with animated words */}
      <View style={styles.titleContainer}>
        <Text style={[styles.appTitleWord, {color: showHuman ? '#20ff8a' : '#666666'}]}>Real</Text>
        <Text style={styles.appTitleSeparator}>or</Text>
        <Text style={[styles.appTitleWord, {color: !showHuman ? '#8a20ff' : '#666666'}]}>AI</Text>
      </View>
      
      {/* Styled text with typing animation */}
      {renderStyledText()}
    </View>
  );
};

const styles = StyleSheet.create({
  // Splash screen styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  splashTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8a20ff',
    marginBottom: 16,
    textAlign: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  splashSubtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: 'Courier', // More pixelated, arcade-style font
    letterSpacing: 1, // Slight letter spacing for arcade-style look
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#000000', // Black background
    borderRadius: 5, // Slight rounding of corners
  },
  splashButton: {
    backgroundColor: '#8a20ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  splashButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // New styles for the gamified splash screen
  greenText: {
    color: '#20ff8a', // Bright green color
    fontWeight: 'bold',
    fontFamily: 'Courier', // Match the parent text font
  },
  purpleText: {
    color: '#8a20ff', // Vibrant purple color
    fontWeight: 'bold',
    fontFamily: 'Courier', // Match the parent text font
  },
  cursor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Courier', // Match the parent text font
  },
  // Icon and title styles
  aiIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#8a20ff',
  },
  // Human icon styles
  humanIcon: {
    width: 40,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  humanHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333333',
    position: 'absolute',
    top: 0,
    borderWidth: 1,
    borderColor: '#20ff8a',
  },
  humanBody: {
    width: 16,
    height: 20,
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#20ff8a',
  },
  humanEyes: {
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    width: 14,
    justifyContent: 'space-between',
  },
  humanEye: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#20ff8a',
  },
  // Robot icon styles
  robotIcon: {
    width: 40,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotHead: {
    width: 24,
    height: 18,
    backgroundColor: '#333333',
    position: 'absolute',
    top: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8a20ff',
  },
  robotAntenna: {
    width: 2,
    height: 8,
    backgroundColor: '#8a20ff',
    position: 'absolute',
    top: 0,
  },
  robotEyes: {
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    width: 20,
    justifyContent: 'space-between',
  },
  robotEye: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8a20ff',
  },
  robotBody: {
    width: 20,
    height: 14,
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#8a20ff',
  },
  // Title container styles
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appTitleWord: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginHorizontal: 8,
  },
  appTitleSeparator: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Courier',
  },
});

export default SplashScreen;
