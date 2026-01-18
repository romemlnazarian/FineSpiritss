import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Image,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogDetailLogic from '../../logic/Catalog/CatalogDetailLogic';
import Heart from '../../assets/svg/Heart.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BottomCardComponent from '../../component/BottomCard';
import AddBottom from '../../component/AddBottom';
import LoadingModal from '../../component/LoadingModal';
import Card from '../../assets/svg/Cart.svg';
import Fish from '../../assets/svg/fish.svg';
import Cheesse from '../../assets/svg/cheese.svg';
import Meat from '../../assets/svg/meat.svg';
import Fruits from '../../assets/svg/fruits_and_berries.svg';
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
    onSubmitDetail,
  } = CatalogDetailLogic(route);
  const navigation: any = useNavigation();
  const fromFavorite = Boolean(route?.route?.params?.fromFavorite);
  const fromSetting = Boolean(route?.route?.params?.fromSetting);


  const handleBack = useCallback(() => {
    if (fromFavorite) {
      navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
      return;
    }
    if (fromSetting) {
      // We jumped here across tabs (Setting -> Catalog). Go back to Setting tab.
      navigation.navigate('SettingScreen');
      return;
    } else {
      if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('CatalogScreen', {screen: 'Catalog'});
      }
    }
  }, [fromFavorite, fromSetting, navigation]);

  // Android hardware back: if opened from Favorite, go back to Favorite tab
  useFocusEffect(
    useCallback(() => {
      if (!fromFavorite && !fromSetting) {
        return () => {};
      }
      const onBackPress = () => {
        if (fromFavorite) {
          navigation.navigate('FavoriteScreen', {screen: 'Favorite'});
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
    }, [fromFavorite, fromSetting, navigation]),
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
            resizeMethod="resize"
          />
        </View>
        {/* <Slider /> */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={[Styles.body_Bold]}>{product?.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(product?.id)}>
              {isFavorite ? (
                <Heart width={24} height={24} fill={Color.red} />
              ) : (
                <Heart width={24} height={24} fill={Color.white} />
              )}
            </TouchableOpacity>
          </View>
          {/* <Text
            style={[Styles.title_Regular, {marginLeft: '5%', marginTop: 10}]}>
            {product?.description}
          </Text> */}
          <View style={styles.volumeBadge}>
            <Text style={[Styles.title_Regular, styles.volumeText]}>
              {product?.volume}
            </Text>
            <Text style={[Styles.title_Regular, styles.volumeText]}>
              ml
            </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
          <Text style={[Styles.title_Regular, styles.subInfoText,{color:Color.gray}]}>
            SKU:
          </Text>
          <Text style={[Styles.title_Regular, styles.subInfoText,{color:Color.gray,marginLeft:0,color:Color.black}]}>
             {product?.sku}
          </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
          <Text style={[Styles.title_Regular, styles.subInfoText,{color:Color.gray}]}>
            Stock status:
          </Text>
          <Text style={[Styles.title_Regular, styles.subInfoText,{color:Color.gray,marginLeft:0,color:Color.black}]}>{product?.stock_status || ''}</Text>
          </View>
          {/* <CatalogFilter
            onHandler={e => console.log(e)}
            sortData={data}
            sortItemContainerStyle={styles.sortItemContainer}
          /> */}
          <View style={styles.priceRow}>
            <Text style={[Styles.h5_Bold]}>
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
          <Text style={[Styles.title_Regular, styles.paragraphMuted,{width:'85%',color:Color.black}]}>
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
              <View style={[styles.aromaRow,{flexDirection:'column',}]}>
                <Text style={[Styles.title_Medium, styles.aromaLabel,]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.primary[0]?.name
                  }
                  :
                </Text>
                <Text style={[Styles.title_Regular, styles.aromaValue,{marginLeft:'5%',marginTop:0,width:'85%'}]}>
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
              <View style={[styles.aromaRow,{flexDirection:'column'}]}>
                <Text style={[Styles.title_Medium, styles.aromaLabel]}>
                  {
                    product?.tasting_characteristics?.aromas_and_flavours
                      ?.secondary[0]?.name
                  }
                  :
                </Text>
                <Text style={[Styles.title_Regular, styles.aromaValue,{marginLeft:'5%',marginTop:0,width:'85%'}]}>
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
                <Text style={[Styles.title_Regular, styles.aromaValue,{marginTop:0,marginLeft:'0%',width:'85%'}]}>
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
              <Text style={[Styles.title_Regular, styles.paragraphMuted,{color:Color.black}]}>
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
                  <View key={index} style={styles.suggestionText}>
                    {suggestion === 'fish' && <Fish width={30} height={30} />}
                    {suggestion === 'cheese' && <Cheesse width={30} height={30} />}
                    {suggestion === 'meat' && <Meat width={30} height={30} />}
                    {suggestion === 'fruits_and_berries' && <Fruits width={30} height={30} />}
                    <Text style={[Styles.title_Regular]}>
                    {(() => {
                      const raw =
                        suggestion === 'fruits_and_berries'
                          ? 'Fruits and Berries'
                          : String(suggestion ?? '').replace(/_/g, ' ');
                      return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : raw;
                    })()}
                  </Text>
                  </View>
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
            textStyle={[Styles.subtitle_Regular,{color:Color.white}]}
            icon={<Card />}
          />
        ) : (
          <AddBottom
            style={styles.bottomCardButton}
            onQuantityChange={onClick}
            count={count}
            stylesContainer={styles.addBottomStylesContainer}
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
    marginTop: '5%',
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
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginLeft: '5%',
    marginTop: 10,
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
  addBottomStylesContainer: {
    width: '60%',
    justifyContent: 'space-between',
  },
});
