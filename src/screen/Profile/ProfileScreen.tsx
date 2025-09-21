import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import SingInProfile from '../../component/ProfileComponent/SingInProfile';
import Menu from '../../component/ProfileComponent/Menu';
import BarcodeProfile from '../../component/ProfileComponent/BarcodeProfile';
import MyOrderProfile from '../../component/ProfileComponent/MyOrderProfile';
import StatusProfile from '../../component/ProfileComponent/StatusProfile';
import AwardsProfile from '../../component/ProfileComponent/AwardsProfile';
import ProfileLogix from '../../Logic/Profile/ProfileLogix';
import { BottomSheet } from '../../component/BottomSheet';
import HistoryItemProfile from '../../component/ProfileComponent/HistoryItemProfile';
export default function ProfileScreen() {
  const {Styles} = StyleComponent();
  const {onHandlerShowHistory,onSubmitMyOrder} = ProfileLogix();
  return (
    <View style={[Styles.container]}>
      <ScrollView>
      {/* <CustomHeader showBack={true} title="Profile" /> */}
      {/* <SingInProfile /> */}
      <Menu
        onHandler={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <BarcodeProfile />
      <MyOrderProfile onHandler={onSubmitMyOrder} />
      <StatusProfile />
      <AwardsProfile onHandlerShowHistory={onHandlerShowHistory} />
      <BottomSheet modalVisible={false} height={500} onClose={()=>console.log()}>
        <Text style={[Styles.h5_Medium,Styles.textAlign,{marginTop:'2%'}]}>Points History</Text>
        <HistoryItemProfile />
      </BottomSheet>
      </ScrollView>
    </View>
  );
}
