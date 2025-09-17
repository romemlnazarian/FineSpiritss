import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Location from '../../assets/svg/cart_location.svg';
import Visa from '../../assets/svg/visa_logo.svg';
// import ArrowDown from '../../assets/svg/ArrowsDown.svg';
// import ArrowUp from '../../assets/svg/Arrows_up.svg';
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
    <View style={{width: '93%', alignSelf: 'center', marginTop: '5%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 16,
            justifyContent: 'space-around',
            height: 40,
          }}>
          <TouchableOpacity
            onPress={() => setActiveTab('summary')}
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              backgroundColor:
                activeTab === 'summary' ? Color.primary : 'transparent',
            }}>
            <Text
              style={[
                Styles.title_Regular,
                {color: activeTab === 'summary' ? Color.white : Color.black},
              ]}>
              Order summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('delivery')}
            style={{
              width: '50%',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                activeTab === 'delivery' ? Color.primary : 'transparent',
            }}>
            <Text
              style={[
                Styles.title_Regular,
                {color: activeTab === 'delivary' ? Color.white : Color.black},
              ]}>
              delivary
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'summary' ? (
          <View
            style={{padding: 16, flexDirection: 'row', alignItems: 'center'}}>
            <Location />
            <Text style={[Styles.title_Regular, {marginLeft: '2%'}]}>
              Cybernetyki 17, 02-677 Warszawa
            </Text>
          </View>
        ) : (
          <View style={{padding: 16}}>
            <Text style={Styles.title_Regular}>
              Choose address and delivery options.
            </Text>
          </View>
        )}
        <Text style={[Styles.h6_Medium, {marginLeft: '5%', marginTop: '2%'}]}>
          Payment methods
        </Text>
        <View
          style={{
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
          }}>
          <selectedMethod.Logo />
          <Text style={[Styles.title_Regular, {marginLeft: '2%'}]}>
            {selectedMethod.masked}
          </Text>
          <View
            style={{
              width: 24,
              height: 24,
              backgroundColor: Color.primary,
              borderRadius: 12,
              position: 'absolute',
              right: 10,
            }}
          />
        </View>

        {open && (
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: 'hidden',
            }}>
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
                style={{
                  flexDirection: 'row',
                  backgroundColor: Color.background,
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}>
                <method.Logo />
                <Text style={[Styles.title_Regular, {marginLeft: '2%'}]}>
                  {method.brand} {method.masked}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '90%',
            marginTop: '2%',
          }}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setOpen(prev => !prev);
          }}>
          <Text
            style={[Styles.title_Regular, Styles.textAlign, {marginTop: '2%'}]}>
            All payment methods
          </Text>
          {/* {open ? <ArrowUp /> : <ArrowDown />} */}
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: Color.lightGray,
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}
        />
  
        <Text style={[Styles.h6_SemiBold, {marginLeft: '5%', marginTop: '5%'}]}>
          Order Summary
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            My order
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>2 items</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Order amount
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>$212.98</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Sale by promo code
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>-$15</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Constant discount
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>-3% </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.title_Regular, {color: Color.black}]}>
            Delivery
          </Text>
          <Text style={[Styles.title_Bold, {color: Color.black}]}>Free </Text>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: Color.lightGray,
            height: 1,
            marginTop: '5%',
          }}
        />
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          <Text style={[Styles.h5_Bold, {color: Color.primary}]}>Total</Text>
          <Text style={[Styles.h5_Bold, {color: Color.black}]}>$192.04</Text>
        </View>
        <View
          style={{
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
          }}>
          <Text style={[Styles.title_Regular, {color: Color.white}]}>
            Order
          </Text>
          <Text style={[Styles.title_Regular, {color: Color.white}]}>
            $192.04
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Color.lightGray,
            width: '90%',
            alignSelf: 'center',
            marginTop: '15%',
          }}
        />
      </ScrollView>
    </View>
  );
}
