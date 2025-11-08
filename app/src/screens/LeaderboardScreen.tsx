import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import theme from '../theme';

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
  isCurrentUser?: boolean;
};

const LeaderboardTab = ({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.tab, active && styles.activeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => (
  <View style={[styles.leaderboardRow, entry.isCurrentUser && styles.currentUserRow]}>
    <Text style={[styles.rankText, entry.isCurrentUser && styles.currentUserText]}>
      {entry.rank}
    </Text>
    <Text style={[styles.usernameText, entry.isCurrentUser && styles.currentUserText]}>
      {entry.username}
    </Text>
    <Text style={[styles.scoreText, entry.isCurrentUser && styles.currentUserText]}>
      {entry.score}
    </Text>
  </View>
);

const LeaderboardScreen = () => {
  const [activeTab, setActiveTab] = useState('daily');
  
  const dailyLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'NeonHunter', score: 1250 },
    { rank: 2, username: 'AIDetector', score: 1120 },
    { rank: 3, username: 'RealityChecker', score: 980 },
    { rank: 4, username: 'TruthSeeker', score: 920 },
    { rank: 5, username: 'PixelPerfect', score: 850 },
    { rank: 6, username: 'DeepFakeSpotter', score: 780 },
    { rank: 7, username: 'AIorHuman', score: 720 },
    { rank: 8, username: 'VisualExpert', score: 680 },
    { rank: 9, username: 'RealOrFake', score: 650 },
    { rank: 10, username: 'YourUsername', score: 620, isCurrentUser: true },
  ];
  
  const allTimeLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'AIDetector', score: 15250 },
    { rank: 2, username: 'NeonHunter', score: 14800 },
    { rank: 3, username: 'PixelPerfect', score: 12980 },
    { rank: 4, username: 'RealityChecker', score: 11920 },
    { rank: 5, username: 'DeepFakeSpotter', score: 10850 },
    { rank: 6, username: 'TruthSeeker', score: 9780 },
    { rank: 7, username: 'AIorHuman', score: 8720 },
    { rank: 8, username: 'VisualExpert', score: 7680 },
    { rank: 9, username: 'YourUsername', score: 6650, isCurrentUser: true },
    { rank: 10, username: 'RealOrFake', score: 5620 },
  ];
  
  const friendsLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'YourUsername', score: 6650, isCurrentUser: true },
    { rank: 2, username: 'Friend1', score: 5980 },
    { rank: 3, username: 'Friend2', score: 4720 },
    { rank: 4, username: 'Friend3', score: 3650 },
    { rank: 5, username: 'Friend4', score: 2540 },
  ];
  
  const getLeaderboardData = () => {
    switch (activeTab) {
      case 'daily':
        return dailyLeaderboard;
      case 'allTime':
        return allTimeLeaderboard;
      case 'friends':
        return friendsLeaderboard;
      default:
        return dailyLeaderboard;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      
      <View style={styles.tabContainer}>
        <LeaderboardTab 
          title="Daily" 
          active={activeTab === 'daily'} 
          onPress={() => setActiveTab('daily')} 
        />
        <LeaderboardTab 
          title="All Time" 
          active={activeTab === 'allTime'} 
          onPress={() => setActiveTab('allTime')} 
        />
        <LeaderboardTab 
          title="Friends" 
          active={activeTab === 'friends'} 
          onPress={() => setActiveTab('friends')} 
        />
      </View>
      
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rank</Text>
        <Text style={styles.headerText}>Username</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>
      
      <ScrollView style={styles.leaderboardContainer}>
        {getLeaderboardData().map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[600],
    padding: theme.spacing[6],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: theme.colors.neonPurple[500],
    marginBottom: theme.spacing[6],
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing[4],
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing[3],
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.dark[400],
  },
  activeTab: {
    borderBottomColor: theme.colors.neonPurple[500],
  },
  tabText: {
    color: '#a0a0a0',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: theme.colors.neonPurple[500],
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark[400],
  },
  headerText: {
    color: '#a0a0a0',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.sm,
  },
  leaderboardContainer: {
    flex: 1,
  },
  leaderboardRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark[500],
  },
  currentUserRow: {
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.neonPurple[500],
  },
  rankText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  usernameText: {
    flex: 3,
    color: 'white',
  },
  scoreText: {
    flex: 1,
    color: 'white',
    textAlign: 'right',
  },
  currentUserText: {
    color: theme.colors.neonPurple[300],
  },
});

export default LeaderboardScreen;
