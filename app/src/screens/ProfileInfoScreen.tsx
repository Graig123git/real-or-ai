import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import fonts from '../theme/fonts';
import * as ImagePicker from 'expo-image-picker';
import useUserProfileStore from '../state/userProfileStore';
import { fetchAuthSession } from 'aws-amplify/auth';

type ProfileInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileInfo'>;

// Upload SVG icon
const uploadSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.7002 15.83L1.7002 12.51C1.7002 12.0516 2.0718 11.68 2.5302 11.68C2.98859 11.68 3.3602 12.0516 3.3602 12.51L3.3602 15.83L3.36425 15.9118C3.38308 16.1019 3.46712 16.2806 3.60336 16.4168C3.75902 16.5725 3.97006 16.66 4.1902 16.66L15.8102 16.66C16.0303 16.66 16.2414 16.5725 16.397 16.4168C16.5527 16.2612 16.6402 16.0501 16.6402 15.83V12.51C16.6402 12.0516 17.0118 11.68 17.4702 11.68C17.9286 11.68 18.3002 12.0516 18.3002 12.51L18.3002 15.83C18.3002 16.4904 18.0377 17.1235 17.5707 17.5905C17.1038 18.0575 16.4706 18.32 15.8102 18.32L4.1902 18.32C3.52981 18.32 2.89666 18.0575 2.42969 17.5905C2.02116 17.182 1.76901 16.6463 1.71235 16.0764L1.7002 15.83Z" fill="#36E270"/>
<path d="M9.47632 1.8614C9.80235 1.59551 10.2829 1.61426 10.5868 1.91814L14.7368 6.06814L14.7936 6.13136C15.0594 6.45736 15.0406 6.93794 14.7368 7.24181C14.4329 7.54569 13.9523 7.56444 13.6263 7.29855L13.5632 7.24181L9.99997 3.67865L6.4368 7.24181C6.11266 7.56595 5.58726 7.56595 5.26312 7.24181C4.93899 6.91768 4.93899 6.39227 5.26312 6.06814L9.41316 1.91814L9.47632 1.8614Z" fill="#36E270"/>
<path d="M9.17041 12.48L9.17041 2.52C9.17041 2.06161 9.542 1.69 10.0004 1.69C10.4588 1.69 10.8304 2.06161 10.8304 2.52L10.8304 12.48C10.8304 12.9384 10.4588 13.31 10.0004 13.31C9.542 13.31 9.17041 12.9384 9.17041 12.48Z" fill="#36E270"/>
</svg>`;

const ProfileInfoScreen = () => {
  const navigation = useNavigation<ProfileInfoScreenNavigationProp>();
  const { setTempProfile, tempProfile } = useUserProfileStore();
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // List of countries with flags
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
  
  // Fetch user's given_name from auth session
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get the current auth session
        const session = await fetchAuthSession();
        
        // Check if the user is authenticated and has an ID token
        if (session.tokens?.idToken?.payload) {
          const payload = session.tokens.idToken.payload;
          
          // Get the given_name from the ID token payload
          const givenName = payload.given_name;
          
          // Set the username if given_name exists and is a string
          if (givenName && typeof givenName === 'string') {
            setUsername(givenName);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);

  const handleNext = () => {
    // Store the profile info in the user profile store
    setTempProfile({
      name: username, // Using username as the name
      username: username,
      country: country,
      avatarUrl: profileImage || undefined,
    });
    
    // Navigate to the next screen
    navigation.navigate('Preferences');
  };
  
  const handleSelectCountry = (selectedCountry: { name: string; flag: string }) => {
    setCountry(selectedCountry.name);
    setShowCountryPicker(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectImage = async () => {
    try {
      // Request permission to access the media library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      alert('Failed to select image. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Info</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <Text style={styles.sectionTitle}>Upload Profile Picture</Text>
          
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handleSelectImage}
          >
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={handleSelectImage}
          >
            <SvgXml xml={uploadSvg} width={20} height={20} />
            <Text style={styles.changePhotoButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        {/* User Details Section */}
        <View style={styles.userDetailsSection}>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { color: '#8E8E93' }]}
                placeholder="Enter your username"
                placeholderTextColor="#8E8E93"
                value={username}
                onChangeText={setUsername}
                editable={false}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Country</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowCountryPicker(true)}
            >
              <View style={styles.countryPickerButton}>
                <Text style={styles.countryIcon}>🌎</Text>
                <Text style={[styles.countryPickerText, !country && styles.placeholderText]}>
                  {country || "Select your country"}
                </Text>
                <View style={styles.triangleDown} />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Country Picker Modal */}
          {showCountryPicker && (
            <Modal
              transparent={true}
              visible={showCountryPicker}
              animationType="fade"
              onRequestClose={() => setShowCountryPicker(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  {/* Header with title and close button */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select Country</Text>
                    <TouchableOpacity 
                      style={styles.modalCloseButton} 
                      onPress={() => setShowCountryPicker(false)}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView 
                    style={styles.countryList}
                    showsVerticalScrollIndicator={false}
                  >
                    {countries.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.countryItem}
                        onPress={() => handleSelectCountry(item)}
                      >
                        <View style={styles.countryItemContent}>
                          <Text style={styles.countryFlag}>{item.flag}</Text>
                          <Text style={styles.countryItemText}>{item.name}</Text>
                        </View>
                        <View style={[
                          styles.radioButton, 
                          country === item.name && styles.radioButtonSelected
                        ]} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
      
      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            (!username.trim() || !country.trim()) && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!username.trim() || !country.trim()}
        >
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#9d4eff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: fonts.fontFamily.pixel,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#9d4eff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    color: '#9d4eff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoButtonText: {
    color: '#9d4eff',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
    marginLeft: 8,
  },
  userDetailsSection: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
  },
  inputIcon: {
    marginRight: 12,
    fontSize: 18,
    color: '#8E8E93',
  },
  input: {
    flex: 1,
    height: 45,
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  buttonContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  nextButton: {
    width: '100%',
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7a1cf7', // Purple color
    shadowColor: '#7a1cf7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#9d4eff',
  },
  nextButtonDisabled: {
    backgroundColor: '#4a4a4a',
    borderColor: '#4a4a4a',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.fontFamily.pixel,
  },
  // Country picker styles
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  countryIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  countryPickerText: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.fontFamily.pixel,
  },
  placeholderText: {
    color: '#8E8E93',
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#8E8E93',
  },
  countryPickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 1000,
  },
  countryPickerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1e',
    overflow: 'hidden',
  },
  countryPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  countryPickerTitle: {
    color: '#9d4eff', // Purple color like "Daily Challenge"
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
  countryPickerSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.fontFamily.pixel,
  },
  closeButtonContainer: {
    padding: 8,
  },
  closeButton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  countryList: {
    width: '100%',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  countryItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  countryItemText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.fontFamily.pixel,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555',
  },
  radioButtonSelected: {
    borderColor: '#9d4eff',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '60%',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: '#9d4eff',
    shadowColor: '#9d4eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9d4eff',
    textAlign: 'center',
    fontFamily: fonts.fontFamily.pixel,
  },
  modalCloseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily.pixel,
  },
});

export default ProfileInfoScreen;
