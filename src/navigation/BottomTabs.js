import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack    from './HomeStack';
import SearchStack  from './SearchStack';
import CartStack    from './CartStack';       // ← now a stack
import InboxScreen from '../screens/InboxScreen';

import ProfileStack from './ProfileStack';

import { useCart }  from '../context/CartContext';  // ← for badge

// your SVGs
import HomeIcon   from '../../resources/icons/Home.svg';
import SearchIcon from '../../resources/icons/Search.svg';
import BagIcon    from '../../resources/icons/Cart.svg';
import UserIcon   from '../../resources/icons/User.svg';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { totalQuantity } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor:   '#30241F',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused, color, size }) => {
          let Icon;
          if (route.name === 'Home')    Icon = HomeIcon;
          if (route.name === 'Search')  Icon = SearchIcon;
          if (route.name === 'Cart')    Icon = BagIcon;
          if (route.name === 'Profile') Icon = UserIcon;
          return Icon ? <Icon width={size} height={size} fill={color} /> : null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Home' }}
      />

      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ title: 'Search' }}
      />

      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          title: 'Cart',
          // 5) only show badge if count > 0
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Profile' }}
      />
      


    </Tab.Navigator>
  );
}
