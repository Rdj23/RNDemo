// src/screens/RegisterScreen.js
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
import CleverTap from 'clevertap-react-native';
import Toast      from 'react-native-simple-toast';
import { useUser } from '../context/UserContext';

export default function RegisterScreen({ navigation }) {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [error, setError]   = useState('');
  const { login }           = useUser();

  const handleRegister = () => {
    setError('');

    // Basic validation: name and email both required
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Build a new profile object
    const userProfile = {
      name:  name.trim(),
      email: email.trim(),
    };

    // 1) Save into UserContext (this will cause RootNavigator to re‐render)
    login(userProfile);

    // 2) Fire CleverTap.onUserLogin(...) with name/email
    try {
      CleverTap.onUserLogin({
        Name:     userProfile.name,
        Email:    userProfile.email,
        Identity: userProfile.email,
      });
    } catch (e) {
      console.warn('CleverTap.onUserLogin() failed:', e);
    }

    // 3) NO direct navigation call here. 
    //    RootNavigator sees isLoggedIn=true → switches into MainApp automatically.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.link}>Already have an account? Log In</Text>
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
    fontSize:     32,
    fontWeight:   '700',
    alignSelf:    'center',
    marginBottom: 40,
    color:        '#1A1A1A',
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
    color:       '#E57373',
    textAlign:   'center',
    marginBottom:12,
  },
});
