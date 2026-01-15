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
import {ChangePasswordSettingLogic} from '../../logic/Setting/ChangePasswordSettingLogic';
import Lock from '../../assets/svg/Password.svg';
// import {Language} from '../../utiles/Language/i18n';
import BottomCardComponent from '../BottomCard';
import {Color} from '../../utiles/color';
export default function ChangePasswordSetting({onCallBack}: {onCallBack: () => void}) {
  const {Styles} = StyleComponent();
  const {
    control,
    errors,
    onHandleShowPass,
    showPass,
    showOldPass,
    showRepeatPass,
    onSubmit,
    isAllFilled,
    isLoading,
    isValid,
    handleSubmit,
  } = ChangePasswordSettingLogic( onCallBack );

  const isSaveDisabled = isLoading || !isAllFilled || !isValid;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[Styles.alignCenter, styles.container]}>
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
              errorMessage={errors.oldpassword?.message}
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
          disabled={isSaveDisabled}
          loading={isLoading}
          onHandler={handleSubmit(onSubmit)}
          style={[styles.saveButton, isSaveDisabled ? styles.saveButtonDisabled : null]}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {marginTop: '5%'},
  textInputContainer: {
    marginTop: '5%',
  },
  saveButton: {
    marginTop: '5%',
  },
  saveButtonDisabled: {
    backgroundColor: Color.lightBlack,
    borderColor: Color.lightBlack,
  },
});
