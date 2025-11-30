import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
// import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
import Card from '../../assets/svg/Cart.svg';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useRecommendedStore from '../../zustland/recommendedStore';

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  originalPrice?: string;
  image_url?: string;
  country?: string;
  abv?: string;
  sale_price?: string;
  regular_price?: string;
  is_favorite?: boolean;
}

interface VerticalScrollProps {
  item: ProductItem[];
  onSubmitProduct?: (item: ProductItem) => void;
}

// Individual Product Card Component
const ProductCard: React.FC<{item: ProductItem; onSubmitProduct?: (item: ProductItem) => void}> = ({item, onSubmitProduct}) => {
  const {Styles} = StyleComponent();
  const {token, refreshToken} = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const {recommended, setRecommended} = useRecommendedStore();

useEffect(() => {
  setIsFavorite(item?.is_favorite);
}, [item?.is_favorite]);

  const toggleFavorite = (id:any) => {
;
    if (isFavorite) {
      setIsFavorite(false);
      const fineProduct = recommended.map((item:any) =>
        item.id === id
          ? { ...item, is_favorite: false }
          : item
      );
      setRecommended(fineProduct)
      DeleteFavoriteProductModel(
        token,
        id,
        () => {
        },
        error => {
          console.log('error', error);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              DeleteFavoriteProductModel(
                data.access,
                item.id,
                data => {
                  console.log('data', data);
                },
                error => {
                  console.log('error', error);
                },
              );
            },
            () => {},
          );
        },
      );
    } else {
      setIsFavorite(true);
      const fineProduct = recommended.map((item:any) =>
        item.id === id
          ? { ...item, is_favorite: true }
          : item
      );
      setRecommended(fineProduct)
      AddFavoriteProductModel(
        token,
        id,
         () => {
          setIsFavorite(true);
        },
        error => {
          console.log('error', error);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            data => {
              AddFavoriteProductModel(
                data.access,
                item.id,
                () => {},
                () => {},
                () => {},
              );
            },
            () => {},
          );
        },
      );
    }
  };

  return (
    <TouchableOpacity style={styles.productCardContainer} activeOpacity={0.6} onPress={() => onSubmitProduct?.(item)}>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
        {isFavorite ? (
          <Heart_primary width={24} height={24} />
        ) : (
          <Heart width={24} height={24}  />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {item?.image_url ? (
          <Image source={{uri: item.image_url}} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <Text style={[Styles.subtitle_Regular, styles.productTitle]} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
        {item.country ? `${item.country} ABV ${item.abv ?? '-'}` : ''}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={[Styles.body_SemiBold, styles.productPrice]}>
          {item.sale_price ?? item.price} zł
        </Text>
        {item.regular_price && (
          <Text style={[Styles.subtitle_Regular, styles.originalPriceText]}>
            {item.regular_price} zł
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
    </TouchableOpacity>
  );
};

// Main VerticalScroll Component
const VerticalScroll: React.FC<VerticalScrollProps> = ({item, onSubmitProduct}) => {
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
          <ProductCard key={product.id} item={product} onSubmitProduct={onSubmitProduct} />
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
  productTitle: {
    color: Color.black,
    marginTop: 8,
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
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
});
