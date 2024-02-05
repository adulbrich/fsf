import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProfileProps {
  username: string;
  email: string;
  profilePictureUrl?: string; // The profile picture URL is optional
}

const Profile: React.FC<ProfileProps> = ({ username, email, profilePictureUrl }) => {
  const phoneNumber = 'Phone +1 234 567 890'; // Dummy data for demonstration

  // The relative path to your image.jpg file
  const localImagePath = '../../../assets/images/image.jpg';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Damfit</Text>
      </View>

      <View style={styles.profileSection}>
        {/* Display the image from the provided URL or the local image */}
        <Image 
          source={profilePictureUrl ? { uri: profilePictureUrl } : require(localImagePath)} 
          style={styles.profilePic} 
        />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        {/* Add more buttons as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // White background for the entire component
  },
  header: {
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: '#D73F09', // Orange background for the header
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white', // White background for the profile section
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20, // Increase this value to move the username text down
  },
  email: {
    fontSize: 16,
    marginTop: 10, // Adjust this value as needed
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginTop: 10, // Adjust this value as needed
  },
  buttonSection: {
    marginTop: 100,
  },
  button: {
    backgroundColor: 'gray', // Black background for the buttons
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // White text color for the buttons
  },
  profilePic: {
    width: 150, // Increase width as desired
    height: 150, // Increase height as desired
    borderRadius: 75, // Adjust borderRadius to maintain the circular shape
    marginTop: 10,
  },

});

export default Profile;

