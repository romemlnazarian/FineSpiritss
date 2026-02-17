import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import AddPaymentSetting from '../../component/SettingComponent/AddPaymentSetting';
import Visa from '../../assets/svg/visa_logo.svg';
import Google from '../../assets/svg/google.svg';
import Money from '../../assets/svg/money.svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Apple from '../../assets/svg/appleIcon.svg';
import AddPaymentLogic from '../../logic/Setting/AddPaymentLogic';
import { BottomSheet } from '../../component/BottomSheet';
import AddCardSetting from '../../component/SettingComponent/AddCardSetting';
import {Language} from '../../utiles/Language/i18n';
const data = [
  {
    id: 1,
    title: Language.setting_cash,
    check: true,
    icon: <Money />,
  },
  {
    id: 2,
    title: Language.setting_google_pay,
    check: false,
    icon: <Google />,
  },
  {
    id: 3,
    title: Language.setting_apple_pay,
    check: false,
    icon: <Apple/>
  },
];
export default function PaymentScreen() {
  const {modalVisible,onSubmitAddPayment} = AddPaymentLogic();

  
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} title={Language.setting_payment_methods_title} />
      <View style={styles.card}>
        <Text style={[Styles.title_Medium, styles.cardTitle]}>{Language.setting_with_card}</Text>
        <AddPaymentSetting
          logo={<Visa />}
          title={'Visa ... 0312'}
          check={true}
          onPress={() => {}}
        />
        <AddPaymentSetting
          logo={<Visa />}
          title={'Visa ... 0312'}
          check={false}
          onPress={() => {}}
        />
        <View style={styles.sectionDivider} />
        <Text
          style={[Styles.title_Medium, styles.cardTitle, styles.mt5]}>
          {Language.setting_other_way}
        </Text>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.5}
              onPress={() => console.log()}>
              <View style={[styles.logoBox]}>{item.icon}
                {item.id !== 1 && <Text style={Styles.title_Regular}>{Language.setting_pay}</Text>}
              </View>
              <Text style={Styles.title_Medium}>{item.title}</Text>
              <View style={[styles.checkBadge, styles.checkBadgeOutline]}>
                <Icon name="check" size={18} color={Color.white} />
              </View>
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
      <BottomSheet modalVisible={modalVisible} height={600} onClose={()=>onSubmitAddPayment()}>
       <AddCardSetting/>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.white,
    padding: 10,
    borderRadius: 10,
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  cardTitle: {
    marginLeft: '2%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: '5%',
  },
  logoBox: {
    width: 60,
    height: 36,
    borderWidth: 2,
    borderColor: Color.black,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  sectionDivider: {
    width: '70%',
    height: 1,
    alignSelf: 'flex-end',
    marginTop: '5%',
    backgroundColor: Color.lineGray,
    marginRight: '5%',
  },
  mt5: {
    marginTop: '5%'
  },
  checkBadgeOutline: {
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.gray,
  }

});
