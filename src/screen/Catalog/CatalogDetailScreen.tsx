import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import AppLoader from '../../component/AppLoader';
import CatalogDetailLogic from '../../logic/Catalog/CatalogDetailLogic';
import Heart from '../../assets/svg/Heart.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomCardComponent from '../../component/BottomCard';
import AddBottom from '../../component/AddBottom';
import Card from '../../assets/svg/Cart.svg';
import Fish from '../../assets/svg/fish.svg';
import Cheesse from '../../assets/svg/cheese.svg';
import Meat from '../../assets/svg/meat.svg';
import Fruits from '../../assets/svg/fruits_and_berries.svg';
import {Language} from '../../utiles/Language/i18n';
import {resolveMediaUrl, resolveProductImageUrl} from '../../utiles/mediaUrl';

const SUGGESTION_ICON_SIZE = 30;

type AromaEntry = {
  name?: string;
  description: string;
};

function pickNonEmptyText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getAromaEntry(
  aromas: any,
  key: 'primary' | 'secondary' | 'tertiary',
): AromaEntry | null {
  const raw = aromas?.[key];
  if (!raw) {
    return null;
  }

  const item = Array.isArray(raw) ? raw[0] : raw;
  const description = pickNonEmptyText(item?.description);
  if (!description) {
    return null;
  }

  return {
    name: pickNonEmptyText(item?.name),
    description,
  };
}

function formatSuggestionLabel(suggestion: any): string {
  if (typeof suggestion === 'string') {
    const raw =
      suggestion === 'fruits_and_berries'
        ? 'Fruits and Berries'
        : suggestion.replace(/_/g, ' ');
    return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : '';
  }

  return suggestion?.title ?? suggestion?.name ?? suggestion?.label ?? '';
}

function renderSuggestionIcon(suggestion: any) {
  if (typeof suggestion === 'string') {
    switch (suggestion) {
      case 'fish':
        return <Fish width={SUGGESTION_ICON_SIZE} height={SUGGESTION_ICON_SIZE} />;
      case 'cheese':
        return <Cheesse width={SUGGESTION_ICON_SIZE} height={SUGGESTION_ICON_SIZE} />;
      case 'meat':
        return <Meat width={SUGGESTION_ICON_SIZE} height={SUGGESTION_ICON_SIZE} />;
      case 'fruits_and_berries':
        return <Fruits width={SUGGESTION_ICON_SIZE} height={SUGGESTION_ICON_SIZE} />;
      default:
        return null;
    }
  }

  const imageUri =
    resolveProductImageUrl(suggestion) ??
    resolveMediaUrl(suggestion?.icon_url) ??
    resolveMediaUrl(suggestion?.icon);

  if (!imageUri) {
    return null;
  }

  return (
    <Image
      source={{uri: imageUri}}
      style={styles.suggestionImage}
      resizeMode="contain"
    />
  );
}

const BOTTOM_ACTION_BAR_HEIGHT = 60;

