import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ArrowLeft   from '../../resources/icons/ArrowLeft.svg';
import CameraIcon  from '../../resources/icons/User.svg';
import { useUser }   from '../context/UserContext.js';

export default function ProfileSettingsScreen({ navigation }) {
  const { user, setUser } = useUser();
  const [name, setName]   = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone ? user.phone.replace(/^\+91/, '') : '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    // Validate
    if (!name.trim()) return setError('Name required');
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Enter a valid 10-digit phone');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email');
    setError('');

    // Save in context
    setUser({
      ...user,
      name,
      email,
      phone: `+91${phone}`,
      avatarUrl
    });

    // CleverTap profilePush (make sure CleverTap is initialized in your app)
    if (global.CleverTap) {
      global.CleverTap.profilePush({
        Name: name,
        Email: email,
        Phone: `+91${phone}`,
        // You can add other profile properties here
      });
    }

      if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          style={styles.backBtn}
        >
          <ArrowLeft width={24} height={24} fill="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {/* Avatar picker */}
        <TouchableOpacity style={styles.avatarWrap} onPress={() => {/* image picker */}}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <CameraIcon width={32} height={32} fill="#FFF" />
            </View>
          )}
          <Text style={styles.changeText}>Change Photo</Text>
        </TouchableOpacity>

        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="words"
          />
        </View>
        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {/* Phone */}
        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone"
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
        </View>
        {/* Error */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {/* Save button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save change</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  topBar: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backBtn:   { padding: 8, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.05)' },
  title:     { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  form:      { padding: 24 },
  avatarWrap:{ alignItems: 'center', marginBottom: 24 },
  avatar:    { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width:        100,
    height:       100,
    borderRadius: 50,
    backgroundColor: '#30241F',
    alignItems:   'center',
    justifyContent: 'center',
  },
  changeText: { marginTop: 8, color: '#666', fontSize: 14 },
  field:     { marginBottom: 16 },
  label:     { fontSize: 14, color: '#666', marginBottom: 4 },
  prefix:    { fontSize: 16, marginRight: 8, color: '#333', fontWeight: '600' },
  input:     {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical:   4,
    fontSize:          16,
  },
  saveBtn:   {
    marginTop:      24,
    backgroundColor:'#30241F',
    paddingVertical:16,
    borderRadius:   30,
    alignItems:     'center',
  },
  saveText:  { color: '#FFF', fontSize: 16, fontWeight: '600' },
  error:     { color: '#E57373', marginBottom: 10, alignSelf: 'center', fontWeight: 'bold' },
});
