import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../utiles/styles';
import ModalCard from '../component/ModalCard';
import HomeLogic from '../Logic/HomeLogic';
import HomeHeader from '../component/HomeHeader';
import Slider from '../component/HomeCamponent/Slider';
import HomeCategory from '../component/HomeCamponent/HomeCategory';
import HomeSort from '../component/HomeCamponent/HomeSort';
import Start from '../assets/svg/Star_Icon.svg';
import {Color} from '../utiles/color';
import BottomCardComponent from '../component/BottomCard';
import ScrollCard from '../component/HomeCamponent/ScrollCard';
import VerticalScroll from '../component/HomeCamponent/VerticalScroll';
const productData: ProductItem[] = [
  {
    id: 'p1',
    title: 'Cognac Hennessy1',
    description: 'France ABV 40%',
    price: '$199.99',
    originalPrice: '$250.00',
  },
  {
    id: 'p2',
    title: 'Whiskey Jameson2',
    description: 'Ireland ABV 40%',
    price: '$49.99',
    originalPrice: '$60.00',
  },
  {
    id: 'p3',
    title: 'Vodka Absolut',
    description: 'Sweden ABV 40%',
    price: '$29.99',
    originalPrice: '$35.00',
  },
  {
    id: 'p4',
    title: 'Vodka Absolut',
    description: 'Sweden ABV 40%',
    price: '$29.99',
    originalPrice: '$35.00',
  },
  {
    id: 'p5',
    title: 'Vodka Absolut',
    description: 'Sweden ABV 40%',
    price: '$29.99',
    originalPrice: '$35.00',
  },
];
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
}
export default function HomeScreen() {
  const {Styles} = StyleComponent();
  const {onSubmitClose, visible} = HomeLogic();
  return (
    <View style={[Styles.container, Styles.alignCenter]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <ModalCard isVisible={visible} onClose={onSubmitClose} />
        <Slider />
        <HomeCategory />
        <HomeSort />
        <View
          style={{
            width: '90%',
            borderRadius: 20,
            backgroundColor: Color.lightRed,
            alignSelf: 'center',
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
          }}>
          <View style={[Styles.justifyBetween]}>
            <Start />
            <Text
              style={[
                Styles.body_Regular,
                {color: Color.white, width: '80%', marginLeft: 10},
              ]}>
              Earn bonus points with every purchase. Redeem them for discounts
              and gifts
            </Text>
          </View>
          <BottomCardComponent
            title={'Claim bonus points'}
            onHandler={() => console.log()}
            style={styles.buttonComponent}
            textStyle={{color: Color.primary}}
          />
        </View>
        <View style={{width:'93%',alignSelf:'center',marginTop:'5%'}}>
          <View style={styles.headerContainer}>
            <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
            Special offers
            </Text>
            <View style={styles.separatorLine} />
          </View>
          <Slider />
        </View>
        <ScrollCard/>
        <VerticalScroll item={productData}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonComponent: {
    marginTop: '5%',
    backgroundColor: Color.white,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: Color.primary,
  },
  separatorLine: {
    width: '60%',
    height: 1,
    backgroundColor: Color.lightGray,
    marginLeft: 10,
    marginTop: '2%',
  },
});
