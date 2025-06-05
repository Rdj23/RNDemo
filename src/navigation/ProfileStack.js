import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen         from '../screens/ProfileScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen.js';
import WishlistScreen        from '../screens/WishlistScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"  // CHANGED from "ProfileScreen"
      screenOptions={{
         headerShown: false 
      }}
    >
      <Stack.Screen
        name="ProfileMain" // CHANGED from "Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{ title: 'Profile Settings' }}
      />
    </Stack.Navigator>
  );
}
