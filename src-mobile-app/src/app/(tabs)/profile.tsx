import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface ProfileProps {
  username: string;
  profilePictureUrl?: string;
}

const Profile: React.FC<ProfileProps> = ({ username: initialUsername, profilePictureUrl }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(''); // Initialize with actual email if available
  const [password, setPassword] = useState('');

  const phoneNumber = 'Phone +1 234 567 890';
  const localImagePath = '../../../assets/images/image.jpg';

  const onSave = (username: string, email: string, password: string) => {
    // Here you would handle the saving of the profile data
    console.log(username, email, password); // Replace with actual save logic
    setIsEditing(false); // Close the edit mode after saving
  };

  const signOut = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>OSU Damfit</Text>
      </View>
      {!isEditing ? (
        <View style={styles.profileSection}>
          <Image 
            source={profilePictureUrl ? { uri: profilePictureUrl } : require(localImagePath)} 
            style={styles.profilePic}
          />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.phone}>{phoneNumber}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Profile Information</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
          <Text style={styles.buttonText}>
            {notificationsEnabled ? 'Notifications (ON)' : 'Notifications (OFF)'}
          </Text>
        </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile Information</Text>
          <TextInput
            placeholder="Name"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSave(username, email, password)}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 10,
    backgroundColor: '#D73F09',
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
    backgroundColor: 'white',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  additionalEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonSection: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'gray',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Profile;