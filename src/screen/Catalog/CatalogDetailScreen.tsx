import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogDetailLogic from '../../logic/Catalog/CatalogDetailLogic';
import Heart from '../../assets/svg/Heart.svg';
import Heart_primary from '../../assets/svg/Heart_Primary.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BottomCardComponent from '../../component/BottomCard';
import AddBottom from '../../component/AddBottom';
import LoadingModal from '../../component/LoadingModal';
import Card from '../../assets/svg/Cart.svg';

export default function CatalogDetailScreen(route: any) {
  const {Styles, Height} = StyleComponent();
  const {
    product,
    isLoading,
    isFavorite,
    toggleFavorite,
    recommended,
    refreshAll,
    onClick,
    onSubmit,
    count,
    visible,
    onSubmitDetail
  } = CatalogDetailLogic(route);
  const navigation: any = useNavigation();
  const fromFavorite = Boolean(route?.route?.params?.fromFavorite);


  const handleBack = useCallback(() => {
    if (fromFavorite) {
      navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
    } else {
      navigation.goBack();
    }
  }, [fromFavorite, navigation]);

  // Android hardware back: if opened from Favorite, go back to Favorite tab
  useFocusEffect(
    useCallback(() => {
      if (!fromFavorite) {
        return () => {};
      }
      const onBackPress = () => {
        navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => {
        subscription.remove();
      };
    }, [fromFavorite, navigation]),
  );

  const specificationRows = useMemo(
    () => [
      {label: 'Brand', value: product?.key_details?.brand},
      {label: 'Country', value: product?.key_details?.country},
      {label: 'Aged', value: product?.key_details?.aged},
      {label: 'Finish', value: product?.key_details?.finish},
      {label: 'Peated', value: product?.key_details?.peated},
      {label: 'Alcohol', value: product?.key_details?.alcohol},
    ],
    [product],
  );

  const sensoryRows = useMemo(
    () => [
      {label: 'Alcohol', value: product?.sensory_structure?.alcohol},
      {
        label: 'Aroma Intensity',
        value: product?.sensory_structure?.aroma_intensity,
      },
      {
        label: 'Flavor Profile',
        value: product?.sensory_structure?.flavor_profile,
      },
      {label: 'Body', value: product?.sensory_structure?.body},
      {label: 'Finish', value: product?.sensory_structure?.finish},
    ],
    [product],
  );



  const renderDetailRow = (label: string, value?: string | number | null) => (
    <View key={label} style={styles.detailRow}>
      <Text style={[Styles.title_Regular, styles.detailLabel]}>{label}:</Text>
      <Text style={[Styles.title_Regular, styles.detailValue]}>
        {value ?? '-'}
      </Text>
    </View>
  );

  // Memoized key extractors
  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={Color.primary}
      style={{marginTop: Height / 2.5}}
    />
  ) : (
    <View style={[Styles.container]}>
      <ScrollView>
        <CustomHeader
          showBack={true}
          title={product?.title || ''}
          onSubmitBack={handleBack}
        />
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: product?.image_url}}
            style={styles.productImage}
          />
        </View>
        {/* <Slider /> */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={[Styles.h6_Bold]}>{product?.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(product?.id)}>
              {isFavorite ? (
                <Heart_primary width={24} height={24} />
              ) : (
                <Heart width={24} height={24} fill={Color.white} />
              )}
            </TouchableOpacity>
          </View>
          {/* <Text
            style={[Styles.title_Regular, {marginLeft: '5%', marginTop: 10}]}>
            {product?.description}
          </Text> */}
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <View style={styles.volumeBadge}>
            <Text style={[Styles.title_Regular, styles.volumeText]}>
              {product?.volume} ml
            </Text>
          </View>
          <Text style={[Styles.title_Regular, styles.subInfoText]}>
            sku:{product?.sku}
          </Text>
          <Text style={[Styles.title_Regular, styles.subInfoText]}>
            stock status: {product?.stock_status || ''}
          </Text>
          {/* <CatalogFilter
            onHandler={e => console.log(e)}
            sortData={data}
            sortItemContainerStyle={styles.sortItemContainer}
          /> */}
          <View style={styles.priceRow}>
            <Text style={[Styles.h4_Bold]}>
              {product?.sale_price ?? product?.price} zł
            </Text>
            {product?.regular_price && (
              <Text style={[Styles.body_Regular, styles.salePriceText]}>
                {product?.regular_price || ''} zł
              </Text>
            )}
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
                Delevery Sept. 7
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
            Specifications
          </Text>
          {specificationRows.map(row => renderDetailRow(row.label, row.value))}
          <View style={styles.sectionDivider} />

          <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
            Sensory Structure
          </Text>
          {sensoryRows.map(row => renderDetailRow(row.label, row.value))}
          <View style={styles.sectionDivider} />
          <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
            Tasting Characteristics
          </Text>
          <Text style={[Styles.title_Regular, styles.paragraphMuted]}>
            {product?.tasting_characteristics?.text}
          </Text>

          {product?.tasting_characteristics?.aromas_and_flavours && (
            <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
              Aromas and flavours:
            </Text>
          )}
          {product?.tasting_characteristics?.aromas_and_flavours?.primary && (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                Primary
              </Text>
              <View style={styles.aromaRow}>
                <Text style={[Styles.title_Regular, styles.aromaLabel]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.primary[0]?.name
                  }
                  :
                </Text>
                <Text style={[Styles.title_Regular, styles.aromaValue]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.primary[0]?.value
                  }
                </Text>
              </View>
            </>
          )}
          {product?.tasting_characteristics?.aromas_and_flavours?.secondary && (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                Secondary
              </Text>
              <View style={styles.aromaRow}>
                <Text style={[Styles.title_Regular, styles.aromaLabel]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.secondary[0]?.name
                  }
                </Text>
                <Text style={[Styles.title_Regular, styles.aromaValue]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.secondary[0]?.value
                  }
                </Text>
              </View>
            </>
          )}
          {product?.tasting_characteristics?.aromas_and_flavours?.tertiary && (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                Tertiary
              </Text>
              <View style={styles.aromaRow}>
                <Text style={[Styles.title_Regular, styles.aromaLabel]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.tertiary[0]?.name
                  }
                </Text>
                <Text style={[Styles.title_Regular, styles.aromaValue]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.tertiary[0]?.value
                  }
                </Text>
              </View>
            </>
          )}

          {product?.gastronomy?.text && (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                Gastronomy
              </Text>
              <Text style={[Styles.title_Regular, styles.paragraphMuted]}>
                {product?.gastronomy?.text}
              </Text>
            </>
          )}

          {product?.gastronomy?.suggestions && (
            <>
              <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                Suggestions
              </Text>
              {product?.gastronomy?.suggestions.map(
                (suggestion: any, index: number) => (
                  <Text
                    key={index}
                    style={[Styles.title_Regular, styles.suggestionText]}>
                    {suggestion}
                  </Text>
                ),
              )}
            </>
          )}
        </View>

        <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
          With this also watching
        </Text>

        <HorizontalFlatList
        callback={(e)=>onSubmitDetail(e)}
          products={recommended}
          onFavoriteToggled={(_id: string, _isFavorite: boolean) =>
            refreshAll()
          }
        />

        {count === 0 ? (
          <BottomCardComponent
            title={'Add to Cart'}
            onHandler={onSubmit}
            style={styles.bottomCardButton}
            textStyle={Styles.subtitle_Regular}
            icon={<Card />}
          />
        ) : (
          <AddBottom
            style={styles.bottomCardButton}
            onQuantityChange={onClick}
            count={count}
            stylesContainer={{width:'60%',justifyContent:'space-between'}}
          />
        )}
        <LoadingModal isVisible={visible} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  sortItemContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.primary,
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  detailsContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: '5%',
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
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 10,
    padding: 10,
    marginLeft: '5%',
    marginTop: 10,
  },
  volumeText: {
    marginLeft: '5%',
  },
  subInfoText: {
    marginLeft: '6%',
    marginTop: 10,
  },
  priceRow: {
    marginLeft: '5%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  salePriceText: {
    marginLeft: '5%',
    color: Color.gray,
    textDecorationLine: 'line-through',
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
    marginTop: 10,
  },
  paragraphMuted: {
    marginLeft: '5%',
    marginTop: 10,
    color: Color.gray,
  },
  aromaRow: {
    flexDirection: 'row',
  },
  aromaLabel: {
    marginLeft: '5%',
    marginTop: 10,
  },
  aromaValue: {
    marginLeft: '2%',
    marginTop: 10,
    width: '60%',
  },
  suggestionText: {
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
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
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: '5%',
  },
  detailLabel: {
    color: Color.gray,
  },
  detailValue: {
    marginLeft: 16,
    flexShrink: 1,
    textAlign: 'right',
  },
  bottomCardButton: {
    marginTop: '10%',
    width: '95%',
    marginBottom:10,
  },
});
