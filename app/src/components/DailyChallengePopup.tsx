import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import theme from '../theme';
import TreasureChestIcon from './TreasureChestIcon';

type DailyChallengePopupProps = {
  visible: boolean;
  onClose: () => void;
};

const DailyChallengePopup: React.FC<DailyChallengePopupProps> = ({ visible, onClose }) => {
  // Animation values
  const [scaleAnim] = React.useState(new Animated.Value(0.8));
  const [opacityAnim] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    if (visible) {
      // Reset animation values
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
      
      // Start animations
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);
  
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Header with title and close button */}
          <View style={styles.header}>
            <Text style={styles.title}>Daily Challenge</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {/* Challenge description */}
          <Text style={styles.description}>Guess 10 in a row!</Text>
          
          {/* Timer */}
          <Text style={styles.timer}>1d 23h 59m</Text>
          
          {/* Reward image */}
          <View style={styles.rewardContainer}>
            <View style={styles.rewardImageContainer}>
              <TreasureChestIcon size={80} />
            </View>
            <Text style={styles.rewardText}>Reward</Text>
          </View>
          
          {/* Claim button */}
          <TouchableOpacity 
            style={styles.claimButton} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.claimButtonText}>Claim Reward</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '75%',
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing[5],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neonPurple[600],
    ...theme.shadows.neonPurple,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
    position: 'relative',
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.pixel,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: theme.typography.fontSize.xl,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.pixel,
  },
  description: {
    fontSize: theme.typography.fontSize.base,
    color: 'white',
    marginBottom: theme.spacing[5],
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.pixel,
  },
  timer: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.neonGreen[500],
    marginBottom: theme.spacing[5],
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: theme.typography.fontFamily.pixel,
  },
  rewardContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  rewardImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: theme.spacing[2],
    backgroundColor: theme.colors.dark[400],
    borderWidth: 2,
    borderColor: theme.colors.neonGreen[600],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...theme.shadows.neonGreen,
  },
  rewardText: {
    fontSize: theme.typography.fontSize.sm,
    color: 'white',
    textAlign: 'center',
    marginBottom: theme.spacing[4],
    fontFamily: theme.typography.fontFamily.pixel,
  },
  claimButton: {
    width: '90%',
    backgroundColor: theme.colors.neonPurple[600],
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing[3],
    alignItems: 'center',
    ...theme.shadows.neonPurple,
  },
  claimButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
    fontFamily: theme.typography.fontFamily.pixel,
  },
});

export default DailyChallengePopup;
