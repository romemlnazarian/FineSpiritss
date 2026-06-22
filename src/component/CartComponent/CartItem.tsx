import ProductCardInCart from './ProductCardInCart';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';

export default function CartItem(props: {
  data: {products: any[]; summary: {items_count: number}};
  refreshCart: () => void;
}) {
  const {
    data: {products, summary} = {products: [], summary: {items_count: 0}},
    refreshCart,
  } = props;
  const {Styles} = StyleComponent();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[Styles.body_SemiBold]}>My bag</Text>
        <Text style={[Styles.title_Regular, Styles.textAlign]}>
          {summary.items_count} {summary.items_count === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <View style={styles.divider} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}>
        {products?.map((item: any) => (
          <ProductCardInCart
            key={item.id}
            item={item}
            onSynced={refreshCart}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Color.lightGray,
    height: 1,
    marginTop: '5%',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  container: {width: '100%', backgroundColor: Color.white, padding: 10},
});
