import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
          <Heart width={24} height={24} fill={Color.gray} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        <Viski />
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
const VerticalScroll: React.FC<VerticalScrollProps> = ({item}) => {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
          Maybe looking for something else?
        </Text>
      </View>
      <View style={styles.gridContainer}>
        {item.map(product => (
          <ProductCard key={product.id} item={product} />
        ))}
      </View>
    </View>
  );
};

export default VerticalScroll;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  categoryTitle: {
    color: Color.primary,
  },
  productFlatListContainer: {
    marginTop: '5%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  productCardContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.white,
    borderRadius: 10,
    width: '48%',
    marginBottom: 15,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
    height:50
  },
});
