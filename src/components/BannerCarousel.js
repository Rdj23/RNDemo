import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
// match Figma: container padding is 24 each side
const ITEM_WIDTH = width - 48;
const ITEM_HEIGHT = 180;

// 1) Hard-coded banners array; swap in your own titles/images as desired
const banners = [
  {
    id: '1',
    image: require('../../resources/images/Banner1.jpg'),
    title: 'Autumn Collection 2022',
  },
  {
    id: '2',
    image: require('../../resources/images/Model1.png'),
    title: 'New Summer Sale',
  },
  {
    id: '3',
    image: require('../../resources/images/Model2.png'),
    title: 'Trending Now',
  },
];

export default function BannerCarousel() {
  const renderItem = ({ item }) => (
    <View style={{ marginRight: 16 /* space between items */ }}>
      <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={banners}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH + 16}   // page width + spacing
      decelerationRate="fast"
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 24, // match container padding
  },
  imageBackground: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    borderRadius: 12,      // rounded corners
  },
  imageRadius: {
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,           // inner padding for text
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
});
