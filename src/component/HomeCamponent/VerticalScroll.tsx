import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
// import {Language} from '../../utiles/Language/i18n'; // Removed as no longer used
import Card from '../../assets/svg/Cart.svg';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../../model/Favorite/Favorite';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useRecommendedStore from '../../zustland/recommendedStore';
import {useToast} from '../../utiles/Toast/ToastProvider';
import {
  addCardModel,
  deleteCardModel,
  updateCardModel,
} from '../../model/Card/CardModel';
import AddBottom from '../AddBottom';
import LoadingModal from '../LoadingModal';
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
  cart_quantity?: number;
}

interface VerticalScrollProps {
  item: ProductItem[];
  onSubmitProduct?: (item: ProductItem) => void;
}

// Individual Product Card Component
const ProductCard: React.FC<{
  item: ProductItem;
  onSubmitProduct?: (item: ProductItem) => void;
}> = ({item, onSubmitProduct}) => {
  const {Styles} = StyleComponent();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const {recommended, setRecommended} = useRecommendedStore();
  const [count, setCount] = useState<number>(item?.cart_quantity);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();
  useEffect(() => {
    setIsFavorite(item?.is_favorite);
  }, [item?.is_favorite]);

  const toggleFavorite = (id: any) => {
    if (isFavorite) {
      setIsFavorite(false);
      const fineProduct = recommended.map((item: any) =>
        item.id === id ? {...item, is_favorite: false} : item,
      );
      setRecommended(fineProduct);
      DeleteFavoriteProductModel(
        token,
        id,
        () => {},
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
      const fineProduct = recommended.map((item: any) =>
        item.id === id ? {...item, is_favorite: true} : item,
      );
      setRecommended(fineProduct);
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

  const onClick = (value: number, type: string) => {
    if (type === 'inc') {
      setVisible(true);
      updateCardModel(
        token,
        item.id,
        value,
        () => {
          setCount(value);
          setVisible(false);
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                item.id,
                value,
                () => {
                  setCount(value);
                  setVisible(false);
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    } else {
      setVisible(true);
      if (value < 1) {
        deleteCardModel(
          token,
          item.id,
          () => {
            setCount(value);
            setVisible(false);
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                deleteCardModel(
                  refreshedTokens.access,
                  item.id,
                  () => {
                    setCount(value);
                    setVisible(false);
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      } else {
        updateCardModel(
          token,
          item.id,
          value,
          () => {
            setCount(value);
            setVisible(false);
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                updateCardModel(
                  refreshedTokens.access,
                  item.id,
                  value,
                  () => {
                    setCount(value);
                    setVisible(false);
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      }
    }
  };

  const onSubmit = () => {
    setVisible(true);
    addCardModel(
      token,
      item.id,
      () => {
        setCount(1);
        setVisible(false);
      },
      (error: string) => {
        setVisible(false);
        show(error, {type: 'error'});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            addCardModel(
              refreshedTokens.access,
              item.id,
              () => {
                setCount(1);
                setVisible(false);
              },
              (error: string) => {
                setVisible(false);
                show(error, {type: 'error'});
              },
              () => {
                setVisible(false);
              },
            );
          },
          () => {
            setVisible(false);
          },
        );
      },
    );
  };

  return (
    <TouchableOpacity
      style={styles.productCardContainer}
      activeOpacity={0.6}
      onPress={() => onSubmitProduct?.(item)}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {item?.image_url ? (
          <Image
            source={{uri: item?.image_url}}
            style={styles.productImage}
            resizeMethod="resize"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <Text
        style={[Styles.subtitle_SemiBold, styles.productTitle]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2%',
        }}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.productDescription,
            {width: '50%'},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.country}
        </Text>
        <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
          ABV {item?.abv}
        </Text>
      </View>
      {item.sale_price === null ? (
        <Text
          style={[
            Styles.title_Bold,
            styles.productPrice,
            styles.priceContainer,
            {marginTop: '17%'},
          ]}>
          {item.price} zł
        </Text>
      ) : (
        <>
          {item.regular_price && (
            <Text
              style={[
                Styles.subtitle_Regular,
                styles.originalPriceText,
                styles.priceContainer,
              ]}>
              {item.regular_price} zł
            </Text>
          )}
          <Text
            style={[
              Styles.title_Bold,
              styles.productPrice,
              styles.priceContainer,
            ]}>
            {item.sale_price ?? item.price} zł
          </Text>
        </>
      )}

      {count === 0 ? (
        <BottomCardComponent
          title={'Add to Cart'}
          onHandler={onSubmit}
          style={styles.bottomCardButton}
          icon={<Card />}
          textStyle={[Styles.subtitle_Regular, styles.bottomCardButtonText]}
        />
      ) : (
        <AddBottom
          style={styles.bottomCardButton}
          onQuantityChange={onClick}
          count={count}
        />
      )}
      <LoadingModal isVisible={visible} />
    </TouchableOpacity>
  );
};

// Main VerticalScroll Component
const VerticalScroll: React.FC<VerticalScrollProps> = ({
  item,
  onSubmitProduct,
}) => {
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
          <ProductCard
            key={product.id}
            item={product}
            onSubmitProduct={onSubmitProduct}
          />
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
    color: Color.black,
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
    marginTop: '2%',
  },
  productPrice: {
    color: Color.black,
  },
  originalPriceText: {
    color: Color.gray,
    textDecorationLine: 'line-through',
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
  bottomCardButtonText: {
    color: Color.white,
  },
});
