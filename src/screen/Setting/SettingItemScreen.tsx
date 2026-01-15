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
import {BottomModal} from '../../component/BottomModal';
import SettingItemLogic from '../../logic/Setting/SettingItemLogic';
import EmailVerifySetting from '../../component/SettingComponent/EmailVerifySetting';
import CheckEmailSetting from '../../component/SettingComponent/CheckEmailSetting';
import SuccessComponent from '../../component/SuccessComponent';
import ChangePasswordSetting from '../../component/SettingComponent/ChangePasswordSetting';
import UpdateFullName from './UpdateFullName';
import DatePicker from 'react-native-date-picker';

export default function SettingItemScreen() {
  const {Styles} = StyleComponent();
  const {
    modalVisible,
    setModalVisible,
    checkEmail,
    onSubmit,
    onSubmitDeleteAccount,
    name,
    dataProfile,
    date,
    setDate,
    open,
    setOpen,
    formatDate,
    email,
    callBackEmailVerify,
    callBackChangePassword
  } = SettingItemLogic();
  const data = [
    {
      id: 1,
      title: 'Name Surname',
      discription: dataProfile?.full_name,
      icon: <User />,
      key: 'fullName',
    },

    {
      id: 2,
      title: 'Email Address',
      discription: dataProfile?.email,
      icon: <Email />,
      key: 'emailAddress',
    },
    {
      id: 3,
      title: 'Change Password',
      icon: <Password />,
      key: 'changePassword',
    },
    {
      id: 4,
      title: 'Birth date',
      discription: dataProfile?.birthdate,
      icon: <Birthday />,
      key: 'birthDate',
    },
  ];

  return (
    <View style={[Styles.container, {backgroundColor: Color.white}]}>
      <CustomHeader
        showBack={true}
        subTitle="Settings"
        style={{backgroundColor: Color.white}}
      />


      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() => onSubmit(item.key)}
              activeOpacity={0.5}
              key={item.id}
              style={styles.rowGap10Center}>
              {item.icon}
              <View style={styles.itemTextContainer}>
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
              {item.id === 3 || item.id === 4 ? (
                <Arrow
                  name="arrow-forward-ios"
                  size={20}
                  color={Color.black}
                  style={styles.arrow}
                />
              ) : null}
              <View style={styles.absoluteRight}>
                {item.id === 2 || item.id === 1 ? <Edit /> : null}
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

      <BottomModal
        modalVisible={modalVisible}
        height={name === 'changePassword' ? 480 : name === 'emailAddress' ? 380 : 350}
        onClose={() => setModalVisible(false)}>
        {name === 'fullName' ? (
          <UpdateFullName callBack={() => setModalVisible(false)} />
        ) : name === 'changePassword' ? (
          <ChangePasswordSetting onCallBack={callBackChangePassword} />
        ) : name === 'emailAddress' ? (
          <EmailVerifySetting callBack={checkEmail} />
        ) : name === 'emailVerify' ? (
          <CheckEmailSetting email={email} callBack={callBackEmailVerify} />
        ) : name === 'congratulationsEmail' ? (
          <SuccessComponent
            title="Congratulations!"
            discription="You have succesfully Changed Email Address"
            buttomVisible={false}
            styleDiscription={{width: '60%'}}
            onHandler={() => {}}
          />) : name === 'congratulationsPassword' ?
          <SuccessComponent
          title="Congratulations!"
          discription="You have succesfully Changed Password"
          buttomVisible={false}
          styleDiscription={{width: '60%'}}
          onHandler={() => {}}
        />:null
        }
      </BottomModal>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={pickedDate => {
          setOpen(false);
          setDate(pickedDate);
          formatDate(pickedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemTextContainer: {gap: 4},
  absoluteRight: {position: 'absolute', right: 10},
  arrow: {position: 'absolute', right: 10, color: Color.gray},
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
