import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({ username, email, profilePictureUrl }) => {
  // Dummy data for demonstration
  const phoneNumber = '+1 234 567 89';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Faculty Staff Fitness</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: profilePictureUrl }} style={styles.profilePic} />
        <Text style={styles.username}>USER</Text>
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
        {/* Add more buttons as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8',
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
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
    color: '#D73F09',
    marginBottom: 20,
  },
  buttonSection: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ededed',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
