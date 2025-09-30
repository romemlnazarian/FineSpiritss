import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Controller} from 'react-hook-form';
import TextInputComponent from '../TextInputComponent';
import {ChangePasswordSettingLogic} from '../../Logic/Setting/ChangePasswordSettingLogic';
import Lock from '../../assets/svg/Password.svg';
// import {Language} from '../../utiles/Language/i18n';
import BottomCardComponent from '../BottomCard';
import { Color } from '../../utiles/color';
export default function ChangePasswordSetting() {
  const {Styles} = StyleComponent();
  const {
    control,
    errors,
    handleSubmit,
    onHandleShowPass,
    showPass,
    showOldPass,
    showRepeatPass,
    onSubmit,
    isLengthValid,
    isAllFilled,
  } = ChangePasswordSettingLogic();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[Styles.alignCenter, {marginTop: '5%'}]}>
        <Text style={Styles.h5_Medium}>Change Password</Text>
        <Controller
          control={control}
          name="oldpassword"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={'Old Password'}
              handlePasswordIconClick={() => onHandleShowPass('oldPass')}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              leftIcon={<Lock width={25} height={25} />}
              showPass={showOldPass}
              isPassword={true}
              rightIcon={true}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={'New Password'}
              handlePasswordIconClick={() => onHandleShowPass('pass')}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              leftIcon={<Lock width={25} height={25} />}
              showPass={showPass}
              isPassword={true}
              rightIcon={true}
            />
          )}
        />
        <Controller
          control={control}
          name="repeatpassword"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={'New Password Again'}
              handlePasswordIconClick={() => onHandleShowPass('repeatPass')}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.repeatpassword?.message}
              leftIcon={<Lock width={25} height={25} />}
              showPass={showRepeatPass}
              isPassword={true}
              rightIcon={true}
            />
          )}
        />
        <BottomCardComponent
          title={'Save'}
          disabled={!isAllFilled}
          onHandler={handleSubmit(onSubmit)}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: '5%',
  },
  saveButton: {
    marginTop: '5%',
    backgroundColor:Color.primary
  },
});
