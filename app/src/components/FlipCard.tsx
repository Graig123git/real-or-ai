import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Dimensions,
  Text
} from 'react-native';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onFlip?: (isFront: boolean) => void;
  style?: any;
  resetKey?: number; // Add a key to force reset
}

export interface FlipCardRef {
  reset: () => void;
}

const FlipCard = forwardRef<FlipCardRef, FlipCardProps>(({ 
  frontContent, 
  backContent, 
  onFlip,
  style,
  resetKey = 0
}, ref) => {
  const [isFront, setIsFront] = useState(true);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  
  // Reset function to be exposed via ref
  const reset = () => {
    flipAnimation.setValue(0);
    setIsFront(true);
  };
  
  // Expose the reset method via ref
  useImperativeHandle(ref, () => ({
    reset
  }));
  
  // Reset when resetKey changes
  useEffect(() => {
    reset();
  }, [resetKey]);

  const flipToFront = () => {
    Animated.spring(flipAnimation, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFront(true);
    onFlip && onFlip(true);
  };

  const flipToBack = () => {
    Animated.spring(flipAnimation, {
      toValue: 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFront(false);
    onFlip && onFlip(false);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.card, 
          frontAnimatedStyle, 
          isFront ? styles.cardFront : styles.cardHidden
        ]}
      >
        <TouchableOpacity 
          style={styles.cardContent} 
          onPress={flipToBack}
          activeOpacity={0.9}
        >
          {frontContent}
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        style={[
          styles.card, 
          backAnimatedStyle, 
          isFront ? styles.cardHidden : styles.cardBack
        ]}
      >
        <TouchableOpacity 
          style={styles.cardContent} 
          onPress={flipToFront}
          activeOpacity={1}
        >
          {backContent}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    width: '100%',
    height: '100%',
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  },
  cardHidden: {
    zIndex: 0,
  },
});

export default FlipCard;
