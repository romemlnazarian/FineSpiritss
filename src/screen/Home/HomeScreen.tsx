import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
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
import Search from '../../assets/svg/SearchGray.svg';
import {Language} from '../../utiles/Language/i18n';

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
    ageConfirmed,
    onConfrim,
    onSubmitSearch,
  } = HomeLogic();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') {
        return;
      }
      const onBackPress = () => {
        Alert.alert(
          Language.exit_app,
          Language.exit_confirm,
          [
            {text: Language.No, style: 'cancel'},
            {text: Language.Yes, onPress: () => BackHandler.exitApp()},
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
    <View style={Styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled">
        <HomeHeader />
        <TouchableOpacity
          onPress={onSubmitSearch}
          activeOpacity={0.7}
          style={styles.searchBar}>
          <Search width={24} height={24} />
          <Text style={[Styles.title_Medium, styles.searchText]}>
            {Language.Search}
          </Text>
        </TouchableOpacity>
        <ModalCard
          isVisible={ageConfirmed}
          onClose={onSubmitClose}
          onConfirm={() => onConfrim()}
        />

        <Slider data={homeAdvertising} onSubmit={onSubmitAdvertising} />
        <HomeCategory data={categories} onSubmitCategory={onSubmitCategory} />
        <ScrollCard data={topBrands} />

        <HomeSort
          onClick={onSubmitSort}
          data={dataSort}
          loading={dataSortLoading}
          onSubmitProduct={onSubmitProduct}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  searchText: {
    color: Color.gray,
  },
});
