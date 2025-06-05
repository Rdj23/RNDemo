import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack           from './HomeStack';
import DiscoverStack      from './DiscoverStack';
import MyOrderScreen      from '../screens/MyOrderScreen';
import ProfileStack       from './ProfileStack';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="home"     component={HomeStack}          />
      <Drawer.Screen name="discover" component={DiscoverStack}      />
      <Drawer.Screen name="cart"     component={MyOrderScreen}      />
      <Drawer.Screen name="profile"  component={ProfileStack}       />
      <Drawer.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    </Drawer.Navigator>
  );
}
