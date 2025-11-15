import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
import GameplayScreen from '../screens/GameplayScreen';

// Define screen props type
type ScreenProps = {
  onNavigate: (screen: string, params?: any) => void;
};

// Screen names for navigation
const SCREENS = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  GAMEPLAY: 'Gameplay',
};

// Simple screen components
const SplashScreen = ({ onNavigate }: ScreenProps) => {
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
          onNavigate(SCREENS.LOGIN);
        }, 40000000000); // Wait 1.5 seconds after typing completes
      }
    }, 30); // Even faster typing
    
    return () => clearInterval(typingInterval);
  }, [onNavigate]);
  
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
        <Text style={[styles.appTitleWord, {color: showHuman ? '#ffffff' : '#666666'}]}>Real</Text>
        <Text style={styles.appTitleSeparator}>or</Text>
        <Text style={[styles.appTitleWord, {color: !showHuman ? '#ffffff' : '#666666'}]}>AI</Text>
      </View>
      
      {/* Styled text with typing animation */}
      {renderStyledText()}
      
      {/* Start Game button */}
      <TouchableOpacity 
        style={styles.startGameButton}
        onPress={() => {
          console.log('Start Game pressed');
          // Temporarily commented out for testing
          // onNavigate(SCREENS.LOGIN);
        }}
      >
        <Text style={styles.startGameButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginScreen = ({ onNavigate }: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = 'Welcome,\nChallenger!';
  
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
        setTypingComplete(true);
      }
    }, 50); // Faster typing speed
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <View style={styles.loginContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up/Login</Text>
      </View>

      <View style={styles.loginContent}>
        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>
            {displayText}
            {showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>
          <Text style={styles.welcomeSubtitle}>Prove your discernment.</Text>
        </View>

        {/* Email and Password Inputs */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={[
            styles.emailButton, 
            (!email.trim() || !password.trim()) && styles.loginButtonDisabled
          ]}
          onPress={() => onNavigate(SCREENS.HOME)}
          disabled={!email.trim() || !password.trim()}
        >
          <Text style={styles.emailButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          {/* Google Button */}
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => onNavigate(SCREENS.HOME)}
          >
            <View style={styles.socialIconContainer}>
              <Text>G</Text>
            </View>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => onNavigate(SCREENS.HOME)}
          >
            <View style={styles.socialIconContainer}>
              <Text>🍎</Text>
            </View>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Guest Button */}
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => onNavigate(SCREENS.HOME)}
          >
            <View style={styles.socialIconContainer}>
              <Text>👤</Text>
            </View>
            <Text style={styles.socialButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink} onPress={() => onNavigate(SCREENS.REGISTER)}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const RegisterScreen = ({ onNavigate }: ScreenProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View style={styles.registerContainer}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => onNavigate(SCREENS.LOGIN)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.registerContent}>
        {/* Title */}
        <View style={styles.registerTitleContainer}>
          <Text style={styles.registerTitle}>Create your account</Text>
          <Text style={styles.registerSubtitle}>Join the future of events with a quick sign-up.</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>👤</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="John Doe"
              placeholderTextColor="#8E8E93"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>✉️</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="john.doe@example.com"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>🔒</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="••••••••"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.registerInputWrapper}>
            <Text style={styles.registerInputIcon}>🔒</Text>
            <TextInput
              style={styles.registerInput}
              placeholder="••••••••"
              placeholderTextColor="#8E8E93"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
              <TouchableOpacity 
                style={styles.checkboxTouchable}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms && <Text style={styles.checkboxCheck}>✓</Text>}
              </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms and Conditions</Text> and Privacy Policy.
            </Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[
            styles.signUpButton, 
            !agreeToTerms && styles.signUpButtonDisabled
          ]}
          onPress={() => agreeToTerms && onNavigate(SCREENS.HOME)}
          disabled={!agreeToTerms}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          <Text style={styles.signUpButtonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = ({ onNavigate }: ScreenProps) => {
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
      onNavigate(SCREENS.GAMEPLAY, {
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
          <TouchableOpacity style={styles.topNavButton}>
            <Text style={styles.topNavIcon}>◇</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topNavButton}>
            <Text style={styles.topNavIcon}>ⓘ</Text>
          </TouchableOpacity>
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
        
        {/* Bottom navigation bar */}
        <View style={styles.bottomNav}>
          {/* Home */}
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconContainer}>
              <HouseIcon width={20} height={20} color="#9d4eff" />
            </View>
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          {/* Leaderboard */}
          <TouchableOpacity style={styles.navItem} onPress={() => {/* Navigate to leaderboard */}}>
            <View style={styles.navIconContainer}>
              <TrophyIcon width={20} height={20} color="#8E8E93" />
            </View>
            <Text style={styles.navText}>Leaderboard</Text>
          </TouchableOpacity>
          
          {/* Achievements */}
          <TouchableOpacity style={styles.navItem} onPress={() => {/* Navigate to achievements */}}>
            <View style={styles.navIconContainer}>
              <AwardIcon width={20} height={20} color="#8E8E93" />
            </View>
            <Text style={styles.navText}>Achievement</Text>
          </TouchableOpacity>
          
          {/* Store */}
          <TouchableOpacity style={styles.navItem} onPress={() => {/* Navigate to store */}}>
            <View style={styles.navIconContainer}>
              <StoreIcon width={20} height={20} color="#8E8E93" />
            </View>
            <Text style={styles.navText}>Store</Text>
          </TouchableOpacity>
          
          {/* Profile */}
          <TouchableOpacity style={styles.navItem} onPress={() => {/* Navigate to profile */}}>
            <View style={styles.navIconContainer}>
              <UserIcon width={20} height={20} color="#8E8E93" />
            </View>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Daily Challenge Popup */}
      <DailyChallengePopup 
        visible={showDailyChallenge} 
        onClose={() => setShowDailyChallenge(false)} 
      />
    </>
  );
};

