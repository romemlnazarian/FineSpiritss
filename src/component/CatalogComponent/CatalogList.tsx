import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import BottomCardComponent from '../BottomCard';
import Card from '../../assets/svg/Cart.svg';
import AddBottom from '../AddBottom';
import {
  AddFavoriteProductModel,
  DeleteFavoriteProductModel,
} from '../../model/Favorite/Favorite';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import {Language} from '../../utiles/Language/i18n';
import {resolveProductImageUrl} from '../../utiles/mediaUrl';
import {useDebouncedCartActions} from '../../hooks/useDebouncedCartActions';
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
  image?: string;
  is_favorite?: boolean;
  cart_quantity?: number;
}
interface VerticalScrollProps {
  item: ProductItem[];
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
  orderBottom?: boolean; // show 'View product' CTA instead of Add/Counter
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isInitialLoading?: boolean;
}
// Individual Product Card Component
const ProductCard: React.FC<{
  item: ProductItem;
  onAddSelected?: (product: ProductItem, quantity: number) => void;
  onHandlerItem?: (product: ProductItem) => void;
  orderBottom?: boolean;
}> = ({item, onAddSelected, onHandlerItem, orderBottom}) => {
  const {Styles} = StyleComponent();
  const [isFavorite, setIsFavorite] = useState(item?.is_favorite);
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {count, syncedCount, onSubmit, onQuantityChange} =
    useDebouncedCartActions({
      productId: item.id,
      initialCount: item?.cart_quantity ?? 0,
    });

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      setIsFavorite(false);
      DeleteFavoriteProductModel(
        token,
        item.id,
        () => {},
        () => {},
        () => {
          refreshTokenModel(refreshToken, data => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            DeleteFavoriteProductModel(
              token,
              item.id,
              () => {},
              () => {},
            );
          });
        },
      );
    } else {
      setIsFavorite(true);
      AddFavoriteProductModel(
        token,
        item.id,
        () => {},
        () => {},
        () => {
          refreshTokenModel(refreshToken, () => {});
        },
      );
    }
  }, []);

  const hasSalePrice =
    item?.sale_price !== null && item?.sale_price !== undefined;
  const productImageUri = resolveProductImageUrl(item);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onHandlerItem?.(item)}
      style={styles.productCardContainer}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        {isFavorite ? (
          <Heart width={24} height={24} fill={Color.red} />
        ) : (
          <Heart width={24} height={24} fill={Color.white} />
        )}
      </TouchableOpacity>
      <View style={Styles.justifyCenter}>
        {productImageUri ? (
          <Image
            source={{uri: productImageUri}}
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
      <View style={styles.productInfoRow}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.productDescription,
            styles.productCountryWidth,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.country}
        </Text>
        <Text style={[Styles.subtitle_Regular, styles.productDescription]}>
          {Language.abv} {item?.abv}
        </Text>
      </View>
      <View style={styles.priceSection}>
        <Text
          style={[
            Styles.subtitle_Regular,
            styles.originalPriceText,
            !hasSalePrice && styles.hiddenPriceLine,
          ]}
          numberOfLines={1}>
          {hasSalePrice ? `${item.price} zł` : ' '}
        </Text>
        <Text
          style={[Styles.title_Bold, styles.productPrice]}
          numberOfLines={1}>
          {hasSalePrice ? `${item.sale_price} zł` : `${item.price} zł`}
        </Text>
      </View>
      <View style={styles.footerSection}>
        {syncedCount === 0 ? (
          <BottomCardComponent
            title={
              count > 0
                ? `${Language.product_detail_add_to_cart} (${count})`
                : Language.product_detail_add_to_cart
            }
            onHandler={onSubmit}
            style={styles.bottomCardButton}
            textStyle={[Styles.subtitle_Regular, styles.bottomCardButtonText]}
            icon={<Card />}
          />
        ) : (
          <AddBottom
            style={styles.bottomCardButton}
            onQuantityChange={onQuantityChange}
            count={count}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Main VerticalScroll Component
const CatalogList: React.FC<VerticalScrollProps> = ({
  item,
  onAddSelected,
  onHandlerItem,
  orderBottom,
  onLoadMore,
  isLoadingMore,
  isInitialLoading,
}) => {
  const showInitialLoader = isInitialLoading && (!item || item.length === 0);

  if (showInitialLoader) {
    return (
      <View style={[styles.categoryContainer, styles.initialLoader]}>
        <ActivityIndicator size="large" color={Color.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  const renderProductItem = ({item: product}: {item: ProductItem}) => (
    <ProductCard
      item={product}
      onAddSelected={onAddSelected}
      onHandlerItem={onHandlerItem}
      orderBottom={orderBottom}
    />
  );

  const keyExtractor = (product: ProductItem) => product.id;

  const listFooter = useMemo(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator
          size="large"
          color={Color.primary}
          style={{marginTop: '50%'}}
        />
      </View>
    );
  }, [isLoadingMore]);

  const emptyComponent = useMemo(() => {
    if (isInitialLoading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.loadingText}>No products found.</Text>
      </View>
    );
  }, [isInitialLoading]);

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
        windowSize={10}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={listFooter}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

export default CatalogList;
const styles = StyleSheet.create({
  categoryContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '2%',
    paddingBottom: '15%',
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
  footerContainer: {
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrapper: {
    justifyContent: 'flex-start',
    gap: '4%',
  },
  productCardContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Color.cardgray,
    backgroundColor: Color.background,
    width: '48%',
    height: 340,
    marginBottom: 0,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
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
  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    width: '100%',
  },
  productCountryWidth: {
    width: '50%',
  },
  priceSection: {
    minHeight: 44,
    marginTop: '2%',
    justifyContent: 'flex-end',
    width: '100%',
  },
  hiddenPriceLine: {
    opacity: 0,
  },
  footerSection: {
    marginTop: 'auto',
    width: '100%',
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
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialLoader: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
  loadingText: {
    marginTop: 10,
    color: Color.gray,
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
  productTitle: {marginTop: '2%'},
  bottomCardButtonText: {
    color: Color.white,
  },
});
