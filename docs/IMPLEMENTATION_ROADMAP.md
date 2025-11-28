# Detailed Implementation Roadmap for "Real or AI?" Mobile App

## Phase 0: Foundations (Week 1)

### Day 1-2: Project Setup
- **Monorepo Setup**
  ```bash
  mkdir real-or-ai && cd real-or-ai
  npm init -y
  npx lerna init
  ```
- **Directory Structure**
  ```
  /app/                # React Native (Expo) client
  /infra/              # CDK infrastructure
  /tools/              # Utility scripts
  /docs/               # Documentation
  /seed/               # Seed data
  ```

### Day 3-4: Mobile App Scaffold
- **Expo Setup**
  ```bash
  cd app
  npx create-expo-app . --template expo-template-blank-typescript
  ```
- **Core Dependencies**
  ```bash
  npx expo install react-native-reanimated react-native-gesture-handler
  npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
  npm install nativewind tailwindcss
  npm install lottie-react-native expo-haptics
  npm install zustand @tanstack/react-query
  ```
- **Theme Configuration**
  - Create `/app/theme/index.ts` with neon purple/green color palette
  - Configure Tailwind with custom colors
  - Build base components with theme styling

### Day 5-6: Navigation & Screen Stubs
- **Navigation Structure**
  ```typescript
  // Main navigation structure
  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();
  
  // Auth Stack
  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
  
  // Main Tabs
  const MainTabs = () => (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Challenges" component={ChallengesScreen} />
      <Tabs.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
  ```
- **Screen Stubs**
  - Create placeholder screens with themed UI
  - Implement basic navigation flow

### Day 7: Backend Foundation
- **CDK Bootstrap**
  ```bash
  cd infra
  npx cdk init app --language typescript
  ```
- **Core Infrastructure**
  - Define Cognito User Pool with multiple auth providers
  - Set up AppSync API with basic schema
  - Create DynamoDB single table
  - Configure S3 bucket with CloudFront distribution

## Phase 1: Core Single Player (Weeks 2-3)

### Week 2: Authentication & Home

#### Day 1-2: Authentication
- **Cognito Integration**
  - Implement AWS Amplify Auth
  - Create auth context provider
  - Build login/register screens with email, Google, Apple options
  - Add guest authentication flow

#### Day 3-5: Home Dashboard
- **Home Screen**
  ```typescript
  // HomeScreen.tsx
  const HomeScreen = () => {
    const categories = [
      { id: 'images', title: 'Images', icon: 'image' },
      { id: 'videos', title: 'Videos', icon: 'video' },
      { id: 'audio', title: 'Audio', icon: 'headphones' },
      { id: 'text', title: 'Text', icon: 'file-text' },
      { id: 'mixed', title: 'Mixed', icon: 'shuffle' },
    ];
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Daily Challenge</Text>
        <DailyChallenge />
        
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryCard {...item} />}
          horizontal
        />
        
        <Text style={styles.title}>Recent Activity</Text>
        <RecentActivity />
      </View>
    );
  };
  ```
- **Backend Queries**
  - Implement `getDailyChallenge` query
  - Create `getCategories` query
  - Build `getRecentActivity` query

### Week 3: Gameplay & Results

#### Day 1-3: Gameplay Mechanics
- **Swipe Mechanics**
  ```typescript
  // SwipeCard.tsx
  const SwipeCard = ({ item, onSwipe }) => {
    const translateX = useSharedValue(0);
    
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX;
      })
      .onEnd((e) => {
        if (Math.abs(e.translationX) > 100) {
          const direction = e.translationX > 0 ? 'right' : 'left';
          runOnJS(onSwipe)(direction === 'right' ? 'REAL' : 'AI');
        } else {
          translateX.value = withSpring(0);
        }
      });
      
    // Animation and rendering logic...
  };
  ```
- **Game HUD**
  - Build round progress indicator
  - Create score display
  - Implement XP counter

#### Day 4-5: Results & Summary
- **Result Popup**
  - Design correct/wrong animations with Lottie
  - Add haptic feedback
  - Implement confetti effect for correct answers
- **Round Summary**
  - Create summary screen with score breakdown
  - Show XP gained and streak status
  - Add share functionality

## Phase 2: Content & Seeding (Week 4)