// Main Navigation component with simple state-based navigation
const Navigation = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [fadeAnim] = useState(new Animated.Value(1));
  
  // Function to handle smooth navigation
  const navigateWithFade = (screen: string, params?: any) => {
    // Fade out current screen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Set gameplay params if navigating to gameplay screen
      if (screen === SCREENS.GAMEPLAY && params) {
        setGameplayParams(params);
      }
      
      // Change screen
      setCurrentScreen(screen);
      
      // Fade in new screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // State for gameplay screen parameters
  const [gameplayParams, setGameplayParams] = useState<{
    contentType: 'image' | 'text' | 'audio' | 'video';
    category: string;
  } | null>(null);

  // Wrapper for GameplayScreen to handle navigation
  const GameplayScreenWrapper = () => {
    if (!gameplayParams) {
      // If no params, go back to home
      navigateWithFade(SCREENS.HOME);
      return null;
    }
    
    return (
      <GameplayScreen 
        route={{ params: gameplayParams }}
      />
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.SPLASH:
        return <SplashScreen onNavigate={navigateWithFade} />;
      case SCREENS.LOGIN:
        return <LoginScreen onNavigate={navigateWithFade} />;
      case SCREENS.REGISTER:
        return <RegisterScreen onNavigate={navigateWithFade} />;
      case SCREENS.HOME:
        return <HomeScreen onNavigate={navigateWithFade} />;
      case SCREENS.GAMEPLAY:
        return <GameplayScreenWrapper />;
      default:
        return <SplashScreen onNavigate={navigateWithFade} />;
    }
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <StatusBar style="light" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {renderScreen()}
      </Animated.View>
    </View>
  );
};

// Export the Navigation component
export default Navigation;

