// src/navigation/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack      from './HomeStack';
import DiscoverStack from './DiscoverStack';
import CartScreen     from '../screens/CartScreen';
import ProfileStack   from './ProfileStack';
import BottomNav      from '../components/BottomNav';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomNav {...props} />}
    >
      <Tab.Screen name="home"     component={HomeStack}      />
      <Tab.Screen name="discover" component={DiscoverStack}   />
      <Tab.Screen name="cart"     component={CartScreen}      />
      <Tab.Screen name="profile"  component={ProfileStack}    />
    </Tab.Navigator>
  );
}
