// src/components/Header.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {openAppInbox} from '../utils/CleverTapHelpers';

import CleverTap from 'clevertap-react-native'; // <-- ✅ Add this line
import MenuIcon from '../../resources/icons/Menu.svg';
import NotificationIcon from '../../resources/icons/Notification.svg';
import ArrowLeft from '../../resources/icons/ArrowLeft.svg';

export default function Header({navigation, title = 'GemStore'}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          style={styles.touchArea}
          activeOpacity={0.7}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <ArrowLeft width={24} height={24} fill="#333" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.touchArea}
          activeOpacity={0.7}
          onPress={() => navigation.openDrawer()}>
          <MenuIcon width={24} height={24} fill="#333" />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={openAppInbox} style={styles.touchArea}>
        <NotificationIcon width={24} height={24} fill="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  touchArea: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
