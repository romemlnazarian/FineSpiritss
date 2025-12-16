import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
const data = [
  {
    id: 1,
    title: 'My addresses',
    icon: <Iocn name="location-outline" size={25} color={Color.black} />,
  },
  {
    id: 2,
    title: 'Order History',
    icon: <List />,
  },
  {
    id: 3,
    title: 'Support service',
    icon: <Support />,
  },
];
const dataTwo = [
  {
    id: 1,
    title: 'Setting',
    icon: <Wrench name="wrench" size={22} />,
  },
  {
    id: 2,
    title: 'Privacy Policy',
    icon: <Iocn name="shield-outline" size={24} color={Color.black} />,
  },
];
export default function SettingScreen() {
  const {Styles} = StyleComponent();
  const {
    onSubmit,
    modalVisible,
    setModalVisible,
    onSubmitAddress,
    profile,
    logOutModalVisible,
    setLogOutModalVisible,
    onSubmitLogout
  } = SettingLogic();
  return (
    <View style={[Styles.container]}>
      <Menu
        onHandler={() => { } }
        title={`${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`}
        style={styles.menu} icon={undefined}/>
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
              onPress={() => onSubmit(item.title)}
              activeOpacity={0.5}
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <Text style={Styles.title_Regular}>{item.title}</Text>
              <Arrow
                name="arrow-forward-ios"
                size={20}
                color={Color.black}
                style={styles.iconRight}
              />
            </TouchableOpacity>
            {item.id !== 3 && <View style={styles.separator} />}
          </Fragment>
        ))}
      </View>
      <View style={styles.section}>
        {dataTwo.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => onSubmit(item.title)}
              activeOpacity={0.5}
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <Text style={Styles.title_Regular}>{item.title}</Text>
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
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.logoutButton}
        onPress={() => setLogOutModalVisible(true)}>
        <Logout name="logout" size={22} />
        <Text style={Styles.title_Regular}>Logout</Text>
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
          <Text style={Styles.h5_Medium}>My Addresses</Text>
          <TouchableOpacity
            onPress={() => onSubmitAddress('BillingAddress')}
            style={styles.bottomSheetAction}>
            <Plus name="plus-circle" size={20} color={Color.black} />
            <Text style={Styles.body_Regular}>Billing address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmitAddress('ShippingAddress')}
            style={styles.bottomSheetAction}>
            <Plus name="plus-circle" size={20} color={Color.black} />
            <Text style={Styles.body_Regular}>Add Shipping Address</Text>
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
});
