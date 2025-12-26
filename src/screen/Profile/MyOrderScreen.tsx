
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';

import React, {useCallback, useEffect, useState} from 'react';

import {StyleComponent} from '../../utiles/styles';

import HorizontalFlatList from '../../component/HorizontalFlatList';

import {Color} from '../../utiles/color';

import CustomHeader from '../../navigation/CustomHeader';

import MyOrderItem from '../../component/ProfileComponent/MyOrderItem';

import useRecommendedStore from '../../zustland/recommendedStore';

import {getHomeRecommendedModel} from '../../model/Home/HomeAdvertising';

import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';

import useAuthStore from '../../zustland/AuthStore';

import {getOrderHistoryDetailModel} from '../../model/Setting/SettingModel';

import {useNavigation} from '@react-navigation/native';

import Vector from '../../assets/svg/Vector.svg';


export default function MyORderScreen(route: any) {

  const {Styles, Height} = StyleComponent();

  const navigation = useNavigation<any>();

  const {id} = route?.route?.params;

  const {recommended, setRecommended} = useRecommendedStore();

  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const [orderHistoryDetail, setOrderHistoryDetail] = useState([]);





  const getHomeRecommended = useCallback(() => {

    getHomeRecommendedModel(

      token,

      data => {

        const items = Array.isArray(data?.results) ? data.results : [];

        setRecommended(items);

      },

      () => {

        refreshTokenModel(refreshToken, tokens => {

          setToken(tokens.access);

          setRefreshToken(tokens.refresh);

          getHomeRecommendedModel(

            tokens.access,

            data => {

              const items = Array.isArray(data?.results) ? data.results : [];

              setRecommended(items);

            },

            err => console.log('error', err),

          );

        });

      },

    );

  }, [

    refreshToken,

    setRecommended,

    setRefreshToken,

    setToken,

    token,

  ]);





  const onSubmitDetail = useCallback(

    (value: any) => {

      setIsLoading(true);

      getOrderHistoryDetailModel(

        token,

        value,

        data => {

          setOrderHistoryDetail(data.products);

          setIsLoading(false);

        },

        () => {

          refreshTokenModel(refreshToken, tokens => {

            setToken(tokens.access);

            setRefreshToken(tokens.refresh);

            getOrderHistoryDetailModel(

              tokens.access,

              value,

              data => {

                setOrderHistoryDetail(data.products);

                setIsLoading(false);

              },

              err => console.log('error', err),

            );

          });

        },

      );

    },

    [refreshToken, setRefreshToken, setToken, token],

  );



  useEffect(() => {

    onSubmitDetail(id);

    getHomeRecommended();

  }, [getHomeRecommended, id, onSubmitDetail]);



  // Refresh both product and recommended

  const refreshAll = useCallback(() => {

    getHomeRecommended();

  }, [getHomeRecommended]);



  return (

    <View style={Styles.container}>

      <ScrollView>

        <CustomHeader showBack={true} title="My Orders" />

        {isLoading ? (

          <ActivityIndicator

            size="large"

            color={Color.primary}

            style={{marginTop: Height / 3}}

          />

        ) : (

          <>
          {orderHistoryDetail.length > 0 ? (
            <MyOrderItem data={orderHistoryDetail} />
          ) : (
            <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>

            <Vector fill={Color.black}/>
      
            <Text style={[Styles.h5_Bold,{marginTop:'5%'}]}>You don’t have any orders yet!</Text>
      
            <Text style={[Styles.body_Regular,Styles.textAlign,{width:'80%'}]}>Once you place an order
      
            it will appear here</Text>
      
            </View>
          )}
            <HorizontalFlatList
              callback={e =>

                navigation.navigate('CatalogScreen', {

                  screen: 'CatalogDetail',

                  params: {product: e, fromSetting: true},

                })

              }

              products={recommended}

              onFavoriteToggled={(_id: string, _isFavorite: boolean) =>

                refreshAll()

              }

            />

          </>

        )}



      {/* <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>

      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>Recommendations</Text>

      <HorizontalFlatList />

      </View>

      <BarCodeModal isVisible={false} onClose={()=>{}} /> */}



      </ScrollView>

    </View>

  );
}
