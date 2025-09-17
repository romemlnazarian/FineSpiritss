import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, lazy, Suspense} from 'react';
import {StyleComponent} from '../../utiles/styles';
import ModalCard from '../../component/ModalCard';
import HomeLogic from '../../Logic/HomeLogic';
import HomeHeader from '../../component/HomeHeader';
import Start from '../../assets/svg/Star_Icon.svg';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../../component/BottomCard';

// Lazy load heavy components
const Slider = lazy(() => import('../../component/HomeCamponent/Slider'));
const HomeCategory = lazy(() => import('../../component/HomeCamponent/HomeCategory'));
const HomeSort = lazy(() => import('../../component/HomeCamponent/HomeSort'));
const ScrollCard = lazy(() => import('../../component/HomeCamponent/ScrollCard'));
const VerticalScroll = lazy(() => import('../../component/HomeCamponent/VerticalScroll'));

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
}

// Loading component for lazy loaded components
const ComponentLoader = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Memoized product data to prevent recreation on every render
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
// Memoized bonus section to prevent unnecessary re-renders
const BonusSection = React.memo(() => {
  const {Styles} = StyleComponent();
  return (
    <View style={styles.bonusContainer}>
      <View style={[Styles.justifyBetween]}>
        <Start />
        <Text style={[Styles.body_Regular, styles.bonusText]}>
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
  );
});

// Memoized special offers section
const SpecialOffersSection = React.memo(() => {
  const {Styles} = StyleComponent();
  return (
    <View style={styles.specialContainer}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.h6_SemiBold, styles.categoryTitle]}>
          Special offers
        </Text>
        <View style={styles.separatorLine} />
      </View>
      <Suspense fallback={<ComponentLoader />}>
        <Slider />
      </Suspense>
    </View>
  );
});

export default function HomeScreen() {
  const {Styles} = StyleComponent();
  const {onSubmitClose, visible} = HomeLogic();

  // Memoize the product data to prevent recreation
  const memoizedProductData = useMemo(() => productData, []);

  return (
    <View style={[Styles.container, Styles.alignCenter]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
         <ModalCard isVisible={visible} onClose={onSubmitClose} />

      <Suspense fallback={<ComponentLoader />}>
          <Slider />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
        <HomeCategory />
        </Suspense>

         <Suspense fallback={<ComponentLoader />}>
          <HomeSort />
        </Suspense>

         <BonusSection />
        <SpecialOffersSection />

       <Suspense fallback={<ComponentLoader />}>
          <ScrollCard />
        </Suspense>

        <Suspense fallback={<ComponentLoader />}>
          <VerticalScroll item={memoizedProductData} />
        </Suspense>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonComponent: {
    marginTop: '5%',
    backgroundColor: Color.white,
  },
  bonusContainer: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: Color.lightRed,
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  bonusText: {
    color: Color.white,
    width: '80%',
    marginLeft: 10,
  },
  specialContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
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
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lightGray,
    marginVertical: 10,
    borderRadius: 10,
  },
  loadingText: {
    color: Color.gray,
    fontSize: 16,
  },
});
