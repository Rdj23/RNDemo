// src/navigation/SearchStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen  from '../screens/SearchScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      {/* turn off the navigator header so you only see the
          in-component back button & search bar */}
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      {/* same for Product (you already have your own back button there) */}
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