### Day 1-2: Content Structure
- **Content Models**
  ```typescript
  // DynamoDB content item structure
  interface ContentItem {
    PK: string;          // CONTENT#<id>
    SK: string;          // CONTENT#<id>
    id: string;          // unique identifier
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'TEXT';
    source: 'REAL' | 'AI';
    url: string;         // S3 path
    thumbnailUrl?: string; // for video/audio
    metadata: {
      title?: string;
      description?: string;
      creator?: string;
      license: string;
      tags: string[];
    };
    difficulty: 1 | 2 | 3;
    clues: string[];     // hints about real/AI nature
  }
  ```

### Day 3-5: Ingest Tool
- **Seed Script**
  ```typescript
  // tools/ingest/index.ts
  import { parse } from 'csv-parse';
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
  import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
  import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
  import * as sharp from 'sharp';
  import * as ffmpeg from 'fluent-ffmpeg';
  
  // Process CSV, upload to S3, generate thumbnails, write to DynamoDB
  ```
- **Content Processing**
  - Implement image processing with Sharp
  - Add video thumbnail generation with FFmpeg
  - Create audio waveform generation

## Phase 3: Monetization & Push (Week 5)

### Day 1-3: In-App Purchases
- **IAP Integration**
  ```typescript
  // Store.tsx
  import { initConnection, getProducts, requestPurchase } from 'react-native-iap';
  
  const storeProducts = [
    { id: 'pro_subscription', type: 'subscription' },
    { id: 'coin_pack_100', type: 'consumable' },
    { id: 'coin_pack_500', type: 'consumable' },
    // ...
  ];
  ```
- **Coin Economy**
  - Implement coin balance display
  - Create coin transaction history
  - Build purchase flow

### Day 4-5: Push Notifications
- **Notification Setup**
  ```typescript
  // notifications.ts
  import * as Notifications from 'expo-notifications';
  
  export async function registerForPushNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;
    
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
  ```
- **Backend Integration**
  - Set up AWS Pinpoint
  - Create notification templates
  - Implement scheduled reminders

## Phase 4: Duels (Weeks 6-7)

### Week 6: Duel Setup & Matchmaking

#### Day 1-3: Challenge Hub
- **Invite System**
  ```typescript
  // DuelService.ts
  export const sendInvite = async (friendId: string) => {
    const result = await API.graphql({
      query: gql`
        mutation SendInvite($friendId: ID!) {
          sendInvite(friendId: $friendId) {
            id
            status
            expiresAt
          }
        }
      `,
      variables: { friendId }
    });
    return result.data.sendInvite;
  };
  ```
- **Quick Match**
  - Implement matchmaking queue
  - Create waiting screen with animation
  - Build match found notification

#### Day 4-5: Duel Preparation
- **Synchronized Content**
  - Design content selection algorithm
  - Implement content preloading
  - Create synchronized timer

### Week 7: Duel Gameplay & Results

#### Day 1-3: Duel UI
- **Duel Screen**
  ```typescript
  // DuelScreen.tsx
  const DuelScreen = ({ route }) => {
    const { duelId } = route.params;
    const { data: duel } = useQuery(['duel', duelId], () => getDuel(duelId));
    const { data: updates } = useSubscription(['duelUpdates', duelId], () => 
      subscribeToUpdates(duelId)
    );
    
    // Render opponent info, content, timer, reactions
  };
  ```
- **Reactions & Chat**
  - Add reaction selector
  - Implement chat overlay
  - Create reaction animations

#### Day 4-5: Duel Results
- **Winner Determination**
  - Calculate scores and winner
  - Create winner animation
  - Implement XP distribution
- **Stats & Rematch**
  - Show detailed stats comparison
  - Add rematch functionality
  - Implement social sharing

## Phase 5: Polish & Launch (Week 8)

### Day 1-2: Accessibility & Performance
- **Accessibility**
  - Add reduced motion option
  - Implement high contrast mode
  - Ensure proper screen reader support
- **Performance**
  - Optimize animations for 60fps
  - Implement content preloading
  - Add offline support

### Day 3-4: Analytics & Monitoring
- **Analytics**
  - Set up conversion funnels
  - Implement event tracking
  - Create dashboard for key metrics
- **Error Handling**
  - Add global error boundary
  - Implement crash reporting
  - Create retry mechanisms

