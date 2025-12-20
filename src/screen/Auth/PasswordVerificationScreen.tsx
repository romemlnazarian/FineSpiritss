import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleComponent} from '../../utiles/styles';
import TextInputComponent from '../../component/TextInputComponent';
import TextView from '../../component/TextView';
import {PasswordVerificationLogic} from '../../logic/PasswordVerificationLogic';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../../component/BottomCard';
import {Language} from '../../utiles/Language/i18n';
import LogoComponent from '../../component/LogoComponent';
import Lock from '../../assets/svg/Password.svg';
import Success from '../../assets/svg/success.svg';
import Reject from '../../assets/svg/reject.svg';
import CustomHeader from '../../navigation/CustomHeader';
import {KeboardDismis} from '../../KeyboardDismis/KeboardDIsmisFunction';
import RegisterSuccess from '../../component/RegisterSuccess';
import Video from 'react-native-video';

export default function PasswordVerificationScreen(route: any) {
  const {Styles} = StyleComponent();
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLengthValid,
    hasNumber,
    hasUpperCase,
    getValues,
    onHandleShowPass,
    showPass,
    showRepeatPass,
    loading,
    showVideo,
    ShowSuccess,
    onHandler
  } = PasswordVerificationLogic(route);

  return (
    <>
      {ShowSuccess ? (
        <RegisterSuccess onClick={() => onHandler()} />
      ) : showVideo === true ? (
        <View style={{flex:1}}>
          <Video
            source={require('../../assets/video/tst.mp4')}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets
            onStartShouldSetResponder={KeboardDismis}>
            <CustomHeader showBack={true} />
            <LogoComponent style={styles.logoComponentStyle} />
            {/* <Text style={[Styles.h3_Bold, styles.textStyles,{marginTop:'5%'}]} >
           Please enter your new
           password
          </Text> */}

            <View style={styles.inputContainer}>
              <TextView
                title={Language.Password}
                color={Color.black}
                style={[Styles.title_Regular, styles.textStyles]}
              />
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputComponent
                    containerStyle={styles.textInputContainer}
                    onBlur={onBlur}
                    placeholder={Language.Password}
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
              {/* Password Validation Feedback */}
              {getValues().password.length > 0 &&
                getValues().password !== getValues().repeatpassword && (
                  <View style={styles.validationFeedbackContainer}>
                    <TextView
                      title={`8 to 20 characters`}
                      color={isLengthValid ? Color.green : Color.red}
                      style={[Styles.title_Regular, styles.text]}
                      icon={isLengthValid ? <Success /> : <Reject />}
                    />
                    <TextView
                      title={`At least 1 number`}
                      color={hasNumber ? Color.green : Color.red}
                      style={[Styles.title_Regular, styles.text]}
                      icon={hasNumber ? <Success /> : <Reject />}
                    />
                    <TextView
                      title={`At least 1 upper case letter`}
                      color={hasUpperCase ? Color.green : Color.red}
                      style={[Styles.title_Regular, styles.text]}
                      icon={hasUpperCase ? <Success /> : <Reject />}
                    />
                  </View>
                )}
            </View>

            <View style={styles.inputContainerSmallMargin}>
              <TextView
                title={Language.Repeat_your_password}
                color={Color.black}
                style={[Styles.title_Regular, styles.textStyles]}
              />
              <Controller
                control={control}
                name="repeatpassword"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputComponent
                    containerStyle={styles.textInputContainer}
                    onBlur={onBlur}
                    placeholder={Language.Repeat_your_password}
                    handlePasswordIconClick={() =>
                      onHandleShowPass('repeatpass')
                    }
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
            </View>
            <BottomCardComponent
              title={Language.Next}
              onHandler={handleSubmit(onSubmit)}
              style={styles.buttonComponent}
              loading={loading}
              disabled={loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    textAlign: 'left',
    marginLeft: '5%',
  },
  textBold: {
    fontWeight: 'bold',
  },
  buttonComponent: {
    marginTop: '10%',
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoComponentStyle: {
    marginTop: '5%',
  },
  inputContainer: {
    marginTop: '10%',
  },
  textInputContainer: {
    marginTop: 10,
  },
  inputContainerSmallMargin: {
    marginTop: '5%',
  },
  orSignUpWithContainer: {
    marginTop: '5%',
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineStyle: {
    width: 100,
    height: 1,
    backgroundColor: Color.lightGray,
  },
  alreadyHaveAccountContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signInText: {
    marginLeft: 10,
  },
  socialLoginButtonsContainer: {
    width: '60%',
    marginTop: '5%',
  },
  validationFeedbackContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
  },
});
