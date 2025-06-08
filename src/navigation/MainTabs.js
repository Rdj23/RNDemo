// src/navigation/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack      from './HomeStack';
import DiscoverStack from './DiscoverStack';
import CartScreen     from '../screens/CartScreen';
import ProfileStack   from './ProfileStack';
import BottomNav      from '../components/BottomNav';
import CartStack from './CartStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomNav {...props} />}
    >
      <Tab.Screen name="home"     component={HomeStack}      />
      <Tab.Screen name="discover" component={SearchStack}   />
      <Tab.Screen name="cart"     component={CartStack}      />
      <Tab.Screen name="profile"  component={ProfileStack}    />
    </Tab.Navigator>
  );
}
