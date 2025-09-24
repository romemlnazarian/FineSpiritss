import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import SettingLogic from '../../Logic/Setting/SettingLogic';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Menu from '../../component/ProfileComponent/Menu';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Wallet from '../../assets/svg/wallet.svg';
import Visa from '../../assets/svg/visa_logo.svg';
import Iocn from 'react-native-vector-icons/Ionicons';
import List from '../../assets/svg/List.svg';
import Support from '../../assets/svg/Support.svg';
import Wrench from 'react-native-vector-icons/SimpleLineIcons';
import Logout from 'react-native-vector-icons/AntDesign';
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
  const {onSubmitPayment,onSubmit} = SettingLogic();
  return (
    <View style={[Styles.container]}>
      <Menu
        onHandler={() => {}}
        title="Stanisław Piotrowski"
        icon={<Arrow name="arrow-back-ios" size={20} color={Color.black} />}
        style={styles.menu}
      />
      <TouchableOpacity 
       onPress={onSubmitPayment}
      style={styles.cardRow}>
        <View style={styles.rowCenter}>
          <Wallet />
          <View style={styles.walletTextBlock}>
            <Text style={Styles.title_Medium}>Payment methods</Text>
            <Text style={[Styles.subtitle_Regular, {color: Color.lightGray}]}>
              Visa .... 0312
            </Text>
          </View>
        </View>

        <View style={styles.rowGap10Center}>
          <Visa />
          <Arrow name="arrow-forward-ios" size={20} color={Color.black} />
        </View>
      </TouchableOpacity>
      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
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
            {item.id !== 3 && (
              <View style={styles.separator} />
            )}
          </Fragment>
        ))}
      </View>
      <View style={styles.section}>
        {dataTwo.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
            onPress={()=>onSubmit(item.title)}
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
        style={styles.logoutButton}>
        <Logout name="logout" size={22} />
        <Text style={Styles.title_Regular}>Logout</Text>
        <Arrow
          name="arrow-forward-ios"
          size={20}
          color={Color.black}
          style={styles.iconRight10}
        />
      </TouchableOpacity>
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
});
