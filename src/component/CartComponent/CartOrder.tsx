import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Location from '../../assets/svg/cart_location.svg';
import Visa from '../../assets/svg/visa_logo.svg';
import ArrowDown from 'react-native-vector-icons/MaterialIcons';
import ArrowUp from 'react-native-vector-icons/MaterialIcons';
import Check from 'react-native-vector-icons/FontAwesome6';
import BottomCardComponent from '../../component/BottomCard';

export default function CartOrder() {
  const {Styles} = StyleComponent();
  const [activeTab, setActiveTab] = useState<'summary' | 'delivery'>('summary');
  const paymentMethods = useMemo(
    () => [
      {id: 'visa-0312', brand: 'Visa', masked: '....0312', Logo: Visa},
      {id: 'visa-8421', brand: 'Visa', masked: '....8421', Logo: Visa},
    ],
    [],
  );
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => setActiveTab('summary')}
            style={[
              styles.tabButton,
              activeTab === 'summary' && styles.tabButtonActive,
            ]}>
            <Text
              style={[
                Styles.title_Regular,
                activeTab === 'summary' ? styles.tabTextActive : styles.tabText,
              ]}>
              Order summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('delivery')}
            style={[
              styles.tabButton,
              activeTab === 'delivery' && styles.tabButtonActive,
            ]}>
            <Text
              style={[
                Styles.title_Regular,
                activeTab === 'delivery'
                  ? styles.tabTextActive
                  : styles.tabText,
              ]}>
              delivary
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'summary' ? (
          <View style={styles.addressRow}>
            <Location />
            <Text style={[Styles.title_Regular, styles.ml2]}>
              Cybernetyki 17, 02-677 Warszawa
            </Text>
          </View>
        ) : (
          <View style={styles.p16}>
            <Text style={Styles.title_Regular}>
              Choose address and delivery options.
            </Text>
          </View>
        )}
        <Text style={[Styles.h6_Medium, styles.sectionTitle]}>
          Payment methods
        </Text>
        <View style={styles.dropdownHeader}>
          <selectedMethod.Logo />
          <Text style={[Styles.title_Regular, styles.ml2]}>
            {selectedMethod.masked}
          </Text>
          <View style={styles.dropdownIndicator} />
        </View>

        {open && (
          <View style={styles.dropdownList}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                activeOpacity={0.7}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setSelectedMethod(method);
                  setOpen(false);
                }}
                style={styles.dropdownItem}>
                <method.Logo />
                <Text style={[Styles.title_Regular, styles.ml2]}>
                  {method.brand} {method.masked}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setOpen(prev => !prev);
          }}>
          <Text style={[Styles.title_Regular, Styles.textAlign, styles.mt2]}>
            All payment methods
          </Text>
          {open ? (
            <ArrowUp name="keyboard-arrow-up" size={30} style={{marginTop:'2%'}}/>
          ) : (
            <ArrowDown name="keyboard-arrow-down"  size={30} style={{marginTop:'2%'}}/>
          )}
        </TouchableOpacity>
        <View style={styles.divider} />

        <Text style={[Styles.h6_SemiBold, styles.mt5, styles.ml5]}>
          Order Summary
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            My order
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>2 items</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Order amount
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>$212.98</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Sale by promo code
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>-$15</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Constant discount
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>-3% </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Delivery
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>Free </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.orderButton}>
          <Text style={[Styles.title_Regular, {color: Color.white}]}>
            Order
          </Text>
          <Text style={[Styles.title_Regular, {color: Color.white}]}>
            $192.04
          </Text>
        </View>
        <View style={[styles.divider, styles.mt15]} /> */}
        <View style={styles.successContainer}>
          <Check name="check" size={50} color={Color.white} />
        </View>
        <View style={styles.successTextContainer}>
        <Text style={[Styles.h5_Medium, {color: Color.black}]}>Checkout was done </Text>
        <Text style={[Styles.h5_Medium, {color: Color.black}]}>successfully</Text>
        </View>
        <BottomCardComponent title="My orders" onHandler={()=>{}} style={styles.successCard}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  successCard:{
    alignSelf: 'center',
    marginTop: '5%',
  },
  successTextContainer:{
    width: '90%',
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer:{
    width:100 ,
    height: 100,
    borderRadius: '50%',
    alignSelf: 'center',
    marginTop: '2%',
    backgroundColor: Color.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {width: '93%', alignSelf: 'center', marginTop: '5%'},
  tabBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'space-around',
    height: 40,
  },
  tabButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  tabButtonActive: {backgroundColor: Color.primary},
  tabText: {color: Color.black},
  tabTextActive: {color: Color.white},
  addressRow: {padding: 16, flexDirection: 'row', alignItems: 'center'},
  p16: {padding: 16},
  ml2: {marginLeft: '2%'},
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
  dropdownIndicator: {
    width: 24,
    height: 24,
    backgroundColor: Color.primary,
    borderRadius: 12,
    position: 'absolute',
    right: 10,
  },
  dropdownList: {
    width: '90%',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    backgroundColor: Color.background,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: '2%',
  },
  divider: {
    height: 1,
    backgroundColor: Color.lightGray,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  mt2: {marginTop: '2%'},
  ml5: {marginLeft: '5%'},
  mt5: {marginTop: '5%'},
  mt15: {marginTop: '15%'},
  rowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  orderButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.primary,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
});
