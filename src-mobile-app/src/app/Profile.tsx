import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface UserProfile {
  username: string;
  email: string;
  profilePictureUrl: string;
}

const Profile: React.FC<UserProfile> = ({ username, email, profilePictureUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePictureUrl }} style={styles.profilePic} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      {/* Add more profile details here */}
      {/* Add buttons for editing profile */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  // Add more styles as needed
});

export default Profile;
