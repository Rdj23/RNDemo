// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Note: we import CleverTap here
import CleverTap from 'clevertap-react-native';  
import Toast      from 'react-native-simple-toast';
import { useUser } from '../context/UserContext';

export default function WelcomeScreen({ navigation }) {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const { login }             = useUser();

  const handleLogin = () => {
    setError('');

    // Simple validation: must be non‐empty and a valid email
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Create a dummy profile with just email (no password)
    const userProfile = {
      name:  '',        // no name known on login
      email: email.trim(),
      // …you can add more fields as needed
    };

    // 1) Save into our UserContext (will trigger RootNavigator to switch stacks)
    login(userProfile);

    // 2) Send event to CleverTap
    try {
      CleverTap.onUserLogin({
        Name:     userProfile.name || '',  
        Email:    userProfile.email,
        Identity: userProfile.email,
      });
    } catch (e) {
      console.warn('CleverTap.onUserLogin() failed:', e);
    }

    // 3) DON’T do navigation.replace('Main') here—RootNavigator handles it automatically.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    padding:         24,
    justifyContent:  'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize:    32,
    fontWeight:  '700',
    alignSelf:   'center',
    marginBottom:40,
    color:       '#1A1A1A',
  },
  input: {
    borderWidth:   1,
    borderColor:   '#DDD',
    borderRadius:  8,
    padding:       12,
    fontSize:      16,
    marginBottom:  12,
    color:         '#333',
  },
  button: {
    backgroundColor: '#30241F',
    borderRadius:    8,
    padding:         16,
    alignItems:      'center',
  },
  buttonText: {
    color:      '#FFF',
    fontSize:   18,
    fontWeight: '600',
  },
  link: {
    color:            '#30241F',
    fontSize:         14,
    textAlign:        'center',
    textDecorationLine: 'underline',
  },
  error: {
    color:      '#E57373',
    textAlign:  'center',
    marginBottom: 12,
  },
});
