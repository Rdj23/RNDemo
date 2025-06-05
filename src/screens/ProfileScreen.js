import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import UserIcon      from '../../resources/icons/User.svg';
import SettingsIcon  from '../../resources/icons/Setting.svg';
import { useUser }   from '../context/UserContext.js';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <UserIcon width={64} height={64} fill="#30241F" />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name || 'Your Name'}</Text>
          <Text style={styles.email}>{user.email || 'Tap Settings to update email'}</Text>
          <Text style={styles.phone}>{user.phone || '+91XXXXXXXXXX'}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileSettings')}
          style={styles.settingsBtn}
        >
          <SettingsIcon width={24} height={24} fill="#30241F" />
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Text style={styles.menuText}>My Wishlist</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            setUser({ name: '', email: '', phone: '', avatarUrl: '' });
            navigation.replace('Welcome'); // adjust if login route is different
          }}
        >
          <Text style={[styles.menuText, { color: '#E57373' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  avatar: {
    width:        64,
    height:       64,
    borderRadius: 32,
  },
  userInfo: {
    flex:        1,
    marginLeft:  16,
  },
  name:  { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  phone: { fontSize: 14, color: '#666', marginTop: 4 },
  settingsBtn: {
    padding:         8,
    borderRadius:    16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  menu: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 16,
    color:    '#1A1A1A',
  },
  divider: {
    height:          1,
    backgroundColor: '#EEE',
  },
});