const styles = StyleSheet.create({
  // Register screen styles
  registerContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    paddingHorizontal: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  registerContent: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  registerTitleContainer: {
    marginBottom: 30,
  },
  registerTitle: {
    fontSize: 28, // Reduced from 32
    fontWeight: '600', // Lighter than bold for smoother appearance
    color: 'white',
    marginBottom: 8,
  },
  registerSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#8E8E93',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '500', // Medium weight for better readability
  },
  registerInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25, // Match login screen
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 45, // Match login screen
  },
  registerInputIcon: {
    marginRight: 12,
    fontSize: 18, // Match login screen
  },
  registerInput: {
    flex: 1,
    height: 45, // Match login screen
    color: 'white',
    fontSize: 14, // Reduced from 16 to match login input
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  checkbox: {
    width: 18, // Reduced from 24
    height: 18, // Reduced from 24
    borderWidth: 1,
    borderColor: '#8a20ff',
    borderRadius: 3, // Reduced from 4
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#8a20ff',
    borderColor: '#8a20ff',
  },
  checkboxTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCheck: {
    color: 'white',
    fontSize: 12, // Reduced from 16
  },
  termsText: {
    color: '#8E8E93',
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: '#8a20ff',
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '100%',
    height: 45, // Match input height
    borderRadius: 25,
    backgroundColor: '#7a1cf7', // Match login button color
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, // Reduced from 0.5
    shadowRadius: 6, // Reduced from 10
    elevation: 3, // Reduced from 5
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  signUpButtonDisabled: {
    backgroundColor: '#4a4a4a',
    borderColor: '#4a4a4a',
    // Keep the shadow even when disabled
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 18
    fontWeight: '600', // Lighter than bold for smoother appearance
    marginRight: 8,
  },
  signUpButtonIcon: {
    color: 'white',
    fontSize: 14, // Reduced from 18
  },
  // Common styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.neonPurple[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
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
  // Icon and title styles
  aiIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#8a20ff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
  },
  humanBody: {
    width: 16,
    height: 20,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    borderRadius: 5,
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
    backgroundColor: '#000',
    position: 'absolute',
    top: 8,
    borderRadius: 4,
  },
  robotAntenna: {
    width: 2,
    height: 8,
    backgroundColor: '#000',
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
    backgroundColor: '#20ff8a',
  },
  robotBody: {
    width: 20,
    height: 14,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    borderRadius: 3,
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
  startGameButton: {
    backgroundColor: '#8a20ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  startGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
    letterSpacing: 2, // Increased letter spacing for more "gamified" look
    textTransform: 'uppercase', // Uppercase for more "gamified" look
  },
  
  // Login screen styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#121212', // Darker background
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  headerText: {
    color: 'white',
    fontSize: 20, // Reduced from 18

  },
  loginContent: {
    flex: 1,
    padding: 24,
    paddingTop: 60, // Increased from 40 for more space at the top
  },
  welcomeContainer: {
    width: '100%',
    marginBottom: 50, // Increased from 32 for more space below welcome text
  },
  welcomeTitle: {
    fontSize: 30, // Reduced from 34
    fontWeight: '600', // Lighter than bold for smoother appearance
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 36, // Adjusted for smaller font
  },
  cursor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Courier', // Match the parent text font
  },
  welcomeSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#8E8E93',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30, // Increased from 24 for more space below input
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 45,
  },
  inputIcon: {
    marginRight: 12,
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: 45,
    color: 'white',
    fontSize: 14, // Reduced from 16
  },
  emailButton: {
    width: '100%',
    height: 45, // Match input height
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7a1cf7', // Purple color
    marginBottom: 24,
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, // Reduced from 0.5
    shadowRadius: 6, // Reduced from 10
    elevation: 3, // Reduced from 5
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  loginButtonDisabled: {
    backgroundColor: '#4a4a4a', // Same as signUpButtonDisabled
    borderColor: '#4a4a4a',
    // Keep the shadow even when disabled
  },
  emailButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    fontWeight: '600', // Lighter than bold for smoother appearance
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Added margin top
    marginBottom: 30, // Increased from 24
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2c2c2e',
  },
  dividerText: {
    color: '#8E8E93',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  socialButton: {
    width: '100%',
    height: 45, // Match input height
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20, // Increased from 12 for more space between buttons
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14, // Reduced from 16
    marginLeft: 8,
    fontWeight: '500', // Medium weight for better readability
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  signUpLink: {
    color: '#8a20ff',
    fontWeight: 'bold',
  },
  
  // Home screen styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  homeContent: {
    flex: 1,
    padding: 4,
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
    width: '49.8%',
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
  categoryIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  mixedModeCard: {
    width: '100%',
    aspectRatio: 3.5,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'absolute',
    bottom: 10, // Position at bottom of screen
    left: 4,
    right: 4,
  },
  mixedModeIcon: {
    fontSize: 28,
    textAlign: 'center',
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
  navIcon: {
    fontSize: 18,
    color: '#8E8E93',
  },
  activeNavIcon: {
    color: '#9d4eff',
  },
  activeNavText: {
    color: '#9d4eff',
    fontWeight: '600',
  },
  navText: {
    color: '#8E8E93',
    fontSize: 10,
    textAlign: 'center',
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
    fontSize: 24
  },
  activeNavIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#8a20ff',
    borderRadius: 1.5,
  }

})
