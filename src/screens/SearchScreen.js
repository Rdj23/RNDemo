import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ArrowLeft     from '../../resources/icons/ArrowLeft.svg';
import FilterIcon    from '../../resources/icons/filter.svg';
import CloseIcon     from '../../resources/icons/close.svg';
import TrashIcon     from '../../resources/icons/Trash.svg';
import SearchIcon    from '../../resources/icons/Search.svg';


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 24 * 2 - 16) / 2; // 2 cards per row

export default function SearchScreen() {
  const navigation = useNavigation();

  const [recent, setRecent] = useState([
    'Sunglasses', 'Sweater', 'Hoodie'
  ]);
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);   // Fetched from API
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        if (mounted) setAllProducts(data.products || []);
      })
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Run search whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = allProducts.filter(prod =>
      prod.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, [query, allProducts]);

  const onSearch = (text) => {
    setQuery(text);
    if (text && !recent.includes(text)) {
      setRecent([text, ...recent.slice(0, 5)]);
    }
  };

  const onChipPress = (chip) => setQuery(chip);

  const removeRecent = (item) => setRecent(r => r.filter(x => x !== item));
  const clearAll = () => setRecent([]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  // Everything above the product list (search bar, chips, etc)
  const renderHeader = () => (
    <>
      <View style={styles.header}>
             <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <ArrowLeft width={20} height={20} fill="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <SearchIcon width={20} height={20} fill="#AAA" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#AAA"
            value={query}
            onChangeText={onSearch}
            autoFocus
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <FilterIcon width={24} height={24} fill="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent Searches</Text>
        <TouchableOpacity onPress={clearAll}>
          <TrashIcon width={20} height={20} fill="#AAA" />
        </TouchableOpacity>
      </View>
      <View style={styles.chipsContainer}>
        {recent.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, query === item && { backgroundColor: '#dedede' }]}
            onPress={() => onChipPress(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
            <TouchableOpacity onPress={() => removeRecent(item)}>
              <CloseIcon width={12} height={12} fill="#666" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {query ? `Results for "${query}"` : "Popular this week"}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ActivityIndicator size="large" color="#30241F" style={{ marginVertical: 40 }} />
      ) : (
        <FlatList
          data={query ? searchResults : allProducts.slice(0, 8)} // Show top 8 products if not searching
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.gridList}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <Text style={styles.noResults}>
              {query ? "No products found." : "Start typing to search for products."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center',
  },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 16 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F2F2F2', borderRadius: 12, height: 44, paddingHorizontal: 12,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#333' },
  filterButton: {
    marginLeft: 16, width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center',
  },
  recentHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    paddingHorizontal: 24,
  },
  recentTitle: { fontSize: 14, color: '#666', fontWeight: '600' },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, paddingHorizontal: 24 },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F2F2F2', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 8,
  },
  chipText: { marginRight: 6, fontSize: 12, color: '#333' },
  resultsHeader: { marginBottom: 12, paddingHorizontal: 24 },
  resultsTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  noResults: { textAlign: 'center', marginTop: 24, color: '#AAA' },
  gridList: { paddingBottom: 24, paddingHorizontal: 24 },
  productCard: {
    width: CARD_WIDTH, backgroundColor: '#FFF', borderRadius: 8,
    marginBottom: 16, padding: 10, alignItems: 'center', elevation: 1
  },
  productImage: { width: CARD_WIDTH - 16, height: CARD_WIDTH - 16, borderRadius: 8 },
  productName: { marginTop: 8, fontSize: 14, color: '#1A1A1A', fontWeight: '600' },
  productPrice: { marginTop: 4, fontSize: 14, fontWeight: '700', color: '#30241F' },
});
