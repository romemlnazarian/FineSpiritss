import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleComponent} from '../../utiles/styles';
import TextInputComponent from '../../component/TextInputComponent';
import TextView from '../../component/TextView';
import {SignupLogic} from '../../Logic/SignupLogic';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../../component/BottomCard';
import {Language} from '../../utiles/Language/i18n';
import LogoComponent from '../../component/LogoComponent';
import User from '../../assets/svg/User.svg';
import Email from '../../assets/svg/Email.svg';
import Gmail from '../../assets/svg/gmail.svg';
import Apple from '../../assets/svg/apple.svg';
import Facebook from '../../assets/svg/facebook.svg';
import AuthLogo from '../../component/AuthLogo';

export default function SignupScreen() {
  const {Styles} = StyleComponent();
  const {control, handleSubmit, errors, onSubmit} = SignupLogic();
  return (
    <View style={Styles.container}>
      <LogoComponent style={styles.logoComponentStyle} />
      <View style={styles.inputContainer}>
        <TextView
          title={Language.Name_Surname}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="username"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder="Type your Name and Surname"
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.username?.message}
              leftIcon={<User width={25} height={25} />}
              showPass={true}
            />
          )}
        />
      </View>

      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.Email}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.Email_Placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              leftIcon={<Email width={25} height={25} />}
              showPass={true}
            />
          )}
        />
      </View>
      <BottomCardComponent
        title={Language.singUp}
        onHandler={handleSubmit(onSubmit)}
        style={styles.buttonComponent}
      />
      <View style={styles.orSignUpWithContainer}>
        <View style={styles.lineStyle} />
        <TextView
          title="Or sign up with"
          color={Color.black}
          style={[Styles.title_Regular]}
        />
        <View style={styles.lineStyle} />
      </View>

      <View style={styles.alreadyHaveAccountContainer}>
        <TextView
          title="Already have an account?"
          color={Color.black}
          style={[Styles.title_Regular]}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => console.log()}>
          <TextView
            title={Language.singIn}
            color={Color.primary}
            style={[Styles.title_Regular, styles.signInText]}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.socialLoginButtonsContainer, Styles.justifyBetween, Styles.alignSelf]}>
        <AuthLogo onHandler={() => console.log()}>
          <Gmail />
        </AuthLogo>
        <AuthLogo onHandler={() => console.log()}>
          <Apple />
        </AuthLogo>
        <AuthLogo onHandler={() => console.log()}>
          <Facebook />
        </AuthLogo>
      </View>
    </View>
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
    marginTop: '15%',
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
    marginLeft: '5%',
    marginTop: 10,
  },
});
