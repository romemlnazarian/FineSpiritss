import {View, Text, StyleSheet, FlatList,TextInput} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Viski from '../../assets/svg/viski.svg';
import Heart from '../../assets/svg/Heart.svg';
import Arrow from '../../assets/svg/Arrows.svg';
interface ProductItem {
  id: string;
  title: string;
  country: string;
  alcoholContent: string;
  price: string;
}

// Memoized Product Card Component
const ProductCard = React.memo(({item}: {item: ProductItem}) => {
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  return (
    <View style={[Styles.justifyBetween, styles.mainContainer]}>
      <View style={[Styles.justifyCenter, styles.leftSection]}>
        <Viski width={50} height={100} />
        <View style={styles.productInfo}>
          <Text style={[Styles.h5_SemiBold]}>{item.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={[Styles.subtitle_Regular]}>{item.country}</Text>
            <View style={styles.separator} />
            <Text style={[Styles.subtitle_Regular]}>{item.alcoholContent}</Text>
          </View>
          <Text style={[Styles.body_SemiBold]}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.heartContainer}>
        <Heart fill={isFavorite ? Color.primary : Color.white} />
      </View>
    </View>
  );
});

export default function CatalogSearch() {
  const {Styles} = StyleComponent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<ProductItem[]>([]);
  // Sample data - replace with your actual data
  const productData = useMemo(
    () => [
      {
        id: '1',
        title: 'Domaines ott etoile',
        country: 'Argentina',
        alcoholContent: '18.5% Alc By Vol',
        price: '$37.70',
      },
      {
        id: '2',
        title: 'Château Margaux',
        country: 'France',
        alcoholContent: '13.5% Alc By Vol',
        price: '$89.99',
      },
      {
        id: '3',
        title: 'Opus One',
        country: 'USA',
        alcoholContent: '14.2% Alc By Vol',
        price: '$125.50',
      },
      {
        id: '4',
        title: 'Penfolds Grange',
        country: 'Australia',
        alcoholContent: '14.8% Alc By Vol',
        price: '$199.99',
      },
    ],
    [],
  );

  const handleSearch = useCallback((text: string) => {
    setSearchTerm(text);
    if (text.length > 0) {
      const filtered = productData.filter(item =>
        item.title.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [productData]);



  const renderProductItem = useCallback(
    ({item}: {item: ProductItem}) => <ProductCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: ProductItem) => item.id, []);

  return (
    <View style={[Styles.container]}>
      <View style={styles.searchContainer}>
        <View style={styles.arrowContainer}>
        <Arrow width={30} height={30}/>
        </View>
      <TextInput
        placeholder={'Search'}
        placeholderTextColor={Color.gray}
        style={[styles.textInputContainer, Styles.body_Regular,
        ]}
        value={searchTerm}
        onChangeText={handleSearch}
      />
      </View>
      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          renderItem={({item}) => (
            <Text style={[styles.suggestionItem, Styles.body_Regular]}>{item.title}</Text>
          )}
          keyExtractor={item => item.id}
          style={styles.suggestionsList}
        />
      )}


      <FlatList
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={4}
        updateCellsBatchingPeriod={100}
        getItemLayout={(data, index) => ({
          length: 120, // Approximate height of each item
          offset: 120 * index,
          index,
        })}
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrowContainer: {
    marginTop: 10,
  },
  searchContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    width:'80%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Color.background,
    height: 50,
    color: Color.black,
    marginLeft:10,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '5%',
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSection: {
    height: 100,
  },
  productInfo: {
    height: 100,
    justifyContent: 'space-around',
    marginLeft: '5%',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Color.black,
  },
  heartContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionsList: {
    backgroundColor: Color.background,
    marginTop: 5,
    marginHorizontal: 10,
    maxHeight: 150,
    shadowColor: Color.black,
  },

});