### Day 5: Final Testing & Preparation
- **QA**
  - Test on multiple devices
  - Verify all user flows
  - Check edge cases
- **Store Preparation**
  - Create app store screenshots
  - Write compelling descriptions
  - Prepare privacy policy

## Backend Schema (AppSync)

```graphql
type User @model {
  id: ID!
  username: String!
  email: String
  xp: Int!
  level: Int!
  streak: Int!
  coins: Int!
  isPro: Boolean!
  achievements: [Achievement] @connection
  stats: Stats @connection
}

type Content @model {
  id: ID!
  type: ContentType!
  source: SourceType!
  url: String!
  thumbnailUrl: String
  metadata: Metadata
  difficulty: Int!
  clues: [String]
}

type Round @model {
  id: ID!
  userId: ID!
  contentIds: [ID!]!
  guesses: [Guess]!
  score: Int!
  xpEarned: Int!
  completedAt: AWSDateTime
}

type Duel @model
  @key(fields: ["id"])
  @auth(rules: [{ allow: owner, operations: [read] }]) {
  id: ID!
  players: [ID!]!
  status: DuelStatus!
  contentIds: [ID!]!
  playerGuesses: [PlayerGuesses]!
  winner: ID
  expiresAt: AWSDateTime
}

# Queries, mutations, and subscriptions...
```

## DynamoDB Single Table Design

```
PK                    | SK                    | GSI1PK           | GSI1SK           | Attributes
----------------------|-----------------------|------------------|------------------|----------
USER#<id>             | USER#<id>             | USER#<id>        | USER#<id>        | username, email, xp, level, streak, coins, isPro
USER#<id>             | ACHIEVEMENT#<id>      | ACHIEVEMENT#<id> | USER#<id>        | name, description, unlockedAt
USER#<id>             | ROUND#<id>            | ROUND#<id>       | USER#<id>        | contentIds, guesses, score, xpEarned, completedAt
CONTENT#<id>          | CONTENT#<id>          | CONTENT#<type>   | CONTENT#<id>     | type, source, url, thumbnailUrl, metadata, difficulty, clues
DUEL#<id>             | DUEL#<id>             | DUEL#<status>    | DUEL#<id>        | players, status, contentIds, playerGuesses, winner, expiresAt
INVITE#<id>           | INVITE#<id>           | INVITE#<to>      | INVITE#<from>    | from, to, status, expiresAt
LEADERBOARD#<type>#<id>| LEADERBOARD#<type>#<id>| LEADERBOARD#<type>| SCORE#<score>   | userId, username, score, timestamp
```

## Implementation Checklist

Use this checklist to track your progress through the implementation of the "Real or AI?" mobile app.

### Phase 0: Foundations (Week 1)

#### Project Setup
- [ ] Create monorepo structure
- [ ] Initialize npm project
- [ ] Set up Lerna
- [ ] Create directory structure (app, infra, tools, docs, seed)

#### Mobile App Scaffold
- [ ] Initialize Expo app with TypeScript
- [ ] Install core dependencies:
  - [ ] React Navigation
  - [ ] Reanimated
  - [ ] Gesture Handler
  - [ ] Nativewind/Tailwind
  - [ ] Lottie
  - [ ] Haptics
  - [ ] Zustand
  - [ ] React Query
- [ ] Configure theme:
  - [ ] Create theme file with neon purple/green palette
  - [ ] Set up Tailwind with custom colors
  - [ ] Build base themed components

#### Navigation & Screen Stubs
- [ ] Set up main navigation structure
- [ ] Create Auth Stack
- [ ] Create Main Tabs
- [ ] Create placeholder screens:
  - [ ] Welcome
  - [ ] Login
  - [ ] Register
  - [ ] Home
  - [ ] Challenges
  - [ ] Leaderboard
  - [ ] Profile

#### Backend Foundation
- [ ] Initialize CDK project
- [ ] Set up Cognito User Pool
- [ ] Configure AppSync API with basic schema
- [ ] Create DynamoDB single table
- [ ] Set up S3 bucket with CloudFront

### Phase 1: Core Single Player (Weeks 2-3)

