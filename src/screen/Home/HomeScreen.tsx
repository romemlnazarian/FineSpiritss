import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {StyleComponent} from '../../utiles/styles';
import ModalCard from '../../component/ModalCard';
import HomeLogic from '../../logic/HomeLogic';
import {Color} from '../../utiles/color';
import HomeHeader from '../../component/HomeHeader';
import {useFocusEffect} from '@react-navigation/native';
import Slider from '../../component/HomeCamponent/Slider';
import HomeCategory from '../../component/HomeCamponent/HomeCategory';
import HomeSort from '../../component/HomeCamponent/HomeSort';
import ScrollCard from '../../component/HomeCamponent/ScrollCard';
import VerticalScroll from '../../component/HomeCamponent/VerticalScroll';
import Search from '../../assets/svg/SearchGray.svg';
export default function HomeScreen() {
  const {Styles, Height} = StyleComponent();
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
    ageConfirmed,
    onConfrim,
    onSubmitSearch
  } = HomeLogic();

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
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  const isPageLoading =
    isCategoriesLoading || isTopBrandsLoading || isHomeAdvertisingLoading;

  if (isPageLoading) {
    return (
      <View style={[Styles.container, Styles.alignCenter]}>
        <ActivityIndicator
          size="large"
          color={Color.primary}
          style={{marginTop: Height / 2.5}}
        />
      </View>
    );
  }

  return (
    <View style={[Styles.container, Styles.alignCenter]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <TouchableOpacity
          onPress={onSubmitSearch}
          style={{
            width: '90%',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: Color.gray,
            borderRadius: 14,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Search width={24} height={24} />
          <Text style={[Styles.title_Light, {color: Color.gray}]}>Search</Text>
        </TouchableOpacity>
        <ModalCard
          isVisible={ageConfirmed}
          onClose={onSubmitClose}
          onConfirm={() => onConfrim()}
        />

        <Slider data={homeAdvertising} onSubmit={onSubmitAdvertising} />
        <HomeCategory data={categories} onSubmitCategory={onSubmitCategory} />

        <HomeSort
          onClick={onSubmitSort}
          data={dataSort}
          loading={dataSortLoading}
          onSubmitProduct={onSubmitProduct}
        />

        {/* <BonusSection /> */}
        {/* <SpecialOffersSection /> */}

        <ScrollCard data={topBrands} />

        <VerticalScroll
          item={homeRecommended}
          onSubmitProduct={onSubmitProduct}
        />
      </ScrollView>
    </View>
  );
}
