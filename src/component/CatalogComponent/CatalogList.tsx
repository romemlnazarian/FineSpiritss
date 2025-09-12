import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, {useState} from 'react';
  import {StyleComponent} from '../../utiles/styles';
  import {Color} from '../../utiles/color';
  import Viski from '../../assets/svg/viski.svg'; // Assuming Viski is the SVG for product image
  import Heart from '../../assets/svg/Heart.svg';
  import Heart_primary from '../../assets/svg/Heart_Primary.svg';
  import BottomCardComponent from '../BottomCard';
  // import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
  import Card from '../../assets/svg/Cart.svg';
  import Swiper from 'react-native-swiper';
  
  interface ProductItem {
    id: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
  }
  interface VerticalScrollProps {
    item: ProductItem[];
  }
  // Individual Product Card Component
  const ProductCard: React.FC<{item: ProductItem}> = ({item}) => {
    const {Styles} = StyleComponent();
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
      setIsFavorite(prev => !prev);
    };
    
    return (
      <View style={styles.productCardContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          {isFavorite ? (
            <Heart_primary width={24} height={24} />
          ) : (
            <Heart width={24} height={24} fill={Color.white} />
          )}
        </TouchableOpacity>
        
        <View style={styles.swiperContainer}>
          <Swiper
            style={styles.swiper}
            showsPagination={false}
            loop={false}
            removeClippedSubviews={true}
            autoplay={false}
            scrollEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            loadMinimal={true}
            loadMinimalSize={1}
          >
            <View style={styles.slide}>
              <Viski width={120} height={120}/>
            </View>
            <View style={styles.slide}>
            <Viski width={120} height={120}/>
            </View>
            <View style={styles.slide}>
            <Viski width={120} height={120}/>
            </View>
          </Swiper>
        </View>
        
        <Text style={Styles.subtitle_Regular}>{item.title}</Text>
        <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[Styles.body_SemiBold, styles.productPrice]}>
            {item.price}
          </Text>
          {item.originalPrice && (
            <Text style={[Styles.subtitle_Regular, styles.originalPriceText]}>
              {item.originalPrice}
            </Text>
          )}
        </View>
        <BottomCardComponent
          title={'Add to Card'}
          onHandler={() => console.log()}
          style={styles.bottomCardButton}
          icon={<Card />}
          textStyle={Styles.subtitle_Regular}
        />
      </View>
    );
  };
  
  // Main VerticalScroll Component
  const CatalogList: React.FC<VerticalScrollProps> = ({item}) => {

    const renderProductItem = ({item: product}: {item: ProductItem}) => (
      <ProductCard item={product} />
    );

    const keyExtractor = (product: ProductItem) => product.id;

    return (
      <View style={styles.categoryContainer}>
    
        <FlatList
          data={item}
          renderItem={renderProductItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.rowWrapper}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={5}
          initialNumToRender={4}
          updateCellsBatchingPeriod={100}
          getItemLayout={(data, index) => ({
            length: 300, // Updated height for swiper
            offset: 300 * Math.floor(index / 2),
            index,
          })}
          scrollEventThrottle={16}
          decelerationRate="fast"
        />
      </View>
    );
  };

  export default CatalogList;
  const styles = StyleSheet.create({
    categoryContainer: {
      alignSelf: 'center',
      marginTop:'5%'
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryTitle: {
      color: Color.primary,
    },
    flatListContainer: {
      paddingBottom: 150,
    },
    rowWrapper: {
      justifyContent: 'space-between',
    },
    productCardContainer: {
      padding: 15,
      borderWidth: 1,
      borderColor: Color.cardgray,
      backgroundColor: Color.white,
      width: '50%',
      marginBottom: 0,
    },
    favoriteButton: {
      alignSelf: 'flex-end',
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
    },
    swiperContainer: {
      height: 120,
      marginBottom: 10,
    },
    swiper: {
      height: 120,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productDescription: {
      color: Color.gray,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '2%',
    },
    productPrice: {
      color: Color.black,
    },
    originalPriceText: {
      color: Color.gray,
      textDecorationLine: 'line-through',
      marginLeft: 10,
    },
    bottomCardButton: {
      marginTop: '10%',
      width: '100%',
      height: 50,
    },
  });