#### Authentication & Home
- [ ] Implement AWS Amplify Auth
- [ ] Create auth context provider
- [ ] Build login/register screens
- [ ] Add guest authentication flow
- [ ] Create Home Screen:
  - [ ] Daily Challenge section
  - [ ] Categories section
  - [ ] Recent Activity section
- [ ] Implement backend queries:
  - [ ] getDailyChallenge
  - [ ] getCategories
  - [ ] getRecentActivity

#### Gameplay & Results
- [ ] Implement swipe mechanics
- [ ] Create game HUD:
  - [ ] Round progress indicator
  - [ ] Score display
  - [ ] XP counter
- [ ] Build result popup:
  - [ ] Correct/wrong animations
  - [ ] Haptic feedback
  - [ ] Confetti effect
- [ ] Create round summary screen:
  - [ ] Score breakdown
  - [ ] XP gained display
  - [ ] Streak status
  - [ ] Share functionality

### Phase 2: Content & Seeding (Week 4)

#### Content Structure
- [ ] Define content models
- [ ] Create database schema for content items

#### Ingest Tool
- [ ] Create seed script
- [ ] Implement content processing:
  - [ ] Image processing with Sharp
  - [ ] Video thumbnail generation with FFmpeg
  - [ ] Audio waveform generation

### Phase 3: Monetization & Push (Week 5)

#### In-App Purchases
- [ ] Integrate react-native-iap
- [ ] Define store products
- [ ] Implement coin economy:
  - [ ] Coin balance display
  - [ ] Transaction history
  - [ ] Purchase flow

#### Push Notifications
- [ ] Set up expo-notifications
- [ ] Implement token registration
- [ ] Configure AWS Pinpoint
- [ ] Create notification templates
- [ ] Implement scheduled reminders

### Phase 4: Duels (Weeks 6-7)

#### Duel Setup & Matchmaking
- [ ] Create Challenge Hub
- [ ] Implement invite system:
  - [ ] Send invite functionality
  - [ ] Accept invite functionality
- [ ] Build quick match system:
  - [ ] Matchmaking queue
  - [ ] Waiting screen
  - [ ] Match found notification
- [ ] Implement duel preparation:
  - [ ] Content selection algorithm
  - [ ] Content preloading
  - [ ] Synchronized timer

#### Duel Gameplay & Results
- [ ] Create duel UI:
  - [ ] Opponent info display
  - [ ] Synchronized content view
  - [ ] Timer display
- [ ] Implement reactions & chat:
  - [ ] Reaction selector
  - [ ] Chat overlay
  - [ ] Reaction animations
- [ ] Build duel results:
  - [ ] Score calculation
  - [ ] Winner determination
  - [ ] Winner animation
  - [ ] XP distribution
- [ ] Create stats & rematch:
  - [ ] Detailed stats comparison
  - [ ] Rematch functionality
  - [ ] Social sharing

### Phase 5: Polish & Launch (Week 8)

#### Accessibility & Performance
- [ ] Add accessibility features:
  - [ ] Reduced motion option
  - [ ] High contrast mode
  - [ ] Screen reader support
- [ ] Optimize performance:
  - [ ] Animation optimization for 60fps
  - [ ] Content preloading
  - [ ] Offline support

#### Analytics & Monitoring
- [ ] Set up analytics:
  - [ ] Conversion funnels
  - [ ] Event tracking
  - [ ] Metrics dashboard
- [ ] Implement error handling:
  - [ ] Global error boundary
  - [ ] Crash reporting
  - [ ] Retry mechanisms

#### Final Testing & Preparation
- [ ] Perform QA:
  - [ ] Test on multiple devices
  - [ ] Verify all user flows
  - [ ] Check edge cases
- [ ] Prepare for store submission:
  - [ ] Create app store screenshots
  - [ ] Write app descriptions
  - [ ] Prepare privacy policy

### Backend Implementation

#### GraphQL Schema
- [ ] Define User type
- [ ] Define Content type
- [ ] Define Round type
- [ ] Define Duel type
- [ ] Create queries
- [ ] Create mutations
- [ ] Create subscriptions

#### DynamoDB Table Design
- [ ] Implement User items
- [ ] Implement Achievement items
- [ ] Implement Round items
- [ ] Implement Content items
- [ ] Implement Duel items
- [ ] Implement Invite items
- [ ] Implement Leaderboard items
