import ProductCardInCart from './ProductCardInCart';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import { useToast } from '../../utiles/Toast/ToastProvider';
import LoadingModal from '../LoadingModal';
import { deleteCardModel, updateCardModel } from '../../model/Card/CardModel';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';

export default function CartItem(props: { data: { products: any[]; summary: { items_count: number } }; refreshCart: () => void }) {
  const {token, setToken, refreshToken, setRefreshToken} = useAuthStore();
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();

  const {
    data: {products, summary} = {products: [], summary: {items_count: 0}},
    refreshCart,
  } = props;
  const {Styles} = StyleComponent();

  const handleQuantityChange = (id: number, type: string, newQuantity: number) => {
    if (type === 'inc') {
      setVisible(true);
      updateCardModel(
        token,
        Number(id),
        newQuantity,
        () => {
          setVisible(false);
          refreshCart();
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                id,
                newQuantity,
                () => {
                  setVisible(false);
                  refreshCart();
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    } else {
      setVisible(true);
      if(newQuantity < 1) {
        deleteCardModel(
          token,
          Number(id),
          () => {
            setVisible(false);
            refreshCart();
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                deleteCardModel(
                  refreshedTokens.access,
                  Number(id),
                  () => {
                    setVisible(false);
                    refreshCart();
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      }else{
      updateCardModel(
        token,
        Number(id),
        newQuantity,
        () => {
          setVisible(false);
          refreshCart();
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                id,
                newQuantity,
                () => {
                  setVisible(false);
                  refreshCart();
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    }
    }
  };

  const handleRemove = (id: number) => {
    setVisible(true);
    deleteCardModel(
      token,
      Number(id),
      () => {
        setVisible(false);
        refreshCart();
      },
      (error: string) => {
        setVisible(false);
        show(error, {type: 'error'});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
                deleteCardModel(
                  refreshedTokens.access,
                  Number(id),
                  () => {
                    setVisible(false);
                    refreshCart();
                  },
              (error: string) => {
                setVisible(false);
                show(error, {type: 'error'});
              },
              () => {
                setVisible(false);
              },
            );
          },
          () => {
            setVisible(false);
          },
        );
      },
    );
  };

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
            onQuantityChange={(id, newQuantity, type) => handleQuantityChange(id, type, newQuantity)}
            onRemove={handleRemove}
          />
        ))}
      </ScrollView>
      <LoadingModal isVisible={visible} />
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
