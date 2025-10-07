import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import Email from '../../assets/svg/Email.svg';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import User from '../../assets/svg/User.svg';
import CustomHeader from '../../navigation/CustomHeader';
import Birthday from '../../assets/svg/Birthday.svg';
import Password from '../../assets/svg/Password.svg';
import Edit from '../../assets/svg/Edit.svg';
import {BottomSheet} from '../../component/BottomSheet';
import SettingItemLogic from '../../logic/Setting/SettingItemLogic';
import EmailVerifySetting from '../../component/SettingComponent/EmailVerifySetting';
import CheckEmailSetting from '../../component/SettingComponent/CheckEmailSetting';
import SuccessComponent from '../../component/SuccessComponent';
import ChangePasswordSetting from '../../component/SettingComponent/ChangePasswordSetting';
const data = [
  {
    id: 1,
    title: 'Name Surname',
    discription: 'Stanisław Piotrowski',
    icon: <User />,
  },
  {
    id: 2,
    title: 'Display Name',
    discription: 'Stanisław',
    icon: <User />,
  },
  {
    id: 3,
    title: 'Email Address',
    discription: 'Stanisław.piotrowski@gmail.com',
    icon: <Email />,
  },
  {
    id: 4,
    title: 'Change Password',
    icon: <Password />,
  },
  {
    id: 5,
    title: 'Birth date',
    discription: '02.02.2003',
    icon: <Birthday />,
  },
];

export default function SettingItemScreen() {
  const {Styles} = StyleComponent();
  const {modalVisible, setModalVisible, checkEmail, onSubmit, name,onSubmitDeleteAccount} =
    SettingItemLogic();
  return (
    <View style={[Styles.container, {backgroundColor: Color.white}]}>
      <CustomHeader showBack={true} title="Setting" />
      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => onSubmit(item.title)}
              activeOpacity={0.5}
              disabled={
                item.id === 3 || item.id === 4 || item.id === 5 ? false : true
              }
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <View style={{gap: 5}}>
                <Text
                  style={[
                    Styles.title_Regular,
                    {color: item.discription ? Color.gray : Color.black},
                  ]}>
                  {item.title}
                </Text>
                {item.discription && (
                  <Text style={[Styles.title_Regular]}>{item.discription}</Text>
                )}
              </View>
              {(item.id === 4 || item.id === 5) && (
                <Arrow
                  name="arrow-forward-ios"
                  size={20}
                  color={Color.black}
                  style={{position: 'absolute', right: 10, color: Color.gray}}
                />
              )}
              <View style={{position: 'absolute', right: 10}}>
                {item.id === 3 && <Edit />}
              </View>
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onSubmitDeleteAccount()}>
        <Text
          style={[
            Styles.title_Regular,
            styles.deleteAccount,
            {color: Color.red},
          ]}>
          Delete Personal Account
        </Text>
      </TouchableOpacity>

      <BottomSheet
        modalVisible={modalVisible}
        height={name === 'Change Password' ? 450 : 350}
        onClose={() => setModalVisible(false)}>
        {name === 'Email Address' ? (
          <CheckEmailSetting />
        ) : name === 'Change Password' ? (
          <ChangePasswordSetting />
        ) : name === 'Check Email' ? (
          <EmailVerifySetting callBack={checkEmail} />
        ) : (
          <SuccessComponent
            title="Congratulations!"
            discription="You have succesfully Changed Email Address"
            buttomVisible={false}
            onHandler={() => {}}
          />
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteAccount: {
    marginLeft: '5%',
  },
  section: {
    width: '98%',
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: Color.white,
    padding: 10,
    borderRadius: 10,
    gap: 20,
    paddingVertical: 15,
  },
  rowGap10Center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 10,
    padding: 10,
    height: 65,
  },
});