export default function CatalogDetailScreen(route: any) {
  const {Styles} = StyleComponent();
  const insets = useSafeAreaInsets();
  const {
    product,
    isLoading,
    isFavorite,
    toggleFavorite,
    recommended,
    refreshAll,
    onQuantityChange,
    onSubmit,
    count,
    onSubmitDetail
  } = CatalogDetailLogic(route);
  const navigation: any = useNavigation();
  const fromFavorite = Boolean(route?.route?.params?.fromFavorite);
  const fromSetting = Boolean(route?.route?.params?.fromSetting);
  const fromCart = Boolean(route?.route?.params?.fromCart);

  const handleBack = useCallback(() => {
    if (fromFavorite) {
      navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
      return;
    }
    if (fromCart) {
      navigation.navigate('CardScreen', {screen: 'Card'});
      return;
    }
    if (fromSetting) {
      // We jumped here across tabs (Setting -> Catalog). Go back to Setting tab.
      navigation.navigate('SettingScreen');
      return;
    } else {
      if (
        typeof navigation?.canGoBack === 'function' &&
        navigation.canGoBack()
      ) {
        navigation.goBack();
      } else {
        navigation.navigate('CatalogScreen', {screen: 'Catalog'});
      }
    }
  }, [fromFavorite, fromCart, fromSetting, navigation]);

  // Android hardware back: return to the tab that opened this detail screen
  useFocusEffect(
    useCallback(() => {
      if (!fromFavorite && !fromSetting && !fromCart) {
        return () => {};
      }
      const onBackPress = () => {
        if (fromFavorite) {
          navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
        } else if (fromCart) {
          navigation.navigate('CardScreen', {screen: 'Card'});
        } else {
          navigation.navigate('SettingScreen');
        }
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => {
        subscription.remove();
      };
    }, [fromFavorite, fromCart, fromSetting, navigation]),
  );

  const productImageUri = useMemo(
    () => resolveProductImageUrl(product),
    [product],
  );

  const scrollBottomPadding = useMemo(
    () => BOTTOM_ACTION_BAR_HEIGHT + insets.bottom,
    [insets.bottom],
  );

  const specificationRows = useMemo(
    () => [
      {
        label: Language.product_detail_brand,
        value: product?.key_details?.brand,
      },
      {
        label: Language.product_detail_country,
        value: product?.key_details?.country,
      },
      {label: Language.product_detail_aged, value: product?.key_details?.aged},
      {
        label: Language.product_detail_finish,
        value: product?.key_details?.finish,
      },
      {
        label: Language.product_detail_peated,
        value: product?.key_details?.peated ? "Yes" : "No",
      },
      {
        label: Language.product_detail_alcohol,
        value: product?.key_details?.alcohol,
      },
    ],
    [product],
  );

  const sensoryRows = useMemo(
    () => [
      {
        label: Language.product_detail_alcohol,
        value: product?.sensory_structure?.alcohol,
      },
      {
        label: Language.product_detail_aroma_intensity,
        value: product?.sensory_structure?.aroma_intensity,
      },
      {
        label: Language.product_detail_flavor_profile,
        value: product?.sensory_structure?.flavor_profile,
      },
      {
        label: Language.product_detail_body,
        value: product?.sensory_structure?.body,
      },
      {
        label: Language.product_detail_finish,
        value: product?.sensory_structure?.finish,
      },
    ],
    [product],
  );

  const tastingCharacteristicsText = useMemo(
    () => pickNonEmptyText(product?.tasting_characteristics?.text),
    [product],
  );

  const primaryAroma = useMemo(
    () =>
      getAromaEntry(
        product?.tasting_characteristics?.aromas_and_flavours,
        'primary',
      ),
    [product],
  );

  const secondaryAroma = useMemo(
    () =>
      getAromaEntry(
        product?.tasting_characteristics?.aromas_and_flavours,
        'secondary',
      ),
    [product],
  );

  const tertiaryAroma = useMemo(
    () =>
      getAromaEntry(
        product?.tasting_characteristics?.aromas_and_flavours,
        'tertiary',
      ),
    [product],
  );

  const hasAromasAndFlavours = Boolean(
    primaryAroma || secondaryAroma || tertiaryAroma,
  );

  const renderDetailRow = (label: string, value?: string | number | null) => (
    <View key={label} style={styles.detailRow}>
      <Text style={[Styles.title_Regular, styles.detailLabel]}>{label}:</Text>
      <Text style={[Styles.title_Regular, styles.detailValue]}>
        {value ?? '-'}
      </Text>
    </View>
  );
  return isLoading ? (
    <AppLoader />
  ) : (
    <View style={[Styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: scrollBottomPadding},
        ]}
        showsVerticalScrollIndicator={false}>
        <CustomHeader
          showBack={true}
          title={product?.title || ''}
          onSubmitBack={handleBack}
        />
        <View style={styles.imageWrapper}>
          {productImageUri ? (
            <Image
              source={{uri: productImageUri}}
              style={styles.productImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>
        {/* <Slider /> */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={[Styles.body_Bold,{width: '90%', fontSize: 30}]}>{product?.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(product?.id)}>
              {isFavorite ? (
                <Heart width={24} height={24} fill={Color.red} />
              ) : (
                <Heart width={24} height={24} fill={Color.white} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.volumeBadge}>
            <Text style={[Styles.title_Regular, styles.volumeText]}>
              {product?.volume}
            </Text>
          </View>
          <View style={styles.priceSection}>
            <Text
              style={[Styles.title_Bold, styles.productPrice, {fontSize: 30}]}
              numberOfLines={1}>
              {product?.sale_price !== null && product?.sale_price !== undefined
                ? `${product?.sale_price} zł`
                : `${product?.price} zł`}
            </Text>
            <Text
              style={[
                Styles.subtitle_Regular,
                styles.originalPriceText,
                (product?.sale_price === null ||
                  product?.sale_price === undefined) &&
                  styles.hiddenPriceLine,
                {fontSize: 18},
              ]}
              numberOfLines={1}>
              {product?.sale_price !== null && product?.sale_price !== undefined
                ? `${product?.price} zł`
                : ' '}
            </Text>
          </View>
          {/* <View
            style={{
              width: '93%',
              height: 50,
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: Color.background,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5%',
              }}>
              <Delivery />
              <Text style={[Styles.body_Regular, {marginLeft: '5%'}]}>
                {Language.cart_delivery}
              </Text>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[Styles.title_Regular, {marginLeft: '5%'}]}>
                Warsaw
              </Text>
              <ArrwoDown />
            </TouchableOpacity>
          </View> */}
          <View style={styles.sectionDivider} />
          <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
            {Language.product_detail_specifications}
          </Text>
          {specificationRows.map(row => renderDetailRow(row.label, row.value))}
          <View style={styles.sectionDivider} />

          <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
            {Language.product_detail_sensory_structure}
          </Text>
          
          {sensoryRows.map(row => renderDetailRow(row.label, row.value))}
          <View style={styles.sectionDivider} />

          {tastingCharacteristicsText ? (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                {Language.product_detail_tasting_characteristics}
              </Text>
              <Text
                style={[
                  Styles.title_Regular,
                  styles.paragraphMuted,
                  styles.tastingCharacteristicsText,
                ]}>
                {tastingCharacteristicsText}
              </Text>
            </>
          ) : null}

          {hasAromasAndFlavours ? (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                {Language.product_detail_aromas_and_flavours}:
              </Text>
              {primaryAroma ? (
                <View style={styles.contentBlock}>
                  <Text style={[Styles.h6_Medium, styles.blockTitle]}>
                    {Language.product_detail_primary}
                  </Text>
                  <View style={styles.blockBody}>
                    <Text style={[Styles.title_Regular, styles.blockText, {width: '100%'}]}>
                      {primaryAroma.name ? (
                        <Text style={styles.blockMetaLabel}>{primaryAroma.name}: </Text>
                      ) : null}
                      {primaryAroma.description}
                    </Text>
                  </View>
                </View>
              ) : null}
              {secondaryAroma ? (
                <View style={styles.contentBlock}>
                  <Text style={[Styles.h6_Medium, styles.blockTitle]}>
                    {Language.product_detail_secondary}
                  </Text>
                  <View style={styles.blockBody}>
                    <Text style={[Styles.title_Regular, styles.blockText]}>
                      {secondaryAroma.name ? (
                        <Text style={styles.blockMetaLabel}>{secondaryAroma.name}: </Text>
                      ) : null}
                      {secondaryAroma.description}
                    </Text>
                  </View>
                </View>
              ) : null}
              {tertiaryAroma ? (
                <View style={styles.contentBlock}>
                  <Text style={[Styles.h6_Medium, styles.blockTitle]}>
                    {Language.product_detail_tertiary}
                  </Text>
                  <View style={styles.blockBody}>
                    <Text style={[Styles.title_Regular, styles.blockText]}>
                      {tertiaryAroma.name ? (
                        <Text style={styles.blockMetaLabel}>{tertiaryAroma.name}: </Text>
                      ) : null}
                      {tertiaryAroma.description}
                    </Text>
                  </View>
                </View>
              ) : null}
            </>
          ) : null}

          {product?.gastronomy?.text ? (
            <View style={styles.contentBlock}>
              <Text style={[Styles.h6_Medium, styles.blockTitle]}>
                {Language.product_detail_gastronomy}
              </Text>
              <View style={styles.blockBody}>
                <Text style={[Styles.title_Regular, styles.blockText]}>
                  {product?.gastronomy?.text}
                </Text>
              </View>
            </View>
          ) : null}

          {Array.isArray(product?.gastronomy?.suggestions) &&
            product.gastronomy.suggestions.length > 0 && (
            <View style={styles.suggestionsSection}>
              <Text
                style={[
                  Styles.h6_Medium,
                  styles.sectionTitle,
                  styles.suggestionsSectionTitle,
                ]}>
                {Language.product_detail_suggestions}
              </Text>
              {product.gastronomy.suggestions.map(
                (suggestion: any, index: number) => (
                  <View
                    key={
                      typeof suggestion === 'string'
                        ? suggestion
                        : suggestion?.id ?? suggestion?.slug ?? index
                    }
                    style={styles.suggestionText}>
                    {renderSuggestionIcon(suggestion)}
                    <Text style={[Styles.title_Regular]}>
                      {formatSuggestionLabel(suggestion)}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}
        </View>
         {recommended.length > 0 && (
          <>
        <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
          {Language.product_detail_with_this_also_watching}
        </Text>
        <View style={styles.recommendedSection}>
          <HorizontalFlatList
            callback={e => onSubmitDetail(e)}
            products={recommended}
            onFavoriteToggled={(_id: string, _isFavorite: boolean) =>
              refreshAll()
            }
          />
        </View>
        </>
        )}

      </ScrollView>
      <View
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        {count === 0 ? (
          <BottomCardComponent
            title={Language.product_detail_add_to_cart}
            onHandler={onSubmit}
            style={styles.bottomCardButton}
            textStyle={[Styles.subtitle_Regular, {color: Color.white}]}
            icon={<Card fill={Color.white} />}
          />
        ) : (
          <AddBottom
            dark
            label={Language.product_detail_in_cart}
            style={styles.bottomCardButton}
            onQuantityChange={onQuantityChange}
            count={count}
            stylesContainer={styles.addBottomStylesContainer}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
  recommendedSection: {
    width: '100%',
    alignSelf: 'center',
  },
  sortItemContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.primary,
  },
  imageWrapper: {
    width: 300,
    height: 370,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
  detailsContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: '5%',
    paddingBottom: '5%',
  },
  detailsHeader: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  volumeBadge: {
    width: 76,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: 10,
  },
  volumeText: {
    color: Color.black,
  },
  subInfoText: {
    marginLeft: '6%',
    marginTop: 10,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    gap: 10,
    marginTop: 10,
    minHeight: 44,
  },
  productPrice: {
    color: Color.black,
    lineHeight: 36,
  },
  originalPriceText: {
    color: Color.gray,
    textDecorationLine: 'line-through',
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  hiddenPriceLine: {
    opacity: 0,
  },
  sectionDivider: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 10,
    height: 1,
    backgroundColor: Color.lineGray,
  },
  sectionTitle: {
    marginLeft: '5%',
    marginTop: 16,
  },
  contentBlock: {
    marginTop: 8,
  },
  blockTitle: {
    marginLeft: '5%',
    includeFontPadding: false,
    lineHeight: 24,
  },
  blockBody: {
    marginTop: 8,
    marginLeft: '5%',
    width: '85%',
    gap: 2,
    paddingBottom: 16,
  },
  blockMetaLabel: {
    fontSize: 17,
    fontFamily: 'Satoshi-Bold',
    color: Color.black,
  },
  blockText: {
    color: Color.black,
  },
  paragraphMuted: {
    marginLeft: '5%',
    marginTop: 10,
    color: Color.gray,
  },
  tastingCharacteristicsText: {
    width: '85%',
    color: Color.black,
  },
  suggestionText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: '5%',
    marginTop: 10,
  },
  suggestionsSection: {
    marginBottom: 15,
  },
  suggestionsSectionTitle: {
    marginTop: 16,
  },
  productCardContainer: {
    marginRight: 8,
    width: 240,
  },
  productFlatListContainer: {
    marginTop: '5%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: '5%',
  },
  detailLabel: {
    color: Color.gray,
  },
  detailValue: {
    marginLeft: 5,
    flexShrink: 1,
    textAlign: 'right',
  },
  bottomCardButton: {
    marginTop: '2%',
    width: '95%',
    marginBottom: 5,
  },
  addBottomStylesContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  suggestionImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});
