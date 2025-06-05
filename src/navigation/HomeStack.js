import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import MenuIcon from '../../resources/icons/Menu.svg';
import NotificationIcon from '../../resources/icons/Notification.svg';
import {openAppInbox} from '../utils/CleverTapHelpers';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {elevation: 0, shadowOpacity: 0},
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'GemStore',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{marginLeft: 16}}>
              <MenuIcon width={24} height={24} fill="#333" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={openAppInbox} style={{marginRight: 16}}>
              <NotificationIcon width={24} height={24} fill="#333" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          title: 'Product',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
