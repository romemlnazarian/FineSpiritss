import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React, {Fragment} from 'react';
import SettingLogic from '../../logic/Setting/SettingLogic';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Menu from '../../component/ProfileComponent/Menu';
import Arrow from 'react-native-vector-icons/MaterialIcons';

import Iocn from 'react-native-vector-icons/Ionicons';
import List from '../../assets/svg/List.svg';
import Support from '../../assets/svg/Support.svg';
import Logout from 'react-native-vector-icons/AntDesign';
import {BottomSheet} from '../../component/BottomSheet';
import Plus from 'react-native-vector-icons/Feather';
import LogOutComponent from '../../component/LogOutComponent';
import Wrench from '../../assets/svg/Wrench.svg';
import Edit from '../../assets/svg/Edit.svg';
import { useNavigation } from '@react-navigation/native';
import {Language} from '../../utiles/Language/i18n';
import { Switch } from 'react-native-switch';
export default function SettingScreen() {
  const navigation = useNavigation();
  const {Styles} = StyleComponent();
  const {
    onSubmit,
    modalVisible,
    setModalVisible,
    onSubmitAddress,
    profile,
    logOutModalVisible,
    setLogOutModalVisible,
    onSubmitLogout,
    address,
    isEnabled,
    toggleSwitch,
  } = SettingLogic();

  const data = [
    {
      id: 1,
      key: 'shipping_address',
      title: Language.setting_shipping_address,
      icon: <Iocn name="location-outline" size={25} color={Color.black} />,
    },
    {
      id: 2,
      key: 'order_history',
      title: Language.setting_order_history,
      icon: <List />,
    },
    {
      id: 3,
      key: 'support_service',
      title: Language.setting_support_service,
      icon: <Support />,
    },
  ];
  const dataTwo = [
    {
      id: 1,
      key: 'settings',
      title: Language.setting_settings,
      icon: <Wrench />,
    },
    {
      id: 2,
      key: 'privacy_policy',
      title: Language.setting_privacy_policy,
      icon: <Iocn name="shield-outline" size={24} color={Color.black} />,
    },
  ];

  return (
    <View style={[Styles.container]}>
      <View style={{marginTop:Platform.OS === 'android' ? '5%' : '10%'}} />
      <Menu
        onHandler={() => navigation.goBack()}
        title={`${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`}
        style={styles.menu}
        icon={<Arrow name="arrow-back-ios" size={20} color={Color.black}/>}
      />
      {/* <TouchableOpacity onPress={onSubmitPayment} style={styles.cardRow}>
        <View style={styles.rowCenter}>
          <Wallet />
          <View style={styles.walletTextBlock}>
            <Text style={Styles.title_Medium}>Payment methods</Text>
            <Text style={[Styles.subtitle_Regular, styles.lightGrayText]}>
              Visa .... 0312
            </Text>
          </View>
        </View>

        <View style={styles.rowGap10Center}>
          <Visa />
          <Arrow name="arrow-forward-ios" size={20} color={Color.black} />
        </View>
      </TouchableOpacity> */}
      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => onSubmit(item.key)}
              activeOpacity={0.5}
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <Text style={Styles.title_Medium}>{item.id === 1 && address.street !== ''?address?.street:item.title}</Text>
              {item.id === 1 ? (
                address.street !== '' ? (
                  <View style={styles.iconRight}>
                    <Edit />
                  </View>
                ) : (
                  <Arrow
                    name="arrow-forward-ios"
                    size={20}
                    color={Color.black}
                    style={styles.iconRight}
                  />
                )
              ) : (
                <Arrow
                  name="arrow-forward-ios"
                  size={20}
                  color={Color.black}
                  style={styles.iconRight}
                />
              )}
            </TouchableOpacity>
            {item.id !== 3 && <View style={styles.separator} />}
          </Fragment>
        ))}
      </View>
      <View style={styles.section}>
        {dataTwo.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => onSubmit(item.key)}
              activeOpacity={0.5}
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <Text style={Styles.title_Medium}>{item.title}</Text>
              <Arrow
                  name="arrow-forward-ios"
                  size={20}
                  color={Color.black}
                  style={styles.iconRight}
                />
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
      {/* <View style={styles.switchContainer}>
        <Text style={[styles.title,Styles.title_Medium]}>{Language.language}</Text>
        <Switch
          value={isEnabled}
          onValueChange={val => toggleSwitch(val)}
          activeText={'PL'}
          inActiveText={'EN'}
          circleSize={16}
          barHeight={23}
          circleBorderWidth={0}
          backgroundActive={Color.primary}
          backgroundInactive={Color.gray}
          circleActiveColor={Color.white}
          circleInActiveColor={Color.white}
          switchLeftPx={5}
          switchRightPx={5}
          switchWidthMultiplier={3.2}
        />
      </View> */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.logoutButton}
        onPress={() => setLogOutModalVisible(true)}>
        <Logout name="logout" size={22} color={Color.black}/>
        <Text style={Styles.title_Medium}>{Language.Logout}</Text>
        <Arrow
          name="arrow-forward-ios"
          size={20}
          color={Color.black}
          style={styles.iconRight10}
        />
      </TouchableOpacity>
      <BottomSheet
        modalVisible={modalVisible}
        height={200}
        onClose={() => setModalVisible(false)}>
        <View style={styles.bottomSheetContainer}>
          <Text style={Styles.h5_Medium}>{Language.My_Addresses}</Text>
          <TouchableOpacity
            onPress={() => onSubmitAddress('BillingAddress')}
            style={styles.bottomSheetAction}>
            <Plus name="plus-circle" size={20} color={Color.black} />
            <Text style={Styles.body_Regular}>{Language.Billing_address}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmitAddress('ShippingAddress')}
            style={styles.bottomSheetAction}>
            <Plus name="plus-circle" size={20} color={Color.black} />
            <Text style={Styles.body_Regular}>{Language.Add_Shipping_Address}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <LogOutComponent
        onClose={() => onSubmitLogout()}
        setLogOutModalVisible={() => setLogOutModalVisible(false)}
        logOutModalVisible={logOutModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginTop: '5%',
    height: 50,
  },
  cardRow: {
    width: '93%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
    backgroundColor: Color.white,
    padding: 10,
    borderRadius: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletTextBlock: {
    gap: 5,
    marginLeft: '5%',
  },
  rowGap10Center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  section: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.white,
    padding: 10,
    borderRadius: 10,
    gap: 20,
    paddingVertical: 15,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
  },
  iconRight10: {
    position: 'absolute',
    right: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Color.lineGray,
    width: '100%',
  },
  lightGrayText: {
    color: Color.lightGray,
  },
  logoutButton: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Color.lightGray,
    padding: 10,
    borderRadius: 10,
    paddingVertical: 15,
  },
  bottomSheetContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  bottomSheetAction: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginLeft: '10%',
    marginTop: '5%',
  },
  title: {
    color: Color.black,
  },
  switchContainer: {
    width: '93%',
    marginTop: '5%',
    borderColor: Color.gray,
    backgroundColor: Color.white,
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
