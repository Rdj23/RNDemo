// POLYFILL for Array.prototype.findLast (fixes React Navigation drawer “findLast” crash)
if (!Array.prototype.findLast) {
  Object.defineProperty(Array.prototype, 'findLast', {
    value: function (callback, thisArg) {
      if (typeof callback !== 'function') {
        throw new TypeError('"callback" is not a function');
      }
      const arr = this;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (callback.call(thisArg, arr[i], i, arr)) {
          return arr[i];
        }
      }
      return undefined;
    },
    configurable: true,
    writable: true,
  });
}

// App.js
import 'react-native-gesture-handler';
// 
import React, { useEffect } from 'react';

import { Platform, PermissionsAndroid , NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Patch CleverTap's native module so new NativeEventEmitter doesn't warn about
// missing listener methods. This must happen before importing the library.
const ctModule = NativeModules.CleverTapReact;
if (ctModule) {
  ctModule.addListener = ctModule.addListener || (() => {});
  ctModule.removeListeners = ctModule.removeListeners || (() => {});
}


import CleverTap from 'clevertap-react-native';
// import messaging from '@react-native-firebase/messaging';

import { UserProvider, useUser } from './src/context/UserContext';
import { CartProvider }           from './src/context/CartContext';
import { WishlistProvider }       from './src/context/WishlistContext';

import BottomTabs          from './src/navigation/BottomTabs';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import WelcomeScreen       from './src/screens/WelcomeScreen';
import RegisterScreen      from './src/screens/RegisterScreen';

         // Should log "function Header" or similar
// console.log('WelcomeScreen is', WelcomeScreen); 

const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

// Utility to open the App Inbox from anywhere:
export const openAppInbox = () => {
  CleverTap.showInbox({
    tabs: ['Offers', 'Promotions'],         // optional tabs
    navBarTitle: 'My Inbox',
    navBarColor: '#30241F',
    navBarTitleColor: '#ffffff',
    inboxBackgroundColor: '#f5f5f5',
    backButtonColor: '#ffffff',
    selectedTabColor: '#30241F',
    unselectedTabColor: '#888',
    selectedTabIndicatorColor: '#ffffff',
    noMessageText: 'No messages',
    noMessageTextColor: '#888',
  });
};

function MainApp() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Main" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome"  component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useUser();
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainApp /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    // 1) Initialize the App Inbox once on app start
    CleverTap.initializeInbox();

    // 2) Listen for inbox events (optional logging)
    CleverTap.addListener(
      CleverTap.CleverTapInboxDidInitialize,
      () => console.log('📥 Inbox initialized')
    );
    CleverTap.addListener(
      CleverTap.CleverTapInboxMessagesDidUpdate,
      () => console.log('🔄 Inbox messages updated')
    );

    // 3) In-App messaging events (optional)
    CleverTap.addListener(
      CleverTap.CleverTapInAppNotificationShowed,
      () => console.log('🎉 In-App shown')
    );
    CleverTap.addListener(
      CleverTap.CleverTapInAppNotificationDismissed,
      () => console.log('❌ In-App dismissed')
    );
    CleverTap.addListener(
      CleverTap.CleverTapInAppNotificationButtonTapped,
      evt => console.log('👉 In-App button tapped', evt)
    );

    // 4) Push token & channel setup
    (async () => {
      // Android 13+ push permission
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }
      // Notification channel (Android)
      if (Platform.OS === 'android') {
        CleverTap.createNotificationChannel(
          'Rohan25',               // channelId
          'RohanRN',               // name
          'Testing React Native',  // description
          3,                       // importance (1–5)
          true                     // show badge
        );
      }
      // // FCM token
      // const token = await messaging().getToken();
      // CleverTap.setPushToken(token);
      // messaging().onTokenRefresh(newToken => {
      //   CleverTap.setPushToken(newToken);
      // });
      // // Foreground message handler (optional)
      // messaging().onMessage(async remoteMessage => {
      //   // you could show an alert or local notif here
      // });
    })();

    // Cleanup on unmount
    
  }, []);

  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <RootNavigator />
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}