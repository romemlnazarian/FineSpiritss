import {View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import SingInProfile from '../../component/ProfileComponent/SingInProfile';

export default function ProfileScreen() {
  const {Styles} = StyleComponent();
  return (
    <View style={[Styles.container]}>
      <CustomHeader showBack={true} title="Profile" />
      <SingInProfile />
    </View>
  );
}
