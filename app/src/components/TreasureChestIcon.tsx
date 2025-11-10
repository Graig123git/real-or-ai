import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

interface TreasureChestIconProps {
  size?: number;
}

const TreasureChestIcon: React.FC<TreasureChestIconProps> = ({ size = 100 }) => {
  // Scale all dimensions based on the size prop
  const scale = size / 100;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Chest base */}
      <View style={[styles.chestBase, { 
        width: 75 * scale, 
        height: 55 * scale, 
        borderRadius: 8 * scale,
        borderWidth: 2 * scale,
        bottom: 12 * scale
      }]} />
      
      {/* Chest lid */}
      <View style={[styles.chestLid, { 
        width: 75 * scale, 
        height: 28 * scale, 
        borderRadius: 8 * scale,
        borderWidth: 2 * scale,
        bottom: 58 * scale
      }]} />
      
      {/* Lock */}
      <View style={[styles.lock, { 
        width: 18 * scale, 
        height: 18 * scale, 
        borderRadius: 9 * scale,
        borderWidth: 1.5 * scale,
        bottom: 53 * scale
      }]}>
        <View style={[styles.keyhole, { 
          width: 6 * scale, 
          height: 6 * scale, 
          borderRadius: 3 * scale,
          borderWidth: 1 * scale
        }]} />
      </View>
      
      {/* Decorative bands */}
      <View style={[styles.horizontalBand, { 
        width: 75 * scale, 
        height: 5 * scale, 
        borderWidth: 1 * scale,
        bottom: 38 * scale
      }]} />
      
      <View style={[styles.verticalBand, { 
        width: 5 * scale, 
        height: 55 * scale, 
        borderWidth: 1 * scale,
        bottom: 12 * scale
      }]} />
      
      {/* Shine effect */}
      <View style={[styles.shine, {
        width: 10 * scale,
        height: 10 * scale,
        borderRadius: 5 * scale,
        bottom: 65 * scale,
        right: 25 * scale
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chestBase: {
    position: 'absolute',
    backgroundColor: '#8B4513', // Brown color for chest
    borderColor: theme.colors.neonGreen[600],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.neonGreen[600],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chestLid: {
    position: 'absolute',
    backgroundColor: '#A0522D', // Slightly lighter brown for lid
    borderColor: theme.colors.neonGreen[600],
    shadowColor: theme.colors.neonGreen[600],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  lock: {
    position: 'absolute',
    backgroundColor: '#FFD700', // Gold color for lock
    borderColor: '#B8860B', // Darker gold for border
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  keyhole: {
    backgroundColor: '#000',
    borderColor: '#B8860B',
  },
  horizontalBand: {
    position: 'absolute',
    backgroundColor: '#FFD700', // Gold color for bands
    borderColor: '#B8860B',
  },
  verticalBand: {
    position: 'absolute',
    backgroundColor: '#FFD700', // Gold color for bands
    borderColor: '#B8860B',
  },
  shine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
});

export default TreasureChestIcon;
