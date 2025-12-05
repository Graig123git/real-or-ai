import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import useUserProfileStore from '../state/userProfileStore';
import Slider from '@react-native-community/slider';

type PreferencesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preferences'>;

// SVG icons with different colors
const bellRingSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7646 17.0187C11.0106 16.6775 11.4802 16.5713 11.8523 16.7861C12.2246 17.001 12.3678 17.4609 12.1952 17.8447L12.1564 17.9201C11.9378 18.2984 11.6236 18.6126 11.2453 18.8311C10.8669 19.0495 10.4372 19.165 10.0003 19.1651C9.56328 19.1651 9.13376 19.0496 8.75528 18.8311C8.42403 18.6398 8.14191 18.3754 7.93014 18.0587L7.84342 17.9201L7.80451 17.8447C7.632 17.4609 7.7752 17.001 8.14737 16.7861C8.51956 16.5712 8.98909 16.6775 9.2351 17.0187L9.28133 17.0901L9.34134 17.1808C9.40741 17.2669 9.49066 17.3394 9.58528 17.394C9.71136 17.4667 9.8547 17.5051 10.0003 17.5051C10.1459 17.505 10.2892 17.4668 10.4153 17.394C10.5414 17.3212 10.6456 17.2161 10.7184 17.0901L10.7646 17.0187Z" fill="#9d4eff"/>
<path d="M17.4997 6.66004C17.4997 5.06149 16.9809 3.64652 16.1599 2.40466L15.9912 2.15907L15.9459 2.08693C15.7393 1.72053 15.8397 1.24943 16.1907 1.0016C16.5417 0.753764 17.0193 0.817073 17.2954 1.13454L17.3481 1.201L17.5451 1.49036C18.5113 2.95249 19.1597 4.6792 19.1597 6.66004C19.1597 7.11843 18.7881 7.49004 18.3297 7.49004C17.8712 7.49004 17.4997 7.11843 17.4997 6.66004Z" fill="#9d4eff"/>
<path d="M14.1498 6.67499C14.1498 5.57448 13.7129 4.51906 12.9348 3.74081C12.1565 2.96253 11.1005 2.52499 9.99981 2.52499C8.89923 2.52505 7.84383 2.96258 7.06561 3.74081C6.2874 4.51907 5.84979 5.57439 5.84979 6.67499L5.84655 7.03487C5.81101 8.79855 5.51248 10.0592 5.04735 11.0439C4.55727 12.0813 3.90692 12.751 3.3606 13.315L16.6398 13.315C16.0923 12.7507 15.4429 12.0806 14.9531 11.0439C14.4567 9.99333 14.1498 8.62889 14.1498 6.67499ZM15.8098 6.67499C15.8098 8.45509 16.0886 9.56248 16.4534 10.3346C16.7276 10.9151 17.0656 11.3415 17.4503 11.7587L17.8499 12.1786L17.8678 12.1981C18.0843 12.436 18.2272 12.7316 18.2787 13.0491C18.3302 13.3665 18.2888 13.6921 18.1588 13.9861C18.0286 14.2802 17.8155 14.5304 17.546 14.7059C17.31 14.8595 17.0393 14.9508 16.7597 14.9709L16.6398 14.975L3.35979 14.975C3.03807 14.9747 2.72304 14.8809 2.4536 14.7051C2.18415 14.5293 1.97143 14.2789 1.84164 13.9845C1.71189 13.6902 1.67053 13.3642 1.72248 13.0467C1.77446 12.7293 1.91753 12.434 2.13424 12.1964L2.15126 12.1778L2.55087 11.7587C2.93501 11.3417 3.27199 10.9151 3.54622 10.3346C3.88817 9.6107 4.15458 8.59221 4.18655 7.00083L4.18979 6.67499C4.18979 5.13408 4.80235 3.65591 5.89194 2.56632C6.98145 1.47698 8.45908 0.865048 9.99981 0.86499C11.5406 0.86499 13.0189 1.47681 14.1085 2.56632C15.198 3.65591 15.8098 5.13408 15.8098 6.67499Z" fill="#9d4eff"/>
<path d="M0.839844 6.66001C0.839844 4.54711 1.57712 2.72289 2.65142 1.20097C2.91579 0.826557 3.43442 0.73725 3.80888 1.00157C4.18329 1.26595 4.2726 1.78458 4.00827 2.15904C3.0906 3.4591 2.49984 4.95495 2.49984 6.66001C2.49984 7.1184 2.12824 7.49001 1.66984 7.49001C1.21145 7.49001 0.839844 7.1184 0.839844 6.66001Z" fill="#9d4eff"/>
</svg>`;

const paletteSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4701 9.16999C17.4701 7.43886 16.707 5.75812 15.314 4.50449C13.9182 3.24829 12.0078 2.53 10.0001 2.53C8.01895 2.53 6.11868 3.31676 4.71778 4.71766C3.31688 6.11856 2.53012 8.01883 2.53012 9.99999C2.53012 11.9811 3.31688 13.8814 4.71778 15.2824C6.11868 16.6832 8.01895 17.47 10.0001 17.47H10.2076C10.3232 17.47 10.4368 17.4375 10.5351 17.3768C10.6333 17.316 10.7128 17.2288 10.7645 17.1255C10.816 17.0222 10.8381 16.9066 10.8277 16.7916C10.8199 16.7053 10.7938 16.6221 10.7523 16.5468L10.7053 16.4738L10.4565 16.1423C10.2021 15.8032 10.0471 15.3997 10.009 14.9776C9.97098 14.5555 10.0514 14.1311 10.2408 13.752C10.4304 13.3729 10.7225 13.0541 11.083 12.8312C11.4436 12.6084 11.8587 12.49 12.2826 12.49H14.1501L14.3146 12.4859C15.1352 12.4453 15.9137 12.1011 16.4974 11.5173C17.1201 10.8947 17.4701 10.0505 17.4701 9.16999ZM19.1301 9.16999C19.1301 10.4908 18.6051 11.7571 17.6711 12.691C16.7957 13.5665 15.6281 14.0824 14.3974 14.1435L14.1501 14.15H12.2826C12.167 14.15 12.0535 14.1824 11.9552 14.2432C11.8569 14.304 11.7774 14.3912 11.7258 14.4944C11.6742 14.5978 11.6521 14.7134 11.6625 14.8284C11.6729 14.9436 11.7156 15.0537 11.7849 15.1462L12.0338 15.4777L12.1246 15.6081C12.325 15.9182 12.4479 16.2731 12.4812 16.6424C12.5192 17.0645 12.4388 17.4889 12.2494 17.868C12.0598 18.2471 11.7678 18.5659 11.4072 18.7888C11.0467 19.0116 10.6315 19.13 10.2076 19.13H10.0001C7.57869 19.13 5.25632 18.1682 3.54411 16.456C1.8319 14.7438 0.870117 12.4214 0.870117 9.99999C0.870117 7.57857 1.8319 5.2562 3.54411 3.54399C5.25632 1.83178 7.57869 0.869995 10.0001 0.869995C12.395 0.869995 14.7072 1.72528 16.4245 3.27084C18.1447 4.81899 19.1301 6.9388 19.1301 9.16999Z" fill="#36E270"/>
<path d="M11.25 5.835C11.4791 5.835 11.665 5.6492 11.665 5.42C11.665 5.19081 11.4791 5.005 11.25 5.005C11.0208 5.005 10.835 5.19081 10.835 5.42C10.835 5.6492 11.0208 5.835 11.25 5.835Z" fill="#36E270"/>
<path d="M11.2499 5.00499C11.0207 5.00499 10.8349 5.19079 10.8349 5.41999C10.8349 5.64918 11.0207 5.83499 11.2499 5.83499C11.479 5.83499 11.6649 5.64918 11.6649 5.41999C11.6649 5.19079 11.479 5.00499 11.2499 5.00499ZM12.4949 5.41999C12.4949 6.10758 11.9375 6.66499 11.2499 6.66499C10.5623 6.66499 10.0049 6.10758 10.0049 5.41999C10.0049 4.73239 10.5623 4.17499 11.2499 4.17499C11.9375 4.17499 12.4949 4.73239 12.4949 5.41999Z" fill="#36E270"/>
<path d="M14.58 9.16502C14.8092 9.16502 14.995 8.97918 14.995 8.75002C14.995 8.52086 14.8092 8.33502 14.58 8.33502C14.3509 8.33502 14.165 8.52086 14.165 8.75002C14.165 8.97918 14.3509 9.16502 14.58 9.16502Z" fill="#36E270"/>
<path d="M14.58 8.335C14.3508 8.335 14.165 8.52084 14.165 8.75C14.165 8.97917 14.3508 9.165 14.58 9.165C14.8091 9.165 14.995 8.97917 14.995 8.75C14.995 8.52084 14.8091 8.335 14.58 8.335ZM15.825 8.75C15.825 9.43758 15.2675 9.995 14.58 9.995C13.8924 9.995 13.335 9.43758 13.335 8.75C13.335 8.06241 13.8924 7.505 14.58 7.505C15.2675 7.505 15.825 8.06241 15.825 8.75Z" fill="#36E270"/>
<path d="M5.41988 10.835C5.64908 10.835 5.83488 10.6492 5.83488 10.42C5.83488 10.1908 5.64908 10.005 5.41988 10.005C5.19069 10.005 5.00488 10.1908 5.00488 10.42C5.00488 10.6492 5.19069 10.835 5.41988 10.835Z" fill="#36E270"/>
<path d="M5.42029 10.005C5.1911 10.005 5.00529 10.1908 5.00529 10.42C5.00529 10.6492 5.1911 10.835 5.42029 10.835C5.64949 10.835 5.83529 10.6492 5.83529 10.42C5.83529 10.1908 5.64949 10.005 5.42029 10.005ZM6.66529 10.42C6.66529 11.1076 6.10789 11.665 5.42029 11.665C4.7327 11.665 4.17529 11.1076 4.17529 10.42C4.17529 9.73242 4.7327 9.17499 5.42029 9.17499C6.10789 9.17499 6.66529 9.73242 6.66529 10.42Z" fill="#36E270"/>
<path d="M7.08004 6.66502C7.30924 6.66502 7.49504 6.47922 7.49504 6.25002C7.49504 6.02083 7.30924 5.83502 7.08004 5.83502C6.85084 5.83502 6.66504 6.02083 6.66504 6.25002C6.66504 6.47922 6.85084 6.66502 7.08004 6.66502Z" fill="#36E270"/>
<path d="M7.07996 5.835C6.85076 5.835 6.66496 6.02081 6.66496 6.25C6.66496 6.4792 6.85076 6.665 7.07996 6.665C7.30916 6.665 7.49496 6.4792 7.49496 6.25C7.49496 6.02081 7.30916 5.835 7.07996 5.835ZM8.32496 6.25C8.32496 6.9376 7.76756 7.495 7.07996 7.495C6.39236 7.495 5.83496 6.9376 5.83496 6.25C5.83496 5.56241 6.39236 5.005 7.07996 5.005C7.76756 5.005 8.32496 5.56241 8.32496 6.25Z" fill="#36E270"/>
</svg>`;

const volumeSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.39794 2.53886C8.60494 2.51352 8.81501 2.5343 9.01313 2.59964L9.11124 2.63611L9.20602 2.67908C9.39244 2.77287 9.5557 2.90704 9.68427 3.07138L9.74586 3.15649L9.80097 3.24565C9.9209 3.45723 9.98457 3.69672 9.98498 3.9411L9.98498 16.0563L9.98091 16.1609C9.96323 16.4041 9.88347 16.6395 9.74752 16.8433C9.59206 17.0763 9.3707 17.2581 9.11199 17.3653C8.85319 17.4727 8.56809 17.5004 8.29337 17.4456C8.01863 17.3909 7.76584 17.2564 7.56793 17.0582L4.75938 14.248C4.72842 14.2169 4.69136 14.1919 4.65077 14.1751C4.61019 14.1582 4.56662 14.1498 4.52271 14.1499L2.51498 14.1499C2.07472 14.1499 1.65262 13.975 1.34131 13.6636C1.06883 13.3911 0.900747 13.0338 0.86309 12.6537L0.85498 12.4899L0.85498 7.50993C0.854989 7.06968 1.03 6.64757 1.34131 6.33626C1.65262 6.02496 2.07472 5.84993 2.51498 5.84993L4.52271 5.84993L4.58836 5.84345C4.60965 5.83922 4.63062 5.83316 4.65077 5.82481C4.69136 5.80799 4.72842 5.78302 4.75938 5.75186L7.57036 2.9417L7.64655 2.87037C7.8311 2.71159 8.05423 2.6027 8.29418 2.55507L8.39794 2.53886ZM2.51498 12.4899L4.52028 12.4899C4.78302 12.4895 5.04348 12.541 5.28624 12.6415C5.52895 12.7421 5.74924 12.8899 5.93468 13.076L8.32498 15.4663L8.32498 4.53361L5.93468 6.92391C5.74925 7.11001 5.52896 7.2578 5.28624 7.35837C5.04348 7.45892 4.78302 7.50958 4.52028 7.50913L2.51498 7.50993L2.51498 12.4899Z" fill="#9d4eff"/>
<path d="M13.3348 10C13.3348 9.37145 13.1567 8.7575 12.8234 8.22894L12.671 8.00766L12.6232 7.93715C12.4063 7.57686 12.4934 7.10391 12.8371 6.84614C13.1809 6.58843 13.6593 6.63743 13.9444 6.94666L13.9986 7.01231L14.1162 7.17604C14.6873 8.00545 14.9948 8.98982 14.9948 10C14.9948 11.0774 14.6451 12.1256 13.9986 12.9877C13.7237 13.3544 13.2038 13.4287 12.8371 13.1538C12.4704 12.8788 12.3961 12.359 12.671 11.9923C13.102 11.4177 13.3348 10.7183 13.3348 10Z" fill="#9d4eff"/>
<path d="M17.4952 10.0002C17.4952 9.12833 17.3239 8.26468 16.9902 7.45914C16.6983 6.75429 16.2872 6.10553 15.7761 5.54138L15.5508 5.30471L15.494 5.24149C15.2281 4.91548 15.2469 4.43491 15.5508 4.13103C15.8546 3.82716 16.3352 3.8084 16.6612 4.0743L16.7244 4.13103L17.0057 4.42688C17.6448 5.13212 18.1589 5.94253 18.5238 6.82367C18.9409 7.83067 19.1552 8.9102 19.1552 10.0002L19.1455 10.4079C19.0988 11.3584 18.8888 12.2949 18.5238 13.1759C18.1067 14.1829 17.4951 15.0987 16.7244 15.8693L16.6612 15.9261C16.3353 16.1918 15.8545 16.173 15.5508 15.8693C15.2266 15.5452 15.2266 15.019 15.5508 14.6949L15.7761 14.459C16.2873 13.8948 16.6982 13.2461 16.9902 12.5413C17.2822 11.8365 17.4496 11.0871 17.4872 10.3268L17.4952 10.0002Z" fill="#9d4eff"/>
</svg>`;

const PreferencesScreen = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();
  const { profile, tempProfile, setTempProfile } = useUserProfileStore();
  
  // Initialize state with current preferences from the store
  const [appAlerts, setAppAlerts] = useState(profile?.preferences.notifications.appAlerts ?? true);
  const [marketingPromotions, setMarketingPromotions] = useState(profile?.preferences.notifications.marketingPromotions ?? false);
  const [inGameReminders, setInGameReminders] = useState(profile?.preferences.notifications.inGameReminders ?? true);
  const [isDarkMode, setIsDarkMode] = useState(profile?.preferences.theme === 'dark');
  const [audioSfxIntensity, setAudioSfxIntensity] = useState(profile?.preferences.audioSfxIntensity ?? 70);

  // Handle toggle changes - only update local state, don't save to backend yet
  const handleAppAlertsToggle = (value: boolean) => {
    setAppAlerts(value);
  };

  const handleMarketingPromotionsToggle = (value: boolean) => {
    setMarketingPromotions(value);
  };

  const handleInGameRemindersToggle = (value: boolean) => {
    setInGameReminders(value);
  };

  const handleThemeToggle = (value: boolean) => {
    setIsDarkMode(value);
  };

  const handleAudioSfxIntensityChange = (value: number) => {
    setAudioSfxIntensity(value);
  };

  // Collect all preferences to pass to the next screen
  const collectPreferences = () => {
    const theme: 'dark' | 'neon-purple' | 'neon-green' = isDarkMode ? 'dark' : 'neon-purple';
    
    return {
      notifications: {
        appAlerts,
        marketingPromotions,
        inGameReminders
      },
      theme,
      audioSfxIntensity
    };
  };

  // Handle navigation to next screen
  const handleNext = () => {
    // Collect all preferences
    const updatedPreferences = collectPreferences();
    
    // Get the country from tempProfile
    const userCountry = tempProfile?.country || '';
    
    // Find the flag emoji for the country
    const countryWithFlag = countries.find(c => c.name === userCountry);
    const flagEmoji = countryWithFlag?.flag || '🌎';
    
    // Store preferences and ensure country info is preserved in the tempProfile
    // Format the country to include the flag emoji if needed
    const countryWithFlagDisplay = userCountry ? `${flagEmoji} ${userCountry}` : '';
    
    setTempProfile({
      ...tempProfile, // Preserve existing profile data
      country: countryWithFlagDisplay || userCountry, // Include country with flag for display
      preferences: updatedPreferences // Update preferences
    });
    
    // Navigate to confirmation screen
    navigation.navigate('Confirmation');
  };
  
  // List of countries with flags (same as in ProfileInfoScreen)
  const countries = [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Global', flag: '🌎' }
  ];

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Notifications Section */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
              <SvgXml xml={bellRingSvg} width={28} height={28} />
              <Text style={[styles.sectionTitle, { marginLeft: 16 }]}>Notifications</Text>
            </View>
            
            {/* App Alerts Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>App Alerts</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  appAlerts ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {appAlerts ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={appAlerts}
                  onValueChange={handleAppAlertsToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={appAlerts ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Marketing Promotions Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Marketing Promotions</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  marketingPromotions ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {marketingPromotions ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={marketingPromotions}
                  onValueChange={handleMarketingPromotionsToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={marketingPromotions ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* In-Game Reminders Toggle */}
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>In-Game Reminders</Text>
              <View style={styles.toggleContainer}>
                <Text style={[
                  styles.toggleStateText, 
                  inGameReminders ? styles.toggleStateOn : styles.toggleStateOff
                ]}>
                  {inGameReminders ? 'On' : 'Off'}
                </Text>
                <Switch
                  value={inGameReminders}
                  onValueChange={handleInGameRemindersToggle}
                  trackColor={{ false: '#3e3e3e', true: '#7a1cf7' }}
                  thumbColor={inGameReminders ? '#ffffff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
          </View>
          
          {/* Appearance Mode Section */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
              <SvgXml xml={paletteSvg} width={28} height={28} />
              <Text style={[styles.sectionTitle, { color: '#36E270', marginLeft: 16 }]}>Appearance Mode</Text>
            </View>
            
            <View style={styles.themeToggleContainer}>
              <View style={styles.customToggle}>
                <TouchableOpacity 
                  style={[styles.toggleOption, !isDarkMode && styles.selectedToggleOption]}
                  onPress={() => handleThemeToggle(false)}
                >
                  <Text style={styles.sunIcon}>☀️</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleOption, isDarkMode && styles.selectedToggleOption]}
                  onPress={() => handleThemeToggle(true)}
                >
                  <Text style={styles.moonIcon}>🌙</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.themeTextContainer}>
              <Text style={styles.currentThemeText}>
                midas is <Text style={styles.highlightedText}>{isDarkMode ? 'dark' : 'light'}</Text> mode
              </Text>
              <Text style={styles.themeInstructionText}>
                Toggle the switch to change mode
              </Text>
            </View>
          </View>

          {/* Audio SFX Intensity Section */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
              <SvgXml xml={volumeSvg} width={28} height={28} />
              <Text style={[styles.sectionTitle, { marginLeft: 16 }]}>Audio SFX Intensity</Text>
            </View>
            
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={audioSfxIntensity}
                onValueChange={handleAudioSfxIntensityChange}
                minimumTrackTintColor="#7a1cf7"
                maximumTrackTintColor="#3e3e3e"
                thumbTintColor="#9d4eff"
              />
              <Text style={styles.sliderValueText}>
                <Text style={styles.highlightedText}>{Math.round(audioSfxIntensity)}%</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: fonts.fontFamily.pixel,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    color: '#9d4eff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  sectionTitleCentered: {
    color: '#9d4eff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.fontFamily.pixel,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.fontFamily.pixel,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleStateText: {
    marginRight: 8,
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  toggleStateOn: {
    color: '#9d4eff',
  },
  toggleStateOff: {
    color: '#8E8E93',
  },
  divider: {
    height: 1,
    backgroundColor: '#2c2c2e',
    marginVertical: 4,
  },
  themeToggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  customToggle: {
    width: 120,
    height: 60,
    backgroundColor: '#2c2c2e',
    borderRadius: 30,
    flexDirection: 'row',
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
  },
  selectedToggleOption: {
    backgroundColor: '#3e3e3e',
  },
  sunIcon: {
    fontSize: 24,
  },
  moonIcon: {
    fontSize: 24,
    color: '#f8e71c',
  },
  themeTextContainer: {
    alignItems: 'center',
  },
  currentThemeText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  highlightedText: {
    color: '#9d4eff',
    fontWeight: 'bold',
  },
  themeInstructionText: {
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  sliderContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValueText: {
    color: 'white',
    fontSize: 18,
    marginTop: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#000000',
  },
  nextButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7a1cf7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default PreferencesScreen;
