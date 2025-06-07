// src/navigation/CartStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity }     from 'react-native';

import CartScreen  from '../screens/CartScreen';
import ArrowLeft   from '../../resources/icons/ArrowLeft.svg';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle:      { elevation: 0, shadowOpacity: 0 },
      }}
    >
      <Stack.Screen
        name="CartMain"
        component={CartScreen}
        options={({ navigation }) => ({
          title: 'Your Cart',
          headerLeft: () => (
            <TouchableOpacity
              
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}

              style={{ marginLeft: 16 }}
            >
              <ArrowLeft width={24} height={24} fill="#333" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
