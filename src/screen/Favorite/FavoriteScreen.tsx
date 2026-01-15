import {View, Text, ScrollView,ActivityIndicator} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Gllass from '../../assets/svg/gllass.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import CustomHeader from '../../navigation/CustomHeader';
import FavoriteLogic from '../../logic/Favorite/FavoriteLogic';
import FavoriteItem from '../../component/FavoriteComponent/FavoriteItem';
import { useNavigation } from '@react-navigation/native';
export default function FavoriteScreen() {
  const {Styles} = StyleComponent();
  const {favoriteProducts, loading,recommended, onSubmit} = FavoriteLogic();
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
      <CustomHeader showBack={true} subTitle="Wishlist" />
      <ScrollView showsVerticalScrollIndicator={false}>
      { favoriteProducts.length === 0 ? 
      
      <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Gllass width={100} height={100} />
      <Text style={[Styles.h4_Bold,{textAlign:'center',width:'60%'}]}>There is no drinks in wishlist</Text>
      <Text style={[Styles.body_Regular,Styles.textAlign,{width:'80%',margintop:'2%'}]}>
      Once you add items from a store,
      your wishlist will appear here
      </Text>
      </View>
      :(
        <>
          <FavoriteItem favoriteProducts={favoriteProducts} onReload={onSubmit} />
        </>
        )
        }
     <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h4_Bold,{marginLeft:'2%'}]}>Recommendations</Text>
      <HorizontalFlatList
        callback={(item: any) => navigation.navigate('CatalogScreen',{screen: 'CatalogDetail' ,params: {product: item}})}
      products={recommended} onFavoriteToggled={(id:string, isFavorite:boolean)=>onSubmit(id, isFavorite)} />
      </View>
       </ScrollView>
    </View>
  );
}

