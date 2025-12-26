import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import ShoppingCard from '../../assets/svg/ShoppingCart.svg';
import CustomHeader from '../../navigation/CustomHeader';
import CartItem from '../../component/CartComponent/CartItem';
import CartLogix from '../../logic/Cart/CartLogix';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import {useNavigation} from '@react-navigation/native';

export default function CardScreen() {
  const {Styles} = StyleComponent();
  const {
    loading,
    data,
    address,
    refreshCart,
    onSubmitAddress,
    onSubmit,
    error,
    recommended,
    toggleFavorite
  } = CartLogix();
  const navigation: any = useNavigation();
  useFocusEffect(
    useCallback(() => {
      refreshCart();
      // no cleanup needed
      return undefined;
    }, [refreshCart]),
  );
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} title="Cart" />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Color.primary}
          style={styles.activityIndicator}
        />
      ) : (
        <ScrollView>
          {data?.products && data.products.length > 0 ? (
            <>
              <CartItem data={data} refreshCart={refreshCart} />
              <View style={styles.sectionContainer}>
                <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
                  Shipping Address
                </Text>
                <View
                  style={[
                    styles.dropdownHeader,
                    {borderColor: error ? Color.red : Color.primary},
                  ]}>
                  {address.street == '' ? (
                    <TouchableOpacity
                      onPress={() => onSubmitAddress()}
                      style={styles.createAddressRow}>
                      <View style={styles.plusIconContainer}>
                        <PlusIcon name={'plus'} color={Color.black} size={20} />
                      </View>
                      <Text style={Styles.title_Regular}>
                        create an address
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Text
                        style={[
                          Styles.title_Regular,
                          styles.ml2,
                          {color: Color.black},
                        ]}>
                        {address?.street}
                      </Text>
                      <View
                        style={[
                          Styles.justifyCenter,
                          styles.dropdownIndicator,
                        ]}>
                        <PlusIcon
                          name={'check'}
                          color={Color.white}
                          size={20}
                        />
                      </View>
                    </>
                  )}
                </View>
                {/* <Text style={[Styles.title_Regular, styles.ml5]}>Promo code</Text>
            <View style={styles.promoInput}>
              <Text style={[Styles.title_Regular, styles.textLightGray]}>
                Enter promo code here
              </Text>
              <TouchableOpacity>
                <Text style={[Styles.title_Regular, styles.textLightGray]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View> */}
                <Text style={[Styles.h6_SemiBold, styles.mt5, styles.ml5]}>
                  Order Summary
                </Text>
                <View style={styles.rowBetween}>
                  <Text style={[Styles.title_Regular, styles.blackText]}>
                    My order
                  </Text>
                  <Text style={[Styles.title_Bold, styles.blackText]}>
                    {data?.summary?.items_count}{' '}
                    {data?.summary?.items_count === 1 ? 'item' : 'items'}
                  </Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={[Styles.title_Regular, styles.blackText]}>
                    Order amount
                  </Text>
                  <Text style={[Styles.title_Bold, styles.blackText]}>
                    {data?.summary?.subtotal} zł
                  </Text>
                </View>
                {/* <View style={styles.rowBetween}>
              <Text style={[Styles.title_Regular, styles.blackText]}>
                Sale by promo code
              </Text>
              <Text style={[Styles.title_Bold, styles.blackText]}>
                -$15
              </Text>
            </View> */}
                {/* <View style={styles.rowBetween}>
              <Text style={[Styles.title_Regular, styles.blackText]}>
                Constant discount
              </Text>
              <Text style={[Styles.title_Bold, styles.blackText]}>
                -3%{' '}
              </Text>
            </View> */}
                <View style={styles.rowBetween}>
                  <Text style={[Styles.title_Regular, styles.blackText]}>
                    Delivery
                  </Text>
                  <Text style={[Styles.title_Bold, styles.blackText]}>
                    Free
                  </Text>
                </View>
                <View style={styles.divider} />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onSubmit(data?.summary?.checkout_id)}
                  style={styles.orderButton}>
                  <Text style={[Styles.title_Regular, styles.whiteText]}>
                    Order
                  </Text>
                  <Text style={[Styles.title_Regular, styles.whiteText]}>
                    {data?.summary?.total}
                  </Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
              </View>
            </>
          ) : (
            <View>
              {recommended.length > 0 ?
              <>
              <View style={[styles.emptyCartContainer]}>
                <ShoppingCard fill={Color.black} />
                <Text style={[Styles.h3_Bold, styles.emptyCartTitle]}>
                  Your Cart is Empty
                </Text>
                <Text
                  style={[
                    Styles.h6_Regular,
                    Styles.textAlign,
                    styles.emptyCartSubtitle,
                  ]}>
                  Once you add items from a store, your cart will appear here
                </Text>
              </View>
              <View
                style={[
                  Styles.alignSelf,
                  {width: '93%', marginTop: '8%', marginBottom: '5%'},
                ]}>
                <Text style={[Styles.h4_Bold, {marginLeft: '2%'}]}>
                  Recommendations
                </Text>
                <HorizontalFlatList
                  callback={(item: any) =>
                    navigation.navigate('CatalogScreen', {
                      screen: 'CatalogDetail',
                      params: {product: item},
                    })
                  }
                  products={recommended}
                  onFavoriteToggled={(id: string, isFavorite: boolean) =>
                    toggleFavorite(id)
                  }
                  onToggleClick={(id: number) =>refreshCart()}
                />
              </View>
              </>:
                     <View style={[styles.emptyCartContainer]}>
                     <ShoppingCard fill={Color.black} />
                     <Text style={[Styles.h3_Bold, styles.emptyCartTitle]}>
                       Your Cart is Empty
                     </Text>
                     <Text
                       style={[
                         Styles.h6_Regular,
                         Styles.textAlign,
                         styles.emptyCartSubtitle,
                       ]}>
                       Once you add items from a store, your cart will appear here
                     </Text>
                   </View>
              
              }
            </View>
          )}
          {/* <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>
      <ShoppingCard fill={Color.black}/>
      <Text style={Styles.h3_Bold}>Your Cart is Empty</Text>
      <Text style={[Styles.h6_Regular,Styles.textAlign,{width:'80%'}]}>Once you add items from a store,
      your cart will appear here</Text>
      </View>
      <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>You might also like</Text>
      <HorizontalFlatList />
      </View> */}
        </ScrollView>
      )}
      {/* <BottomSheet modalVisible={true} height={500}>
        <CartOrder />
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.white,
    marginTop: '5%',
  },

  ml5: {marginLeft: '5%'},
  activityIndicator: {marginTop: 200},
  blackText: {color: Color.black},
  whiteText: {color: Color.white},
  emptyCartContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '93%',
    marginTop: '12%',
  },
  emptyCartTitle: {marginTop: 10},
  emptyCartSubtitle: {width: '80%'},

  mt5: {marginTop: '5%'},
  promoInput: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 14,
    marginTop: '2%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textLightGray: {color: Color.lightGray},
  rowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.lightGray,
    height: 1,
    marginTop: '5%',
  },
  orderButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
  },
  spacer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {marginLeft: '5%', marginTop: '2%'},
  dropdownHeader: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 12,
    marginTop: '2%',
    paddingHorizontal: 10,
  },
  ml2: {marginLeft: '2%'},
  plusIconContainer: {
    ...StyleComponent().Styles.justifyCenter,
    width: 50,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.gray,
  },
  createAddressRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dropdownIndicator: {
    width: 24,
    height: 24,
    backgroundColor: Color.primary,
    borderRadius: 12,
    position: 'absolute',
    right: 10,
  },
});
