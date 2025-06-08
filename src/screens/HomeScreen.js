// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import CategoryTabs from '../components/CategoryTabs';

const { width } = Dimensions.get('window');
const CARD_W   = (width - 48) / 3;  // three cards per row spacing

const SECTION_CONFIG = {
  men: [
    { key: 'feature',      label: 'Feature Products', categories: ['mens-shirts','mens-watches','mens-shoes'] },
    { key: 'mens-shirts',  label: 'Shirts',           categories: ['mens-shirts'] },
    { key: 'tops',         label: 'T-Shirts',         categories: ['tops'] },
    { key: 'mens-watches', label: 'Watches',          categories: ['mens-watches'] },
    { key: 'mens-shoes',   label: 'Shoes',            categories: ['mens-shoes'] },
  ],
  women: [
    { key: 'feature',         label: 'Feature Products', categories: ['womens-dresses','womens-watches','womens-shoes','womens-jewellery'] },
    { key: 'womens-dresses',  label: 'Dresses',          categories: ['womens-dresses'] },
    { key: 'tops',            label: 'T-Shirts',         categories: ['tops'] },
    { key: 'womens-shoes',    label: 'Shoes',            categories: ['womens-shoes'] },
    { key: 'womens-jewellery',label: 'Jewellery',        categories: ['womens-jewellery'] },
  ],
  accessories: [
    { key: 'feature',     label: 'Feature Products', categories: ['sunglasses'] },
    { key: 'sunglasses',  label: 'Sunglasses',       categories: ['sunglasses'] },
    { key: 'smartphones', label: 'Phones',           categories: ['smartphones'] },
    { key: 'tops',        label: 'T-Shirts',         categories: ['tops'] },
    { key: 'mens-watches',label: 'Watches',          categories: ['mens-watches'] },
  ],
  beauty: [
    { key: 'feature',          label: 'Feature Products', categories: ['skincare','fragrances'] },
    { key: 'skincare',         label: 'Skincare',         categories: ['skincare'] },
    { key: 'fragrances',       label: 'Fragrances',       categories: ['fragrances'] },
    { key: 'lighting',         label: 'Lighting',         categories: ['lighting'] },
    { key: 'home-decoration',  label: 'Home Decor',       categories: ['home-decoration'] },
  ],
};

export default function HomeScreen({ navigation }) {

  const { user } = useUser();


  const [selectedTab,  setSelectedTab]  = useState('men');
  const [sectionsData, setSectionsData] = useState({});
  const [loading,      setLoading]      = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const cfg = SECTION_CONFIG[selectedTab];
    Promise.all(
      cfg.map(section =>
        Promise.all(
          section.categories.map(cat =>
            fetch(`https://dummyjson.com/products/category/${cat}?limit=50`)
              .then(r => r.json())
              .then(j => j.products)
          )
        ).then(arrays => ({
          key:   section.key,
          label: section.label,
          items: arrays.flat()
        }))
      )
    )
    .then(results => {
      if (!alive) return;
      const map = {};
      results.forEach(sec => (map[sec.key] = sec.items));
      setSectionsData(map);
    })
    .catch(console.error)
    .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [selectedTab]);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={1}>{ item.title }</Text>
      <Text style={styles.price}>${ item.price.toFixed(2) }</Text>
    </TouchableOpacity>
  );

  const sections = SECTION_CONFIG[selectedTab];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {user.name ? `Welcome, ${user.name}` : 'Welcome to CT-ecom'}
      </Text>
      <CategoryTabs
        selectedKey={selectedTab}
        onSelect={setSelectedTab}
      />

      <View style={styles.bannerWrap}>
        <Image
          source={require('../../resources/images/Banner1.jpg')}
          style={styles.banner}
          resizeMode="cover"
        />
        <Text style={styles.bannerText}>Autumn Collection 2022</Text>
      </View>

      <ScrollView>
        {loading && <ActivityIndicator style={{ margin: 24 }} />}

        {!loading && sections.map(sec => (
          <View key={sec.key}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{sec.label}</Text>
              <TouchableOpacity onPress={() => { /* no-op for “See all” */ }}>
                <Text style={styles.showAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={sectionsData[sec.key] || []}
              keyExtractor={i => String(i.id)}
              renderItem={renderCard}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#fff' },
  bannerWrap:    { marginTop: 16, paddingHorizontal: 24 },
  banner:        { width: '100%', height: 160, borderRadius: 16 },
  bannerText:    {
    position:   'absolute',
    bottom:     16,
    left:       32,
    color:      '#FFF',
    fontSize:   18,
    fontWeight: '700',
  },

  sectionHeader:  {
    flexDirection:    'row',
    justifyContent:   'space-between',
    alignItems:       'center',
    paddingHorizontal:24,
    marginTop:        24,
  },
  sectionTitle:  { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  showAll:       { fontSize: 14, color: '#999' },

  list:          { paddingLeft: 24, paddingTop: 16, paddingBottom: 24 },
  card:          { width: CARD_W, marginRight: 16 },
  image:         { width: CARD_W, height: CARD_W, borderRadius: 8 },
  name:          { marginTop: 8, fontSize: 14, color: '#1A1A1A' },
  price:         { marginTop: 4, fontSize: 14, fontWeight: '600', color: '#30241F' },
  // container: { flex: 1, backgroundColor: '#FFF' },
  header:    { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 32 },
});
