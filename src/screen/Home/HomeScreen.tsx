import {ActivityIndicator, Alert, BackHandler, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {lazy, Suspense, useCallback} from 'react';
import {StyleComponent} from '../../utiles/styles';
import ModalCard from '../../component/ModalCard';
import HomeLogic from '../../logic/HomeLogic';
import {Color} from '../../utiles/color';
import useAuthStore from '../../zustland/AuthStore';
import HomeHeader from '../../component/HomeHeader';
import {useFocusEffect} from '@react-navigation/native';

// Lazy load heavy components
const Slider = lazy(() => import('../../component/HomeCamponent/Slider'));
const HomeCategory = lazy(
  () => import('../../component/HomeCamponent/HomeCategory'),
);
const HomeSort = lazy(() => import('../../component/HomeCamponent/HomeSort'));
const ScrollCard = lazy(
  () => import('../../component/HomeCamponent/ScrollCard'),
);
const VerticalScroll = lazy(
  () => import('../../component/HomeCamponent/VerticalScroll'),
);

// Loading component for lazy loaded components
const ComponentLoader = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default function HomeScreen() {
  const {Styles,Height} = StyleComponent();
  const {
    onSubmitClose,
    categories,
    topBrands,
    isCategoriesLoading,
    isTopBrandsLoading,
    onSubmitCategory,
    homeAdvertising,
    isHomeAdvertisingLoading,
    onSubmitAdvertising,
    onSubmitSort,
    onSubmitProduct,
    dataSort,
    dataSortLoading,
    homeRecommended,
    ageConfirmed
  } = HomeLogic();

  // Android: confirm before exiting app on hardware back press when on Home
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') {
        return;
      }
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, []),
  );

  const isPageLoading =
    isCategoriesLoading ||
    isTopBrandsLoading ||
    isHomeAdvertisingLoading;

  if (isPageLoading) {
    return (
      <View style={[Styles.container, Styles.alignCenter]}>
        <ActivityIndicator size="large" color={Color.primary} style={{marginTop: Height / 2.5}}/>
      </View>
    );
  }
  return (
    <View style={[Styles.container, Styles.alignCenter]}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <HomeHeader />
        <ModalCard
          isVisible={ageConfirmed}
          onClose={onSubmitClose}
        />

        <Suspense fallback={<ComponentLoader />}>
          <Slider data={homeAdvertising} onSubmit={onSubmitAdvertising} />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
          <HomeCategory data={categories} onSubmitCategory={onSubmitCategory} />
        </Suspense>

        <Suspense fallback={<ComponentLoader />}>
          <HomeSort onClick={onSubmitSort} data={dataSort} loading={dataSortLoading} onSubmitProduct={onSubmitProduct} />
        </Suspense>

        {/* <BonusSection /> */}
        {/* <SpecialOffersSection /> */}

        <Suspense fallback={<ComponentLoader />}>
          <ScrollCard data={topBrands} />
        </Suspense>

        <Suspense fallback={<ComponentLoader />}>
          <VerticalScroll item={homeRecommended} onSubmitProduct={onSubmitProduct} />
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
