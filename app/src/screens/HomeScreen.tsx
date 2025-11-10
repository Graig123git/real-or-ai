import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';
import DailyChallengePopup from '../components/DailyChallengePopup';

const CategoryCard = ({ title, color }: { title: string; color: string }) => (
  <TouchableOpacity style={[styles.categoryCard, { backgroundColor: color }]}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const DailyChallenge = () => (
  <TouchableOpacity style={styles.dailyChallenge}>
    <Text style={styles.dailyChallengeTitle}>Daily Challenge</Text>
    <Text style={styles.dailyChallengeSubtitle}>5/10 Correct</Text>
    <View style={styles.dailyChallengeButton}>
      <Text style={styles.dailyChallengeButtonText}>Start Round</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  
  useEffect(() => {
    // Show the daily challenge popup after a delay
    const timer = setTimeout(() => {
      setShowDailyChallenge(true);
    }, 2000); // 2 seconds delay
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Home</Text>
        
        <DailyChallenge />
        
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <CategoryCard title="Images" color={theme.colors.neonPurple[700]} />
          <CategoryCard title="Videos" color={theme.colors.neonPurple[600]} />
          <CategoryCard title="Audio" color={theme.colors.neonPurple[500]} />
          <CategoryCard title="Text" color={theme.colors.neonPurple[400]} />
          <CategoryCard title="Mixed" color={theme.colors.neonGreen[600]} />
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>Images Round</Text>
            <Text style={styles.activitySubtitle}>8/10 Correct • +120 XP</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>Videos Round</Text>
            <Text style={styles.activitySubtitle}>6/10 Correct • +90 XP</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>Daily Challenge</Text>
            <Text style={styles.activitySubtitle}>7/10 Correct • +150 XP</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Daily Challenge Popup */}
      <DailyChallengePopup 
        visible={showDailyChallenge} 
        onClose={() => setShowDailyChallenge(false)} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
  },
  contentContainer: {
    padding: theme.spacing[6],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: theme.spacing[6],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: 'white',
    marginTop: theme.spacing[6],
    marginBottom: theme.spacing[4],
  },
  dailyChallenge: {
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[4],
    borderWidth: 1,
    borderColor: theme.colors.neonPurple[600],
    ...theme.shadows.neonPurple,
  },
  dailyChallengeTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: theme.spacing[2],
  },
  dailyChallengeSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: 'white',
    marginBottom: theme.spacing[4],
  },
  dailyChallengeButton: {
    backgroundColor: theme.colors.neonPurple[600],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[3],
    alignItems: 'center',
  },
  dailyChallengeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing[4],
  },
  categoryCard: {
    width: 120,
    height: 80,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing[4],
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.neonPurple,
  },
  categoryTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.lg,
  },
  activityContainer: {
    marginBottom: theme.spacing[6],
  },
  activityItem: {
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[3],
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.neonPurple[500],
  },
  activityTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: theme.spacing[1],
  },
  activitySubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: '#a0a0a0',
  },
});

export default HomeScreen;
