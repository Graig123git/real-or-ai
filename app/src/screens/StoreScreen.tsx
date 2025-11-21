import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import theme from '../theme';

type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type StoreItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: 'subscription' | 'powerup' | 'theme' | 'avatar';
  popular?: boolean;
  limited?: boolean;
};

const StoreItemCard = ({ item, onPress }: { item: StoreItem; onPress: () => void }) => {
  const { title, description, price, discountPrice, popular, limited } = item;
  
  return (
    <TouchableOpacity style={styles.itemCard} onPress={onPress}>
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>Popular</Text>
        </View>
      )}
      
      {limited && (
        <View style={[styles.popularBadge, styles.limitedBadge]}>
          <Text style={styles.popularBadgeText}>Limited</Text>
        </View>
      )}
      
      <View style={styles.itemIconContainer}>
        <View style={styles.itemIcon} />
      </View>
      
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
        
        <View style={styles.priceContainer}>
          {discountPrice ? (
            <>
              <Text style={styles.discountPrice}>{discountPrice} coins</Text>
              <Text style={styles.originalPrice}>{price} coins</Text>
            </>
          ) : (
            <Text style={styles.price}>{price} coins</Text>
          )}
          
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const StoreScreen = () => {
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'all' | 'subscription' | 'powerup' | 'theme' | 'avatar'>('all');
  
  // Mock user data
  const userCoins = 350;
  
  // Mock store items
  const storeItems: StoreItem[] = [
    {
      id: 'pro_monthly',
      title: 'Pro Membership - Monthly',
      description: 'No ads, unlimited rounds, exclusive content',
      price: 500,
      category: 'subscription',
      popular: true
    },
    {
      id: 'pro_yearly',
      title: 'Pro Membership - Yearly',
      description: 'Save 40% compared to monthly',
      price: 5000,
      discountPrice: 3000,
      category: 'subscription'
    },
    {
      id: 'hint_pack',
      title: 'Hint Pack',
      description: '10 hints to use during rounds',
      price: 200,
      category: 'powerup'
    },
    {
      id: 'streak_shield',
      title: 'Streak Shield',
      description: 'Protect your streak for 1 day',
      price: 150,
      category: 'powerup'
    },
    {
      id: 'double_xp',
      title: 'Double XP',
      description: 'Earn 2x XP for 24 hours',
      price: 300,
      category: 'powerup',
      limited: true
    },
    {
      id: 'neon_theme',
      title: 'Neon Theme',
      description: 'Vibrant neon UI theme',
      price: 400,
      category: 'theme'
    },
    {
      id: 'dark_theme',
      title: 'Dark Mode Pro',
      description: 'Enhanced dark theme with accent colors',
      price: 350,
      category: 'theme'
    },
    {
      id: 'detective_avatar',
      title: 'Detective Avatar',
      description: 'Special profile picture',
      price: 250,
      category: 'avatar'
    }
  ];
  
  // Filter items based on active tab
  const filteredItems = activeTab === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === activeTab);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Store</Text>
          <View style={styles.coinsContainer}>
            <View style={styles.coinIcon} />
            <Text style={styles.coinsText}>{userCoins} coins</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'subscription' && styles.activeTab]} 
            onPress={() => setActiveTab('subscription')}
          >
            <Text style={[styles.tabText, activeTab === 'subscription' && styles.activeTabText]}>Pro</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'powerup' && styles.activeTab]} 
            onPress={() => setActiveTab('powerup')}
          >
            <Text style={[styles.tabText, activeTab === 'powerup' && styles.activeTabText]}>Power-ups</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'theme' && styles.activeTab]} 
            onPress={() => setActiveTab('theme')}
          >
            <Text style={[styles.tabText, activeTab === 'theme' && styles.activeTabText]}>Themes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'avatar' && styles.activeTab]} 
            onPress={() => setActiveTab('avatar')}
          >
            <Text style={[styles.tabText, activeTab === 'avatar' && styles.activeTabText]}>Avatars</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView style={styles.itemsContainer}>
        {filteredItems.map(item => (
          <StoreItemCard 
            key={item.id} 
            item={item} 
            onPress={() => {/* Handle item selection */}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2e',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Courier',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f1c40f',
    marginRight: 8,
  },
  coinsText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2e',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#9d4eff',
  },
  tabText: {
    color: '#8E8E93',
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  activeTabText: {
    color: '#9d4eff',
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#9d4eff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  limitedBadge: {
    backgroundColor: '#ff4e4e',
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  itemIconContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3c3c3e',
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    fontFamily: 'Courier',
  },
  itemDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    fontFamily: 'Courier',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20ff8a',
    fontFamily: 'Courier',
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20ff8a',
    fontFamily: 'Courier',
  },
  originalPrice: {
    fontSize: 14,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginLeft: 8,
    fontFamily: 'Courier',
  },
  buyButton: {
    backgroundColor: '#9d4eff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
});

export default StoreScreen;
