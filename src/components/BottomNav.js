import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import HomeIcon    from '../../resources/icons/Home.svg';
import SearchIcon  from '../../resources/icons/Search.svg';
import CartIcon    from '../../resources/icons/Cart.svg';
import ProfileIcon from '../../resources/icons/Profile.svg';
import { CartContext } from '../context/CartContext';

const ICON_MAP = {
  home:     HomeIcon,
  discover: SearchIcon,
  cart:     CartIcon,
  profile:  ProfileIcon,
};

export default function BottomNav({ state, navigation }) {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, x) => sum + x.quantity, 0);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, idx) => {
          const isFocused = state.index === idx;
          const Icon      = ICON_MAP[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type:   'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View>
                <Icon
                  width={24}
                  height={24}
                  fill={isFocused ? '#30241F' : '#AAA'}
                />
                {route.name === 'cart' && totalCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#fff' },
  container: {
    flexDirection:   'row',
    justifyContent:  'space-around',
    alignItems:      'center',
    height:          56,
    borderTopWidth:  1,
    borderTopColor:  '#EEE',
  },
  tab: { flex: 1, alignItems: 'center' },
  badge: {
    position:     'absolute',
    top:          -4,
    right:        -10,
    backgroundColor: '#E57373',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth:     16,
    height:       16,
    justifyContent: 'center',
    alignItems:   'center',
  },
  badgeText: {
    color:     '#fff',
    fontSize:  10,
    fontWeight:'700',
  },
});
