import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleComponent } from '../../utiles/styles'
import HorizontalFlatList from '../../component/HorizontalFlatList';
import Vector from '../../assets/svg/Vector.svg';
import { Color } from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import MyOrderItem from '../../component/ProfileComponent/MyOrderItem';
import BarCodeModal from '../../component/ProfileComponent/BarCodeModal';
export default function MyORderScreen() {
    const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
        <ScrollView>
        <CustomHeader showBack={true} title="My Orders" />
        <MyOrderItem />
         {/* <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>
      <Vector fill={Color.black}/>
      <Text style={[Styles.h5_Bold,{marginTop:'5%'}]}>You don’t have any orders yet!</Text>
      <Text style={[Styles.body_Regular,Styles.textAlign,{width:'80%'}]}>Once you place an order
      it will appear here</Text>
      </View> */}
      <View style={[Styles.alignSelf,{width:'93%',marginTop:'8%'}]}>
      <Text style={[Styles.h3_Bold,{marginLeft:'2%'}]}>Recommendations</Text>
      <HorizontalFlatList />
      </View>
      <BarCodeModal isVisible={false} onClose={()=>{}} />
      </ScrollView>
    </View>
  )
}