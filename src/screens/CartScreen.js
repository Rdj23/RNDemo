// src/screens/CartScreen.js
import React from 'react';
import {useCart} from '../context/CartContext';
import Toast from 'react-native-root-toast';
import CleverTap from 'clevertap-react-native';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ArrowLeft from '../../resources/icons/ArrowLeft.svg';

export default function CartScreen({navigation}) {
  const {cartItems, incrementItem, decrementItem, removeItem} = useCart();

  // subtotal = sum(price * quantity)
  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleBuyNow = () => {
  // Example product array
  const items = cartItems.map(item => ({
    id: item.id,
    name: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  // Event details (add any additional properties you wish)
  const chargeDetails = {
    amount: subtotal,      // total amount
    payment_mode: 'COD',   // or other payment method
    purchase_date: new Date(),
  };

  // 1. Fire CleverTap "charged" event
  CleverTap.recordChargedEvent(chargeDetails, items);

  // 2. Show success toast
  Toast.show('Order placed! (Charged event sent)', {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
  });

  // 3. Optionally, clear cart or navigate
};

  // Directly use cartItems, since each IS a cartEntry
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        {/* Optionally, show meta if you have size/color */}
        {(item.size || item.color) && (
          <Text style={styles.meta}>
            {item.size ? `Size: ${item.size}` : ''}
            {item.size && item.color ? ' | ' : ''}
            {item.color ? `Color: ${item.color}` : ''}
          </Text>
        )}
      </View>
      <View style={styles.qtyRow}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => {
            if (item.quantity === 1) {
              removeItem(item);
            } else {
              decrementItem(item);
            }
          }}>
          <Text style={styles.qtySign}>–</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => incrementItem(item)}>
          <Text style={styles.qtySign}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Empty state
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Cart Is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven’t added anything yet.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* top bar */}

      <FlatList
        data={cartItems}
        keyExtractor={item => `${item.id}-${item.size}-${item.color}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* summary + checkout */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text>Product price</Text>
          <Text>${subtotal}</Text>
        </View>
        <View style={styles.row}>
          <Text>Shipping</Text>
          <Text>Freeship</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.sub}>Subtotal</Text>
          <Text style={styles.sub}>${subtotal}</Text>
        </View>
        <TouchableOpacity style={styles.checkout} onPress={handleBuyNow}>
          <Text style={styles.checkoutText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700'},

  list: {paddingHorizontal: 16},

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
  },
  info: {flex: 1},
  name: {fontSize: 16, fontWeight: '600'},
  price: {fontSize: 14, marginVertical: 4},
  meta: {color: '#666'},

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtySign: {fontSize: 20},
  qtyText: {marginHorizontal: 8, fontSize: 16},

  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sub: {fontSize: 16, fontWeight: '700'},

  checkout: {
    marginTop: 16,
    backgroundColor: '#30241F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutText: {color: '#FFF', fontSize: 16, fontWeight: '600'},

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  shopButton: {
    marginTop: 24,
    backgroundColor: '#30241F',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  shopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
