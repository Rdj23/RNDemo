// src/components/FeatureProducts.js
import React, { useContext } from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import { useNavigation }   from '@react-navigation/native';
import Toast               from 'react-native-simple-toast';
import { WishlistContext } from '../context/WishlistContext';
import HeartIcon           from '../../resources/icons/Heart.svg';
import HeartIcon      from '../../resources/icons/Heart.svg';
import HeartFilledIcon from '../../resources/icons/Heartfilled.svg';


const { width }  = Dimensions.get('window');
const CARD_WIDTH = 120;

const products = [ /* … your same demo array … */ ];

export default function FeatureProducts() {
  const navigation                 = useNavigation();
  const { isWishlisted, toggleWishlist } = useContext(WishlistContext);

  const renderItem = ({ item }) => {
    const filled = isWishlisted(item.id);
//
const onHeartPress = () => {
      toggleWishlist(item.id);
      Toast.show(
        filled
          ? 'Removed from wishlist'
          : 'Added to wishlist',
        Toast.SHORT
      );
    };
 return (
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Product', { product: item })}
        >
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>

        {/* heart toggle */}
        <TouchableOpacity style={styles.heartBadge} onPress={onHeartPress}>
          {filled 
            ? <HeartFilledIcon width={16} height={16} /> 
            : <HeartIcon       width={16} height={16} />}
        </TouchableOpacity>

        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    );
  };


  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Feature Products</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection:'row', justifyContent:'space-between', paddingHorizontal:24 },
  title:  { fontSize:18, fontWeight:'700' },
  showAll:{ fontSize:14, color:'#666' },
  list:   { paddingLeft:24, paddingTop:16, paddingBottom:24 },
  card:   { width:CARD_WIDTH, marginRight:16 },
  image:  { width:CARD_WIDTH, height:CARD_WIDTH, borderRadius:8 },
  heartBadge:{
    position:'absolute', top:8, right:8,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:12, padding:4
  },
  name:   { marginTop:8, fontSize:14 },
  price:  { marginTop:4, fontSize:14, fontWeight:'700' },
});
