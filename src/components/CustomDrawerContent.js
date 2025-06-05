import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

// SVG imports
import HomeIcon      from '../../resources/icons/Home.svg';
import SearchIcon    from '../../resources/icons/Search.svg';
import CartIcon      from '../../resources/icons/Cart.svg';
import HeartIcon     from '../../resources/icons/Heartfilled.svg';
import ProfileIcon   from '../../resources/icons/User.svg';
import SettingsIcon  from '../../resources/icons/Setting.svg';

// Hooks
import { useUser }       from '../context/UserContext.js';
import { useWishlist }   from '../context/WishlistContext';
import { useCart }       from '../context/CartContext';

export default function CustomDrawerContent({ navigation }) {
  const { user }        = useUser();
  const { wishlist }    = useWishlist();
  const { totalQuantity } = useCart();

  // helper to jump into bottom‐tabs
  function goToTab(tabName, nestedScreen, nestedParams) {
    // 1) close drawer
    navigation.closeDrawer();
    // 2) navigate into your drawer’s single "Main" screen (BottomTabs)
    //    then into the correct tab and optional nested screen
    navigation.navigate('Main', {
      screen: tabName,
      ...(nestedScreen
        ? { params: { screen: nestedScreen, params: nestedParams } }
        : {}
      ),
    });
  }

  return (
    <DrawerContentScrollView contentContainerStyle={s.container}>
      {/* --- User header --- */}
      <View style={s.header}>
        <ProfileIcon width={64} height={64} fill="#30241F" />
        <Text style={s.name}>
          {user.name || 'Your Name'}
        </Text>
        <Text style={s.email}>
          {user.email || 'Tap Settings to update'}
        </Text>
      </View>

      {/* --- Main links --- */}
      <View style={s.section}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <HomeIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Home')}
        />

        <DrawerItem
          label="Search"
          icon={({ color, size }) => (
            <SearchIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Search')}
        />

        <DrawerItem
          label={`Cart${totalQuantity > 0 ? ` (${totalQuantity})` : ''}`}
          icon={({ color, size }) => (
            <CartIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Cart')}
        />

        <DrawerItem
          label={`Wishlist${wishlist.length ? ` (${wishlist.length})` : ''}`}
          icon={({ color, size }) => (
            <HeartIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Profile', 'Wishlist')}
        />

        <DrawerItem
          label="Profile"
          icon={({ color, size }) => (
            <ProfileIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Profile','ProfileMain')}
        />
      </View>

      {/* --- Settings / theme toggle --- */}
      <View style={s.bottomSection}>
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <SettingsIcon width={size} height={size} fill={color} />
          )}
          onPress={() => goToTab('Profile', 'ProfileSettings')}
        />
        {/* Insert your Dark/Light toggle here */}
      </View>
    </DrawerContentScrollView>
  );
}

const s = StyleSheet.create({
  container:     { flex: 1 },
  header:        {
    alignItems:       'center',
    paddingVertical:  32,
    borderBottomWidth:1,
    borderBottomColor:'#EEE',
  },
  name:          {
    marginTop:   12,
    fontSize:    18,
    fontWeight:  '700',
    color:       '#1A1A1A',
  },
  email:         {
    fontSize:   14,
    color:      '#666',
    marginTop:  4,
  },
  section:       { flex: 1, paddingTop: 8 },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
});
