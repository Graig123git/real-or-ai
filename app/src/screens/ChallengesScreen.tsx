import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import theme from '../theme';

const ChallengeCard = ({ title, description, progress, color }: { 
  title: string; 
  description: string; 
  progress: string;
  color: string;
}) => (
  <TouchableOpacity style={[styles.challengeCard, { borderColor: color }]}>
    <Text style={[styles.challengeTitle, { color }]}>{title}</Text>
    <Text style={styles.challengeDescription}>{description}</Text>
    <View style={styles.challengeFooter}>
      <Text style={styles.challengeProgress}>{progress}</Text>
      <View style={[styles.challengeButton, { backgroundColor: color }]}>
        <Text style={styles.challengeButtonText}>Start</Text>
      </View>
    </View>r
  </TouchableOpacity>
);

const ChallengesScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Challenges</Text>
        
        <Text style={styles.sectionTitle}>Daily Challenge</Text>
        <ChallengeCard 
          title="Daily Chronicle" 
          description="Test your skills across all media types in today's daily challenge." 
          progress="Reward: 150 XP"
          color={theme.colors.neonPurple[500]}
        />
        
        <Text style={styles.sectionTitle}>Special Challenges</Text>
        <ChallengeCard 
          title="Space Exploration" 
          description="Can you tell real NASA images from AI-generated space scenes?" 
          progress="10 rounds • Hard"
          color={theme.colors.neonGreen[500]}
        />
        <ChallengeCard 
          title="Celebrity Voices" 
          description="Distinguish real celebrity clips from AI voice clones." 
          progress="8 rounds • Medium"
          color={theme.colors.neonPurple[400]}
        />
        <ChallengeCard 
          title="News Headlines" 
          description="Spot the real headlines from the AI-generated ones." 
          progress="12 rounds • Easy"
          color={theme.colors.neonPurple[600]}
        />
        
        <Text style={styles.sectionTitle}>Upcoming</Text>
        <View style={styles.upcomingChallenge}>
          <Text style={styles.upcomingTitle}>Weekend Tournament</Text>
          <Text style={styles.upcomingDescription}>Compete against other players in real-time duels.</Text>
          <Text style={styles.upcomingTime}>Starts in 2 days</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
  },
  contentContainer: {
    paddingVertical: theme.spacing[6],
    paddingHorizontal: 0,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[2],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: 'white',
    marginTop: theme.spacing[4],
    marginBottom: theme.spacing[3],
    paddingHorizontal: theme.spacing[2],
  },
  challengeCard: {
    backgroundColor: theme.colors.dark[500],
    borderRadius: 0,
    padding: theme.spacing[4],
    paddingHorizontal: theme.spacing[2],
    marginBottom: 4,
    marginHorizontal: 0,
    borderWidth: 0,
    borderLeftWidth: 4,
    width: '100%',
  },
  challengeTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: theme.spacing[2],
  },
  challengeDescription: {
    fontSize: theme.typography.fontSize.base,
    color: 'white',
    marginBottom: theme.spacing[4],
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeProgress: {
    fontSize: theme.typography.fontSize.sm,
    color: '#a0a0a0',
  },
  challengeButton: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
  },
  challengeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.sm,
  },
  upcomingChallenge: {
    backgroundColor: theme.colors.dark[500],
    borderRadius: 0,
    padding: theme.spacing[4],
    paddingHorizontal: theme.spacing[2],
    marginBottom: 4,
    marginHorizontal: 0,
    borderWidth: 0,
    borderColor: theme.colors.dark[400],
    opacity: 0.8,
    width: '100%',
  },
  upcomingTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.neonPurple[300],
    marginBottom: theme.spacing[2],
  },
  upcomingDescription: {
    fontSize: theme.typography.fontSize.base,
    color: 'white',
    marginBottom: theme.spacing[2],
  },
  upcomingTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neonGreen[400],
    fontWeight: 'bold',
  },
});

export default ChallengesScreen;
