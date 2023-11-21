import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // TODO: Add your authentication logic here
      // If login is successful, navigate to the home screen
      // navigation.navigate('HomeScreen'); // Make sure to replace with your correct screen name
    } catch (err) {
      // If an error occurs, set the error message in the state
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with logo and title */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/osu_logo.png')} // Adjust the path according to your project structure
          style={styles.logo}
        />
        <Text style={styles.headerText}>Faculty Staff Fitness</Text>
      </View>

      {/* Login form with text inputs and a button */}
      <View style={styles.loginForm}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Log In" onPress={handleLogin} />
      </View>
    </View>
  );
};

// Define the styles used in the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginTop: 10, // Adjust this for your status bar height
  },
  logo: {
    width: 100, // Increase the size of the logo
    height: 100, // Maintain the aspect ratio if it's square
    resizeMode: 'contain',
    marginBottom: 8, // Add some space below the logo
  },
  headerText: {
    fontSize: 14, // Increase font size for better visibility
    fontWeight: 'bold',
    marginBottom: 32, // Increase spacing to separate from the inputs
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    width: '80%', // Set width relative to the screen size
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '80%', // Match the width of the input fields
    padding: 15,
    backgroundColor: '#007aff', // Example button color, adjust as needed
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increase font size for the button text
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
