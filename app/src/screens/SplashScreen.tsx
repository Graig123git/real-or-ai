import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.icon} />
        </View>

        {/* Text */}
        <View style={{ marginTop: 60 }}>
          <Text style={styles.text}>
            Can you spot the fake?
          </Text>
        </View>
      </View>

      {/* Button */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Get screen width for responsive button sizing
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[900],
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.neonPurple[500],
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.dark[900],
    borderRadius: 4,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.neonPurple[500],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: width * 0.8, // 80% of screen width
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
