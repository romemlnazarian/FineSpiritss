
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
import {Language} from '../../utiles/Language/i18n';


export default function MyORderScreen(route: any) {

  const {Styles, Height} = StyleComponent();


  const {id} = route?.route?.params;


  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const [orderHistoryDetail, setOrderHistoryDetail] = useState([]);









  const onSubmitDetail = useCallback(

    (value: any) => {

      setIsLoading(true);

      getOrderHistoryDetailModel(

        token,

        value,

        data => {
          console.log('order history detail data =>', data);
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

  

  }, [ id, onSubmitDetail]);







  return (

    <View style={Styles.container}>

      <ScrollView>

        <CustomHeader showBack={true} subTitle={Language.profile_my_orders} />

        {isLoading ? (

          <ActivityIndicator

            size="large"

            color={Color.primary}

            style={{marginTop: Height / 3}}

          />

        ) : (
          <MyOrderItem data={orderHistoryDetail} />

          // <>
          // {orderHistoryDetail.length > 0 ? (
          // ) : (
          //   <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>

          //   <Vector fill={Color.black}/>
      
          //   <Text style={[Styles.h5_Bold,{marginTop:'5%'}]}>You don’t have any orders yet!</Text>
      
          //   <Text style={[Styles.body_Regular,Styles.textAlign,{width:'80%'}]}>Once you place an order
      
          //   it will appear here</Text>
      
          //   </View>
          // )}
          //   <HorizontalFlatList
          //     callback={e =>

          //       navigation.navigate('CatalogScreen', {

          //         screen: 'CatalogDetail',

          //         params: {product: e, fromSetting: true},

          //       })

          //     }

          //     products={recommended}

          //     onFavoriteToggled={(_id: string, _isFavorite: boolean) =>

          //       refreshAll()

          //     }

          //   />

          // </>

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
