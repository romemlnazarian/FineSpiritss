import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import {Language} from '../../utiles/Language/i18n';
import Gllass from '../../assets/svg/gllass.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import CustomHeader from '../../navigation/CustomHeader';
import FavoriteLogic from '../../logic/Favorite/FavoriteLogic';
import FavoriteItem from '../../component/FavoriteComponent/FavoriteItem';

export default function FavoriteScreen() {
  const {Styles} = StyleComponent();
  const {favoriteProducts, loading, recommended, onSubmit} = FavoriteLogic();
  const navigation: any = useNavigation();

  if (loading) {
    return (
      <View style={[Styles.container, Styles.alignCenter, Styles.justifyCenter]}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} subTitle={Language.favorite_wishlist} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {favoriteProducts.length === 0 ? (
          <View
            style={[Styles.alignCenter, Styles.alignSelf, styles.emptyStateContainer]}>
            <Gllass width={100} height={100} />
            <Text style={[Styles.h4_Bold, styles.emptyTitle]}>
              {Language.favorite_empty_title}
            </Text>
            <Text style={[Styles.body_Regular, Styles.textAlign, styles.emptySubtitle]}>
              {Language.favorite_empty_subtitle}
            </Text>
          </View>
        ) : (
          <FavoriteItem favoriteProducts={favoriteProducts} onReload={onSubmit} />
        )}

        <View style={[Styles.alignSelf, styles.recommendationsContainer]}>
          <Text style={[Styles.h4_Bold, styles.recommendationsTitle]}>
            {Language.cart_you_might_also_like}
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
              onSubmit(id, isFavorite)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {width: '93%', marginTop: '8%'},
  emptyTitle: {textAlign: 'center', width: '60%'},
  emptySubtitle: {width: '80%', marginTop: '2%'},
  recommendationsContainer: {width: '93%', marginTop: '8%'},
  recommendationsTitle: {marginLeft: '2%'},
});

