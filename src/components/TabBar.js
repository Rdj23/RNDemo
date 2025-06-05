// src/components/TabBar.js
import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// SVG icons
import HomeIcon    from '../../resources/icons/Home.svg'
import SearchIcon  from '../../resources/icons/Search.svg'
import CartIcon    from '../../resources/icons/Cart.svg'
import UserIcon    from '../../resources/icons/User.svg'

const ACTIVE = '#30241F'
const INACTIVE = '#999'
const SIZE = 24

export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom || 8 }]}>
      {state.routes.map((route, idx) => {
        const isActive = idx === state.index
        const color = isActive ? ACTIVE : INACTIVE

        let Icon
        switch (route.name) {
          case 'Home':   Icon = HomeIcon; break
          case 'Search': Icon = SearchIcon; break
          case 'Cart':   Icon = CartIcon; break
          case 'Profile':Icon = UserIcon; break
          default:       Icon = HomeIcon
        }

        const label = {
          Home: 'Home',
          Search: 'Search',
          Cart: 'Cart',
          Profile: 'Profile',
        }[route.name]

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => {
              if (!isActive) navigation.navigate(route.name)
            }}
          >
            <Icon width={SIZE} height={SIZE} fill={color} stroke={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
})
