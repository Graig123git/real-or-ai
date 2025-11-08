import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import theme from '../theme';

const StatCard = ({ title, value, icon }: { title: string; value: string; icon?: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const AchievementCard = ({ title, description, unlocked }: { 
  title: string; 
  description: string; 
  unlocked: boolean;
}) => (
  <View style={[styles.achievementCard, !unlocked && styles.lockedAchievement]}>
    <View style={styles.achievementIcon}>
      {/* Icon placeholder */}
      <View style={[
        styles.achievementIconInner, 
        { backgroundColor: unlocked ? theme.colors.neonPurple[500] : theme.colors.dark[400] }
      ]} />
    </View>
    <View style={styles.achievementContent}>
      <Text style={[styles.achievementTitle, !unlocked && styles.lockedText]}>{title}</Text>
      <Text style={[styles.achievementDescription, !unlocked && styles.lockedText]}>
        {description}
      </Text>
    </View>
  </View>
);

const ProfileScreen = () => {
  // Mock user data
  const user = {
    username: 'YourUsername',
    level: 12,
    xp: 6650,
    nextLevelXp: 7500,
    streak: 7,
    isPro: false,
    coins: 350,
  };
  
  // Calculate XP progress
  const xpProgress = (user.xp / user.nextLevelXp) * 100;
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage} />
        </View>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {user.level}</Text>
        </View>
        
        <View style={styles.xpContainer}>
          <View style={[styles.xpProgress, { width: `${xpProgress}%` }]} />
          <Text style={styles.xpText}>{user.xp} / {user.nextLevelXp} XP</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <StatCard title="Streak" value={`${user.streak} days`} />
        <StatCard title="Coins" value={user.coins.toString()} />
        <StatCard title="Status" value={user.isPro ? 'PRO' : 'Free'} />
      </View>
      
      {!user.isPro && (
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achievementsContainer}>
        <AchievementCard 
          title="First Blood" 
          description="Complete your first round" 
          unlocked={true} 
        />
        <AchievementCard 
          title="Streak Master" 
          description="Maintain a 7-day streak" 
          unlocked={true} 
        />
        <AchievementCard 
          title="Perfect Round" 
          description="Get 10/10 correct answers" 
          unlocked={true} 
        />
        <AchievementCard 
          title="Media Master" 
          description="Complete rounds in all media types" 
          unlocked={false} 
        />
        <AchievementCard 
          title="Duel Champion" 
          description="Win 10 duels against other players" 
          unlocked={false} 
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.dark[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
    borderWidth: 2,
    borderColor: theme.colors.neonPurple[500],
    ...theme.shadows.neonPurple,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.dark[400],
  },
  username: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: 'white',
    marginBottom: theme.spacing[2],
  },
  levelContainer: {
    backgroundColor: theme.colors.neonPurple[600],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing[4],
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.sm,
  },
  xpContainer: {
    width: '100%',
    height: 20,
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  xpProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: theme.colors.neonPurple[500],
  },
  xpText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.xs,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[6],
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    alignItems: 'center',
    marginHorizontal: theme.spacing[1],
  },
  statTitle: {
    color: '#a0a0a0',
    fontSize: theme.typography.fontSize.sm,
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.spacing[1],
  },
  upgradeButton: {
    backgroundColor: theme.colors.neonGreen[600],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[3],
    alignItems: 'center',
    marginBottom: theme.spacing[6],
    ...theme.shadows.neonGreen,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.base,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: theme.spacing[4],
  },
  achievementsContainer: {
    marginBottom: theme.spacing[6],
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[3],
    alignItems: 'center',
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.dark[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[4],
  },
  achievementIconInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing[1],
  },
  achievementDescription: {
    color: '#a0a0a0',
    fontSize: theme.typography.fontSize.sm,
  },
  lockedText: {
    color: '#707070',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: theme.colors.dark[500],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing[3],
    alignItems: 'center',
    marginHorizontal: theme.spacing[2],
  },
  logoutButton: {
    backgroundColor: theme.colors.dark[400],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
