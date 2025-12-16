import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleComponent} from '../../utiles/styles';
import TextInputComponent from '../../component/TextInputComponent';
import TextView from '../../component/TextView';
import {SigninLogic} from '../../logic/SigninLogic';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../../component/BottomCard';
import {Language} from '../../utiles/Language/i18n';
import LogoComponent from '../../component/LogoComponent';
import Lock from '../../assets/svg/Password.svg';
import Email from '../../assets/svg/Email.svg';
import Gmail from '../../assets/svg/gmail.svg';
import Apple from '../../assets/svg/apple.svg';
import AuthLogo from '../../component/AuthLogo';

export default function SigninScreen() {
  const {Styles} = StyleComponent();
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    onSubmitForgetPass,
    onSubmitSignUp,
    loading,
    showPass,
    setShowPass,
    onSubmitGoogle,
    onSubmitApple,
  } = SigninLogic();
  return (
    <View style={Styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
        <LogoComponent style={styles.logoComponentStyle} />
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
                placeholder={Language.Password_Placeholder}
                handlePasswordIconClick={() => setShowPass(!showPass)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                leftIcon={<Lock width={25} height={25} />}
                showPass={showPass}
                rightIcon={true}
              />
            )}
          />
        </View>
        <TouchableOpacity onPress={onSubmitForgetPass}>
          <Text
            style={[Styles.title_Regular, {marginLeft: '5%', marginTop: '5%'}]}>
            {Language.ForgetPass}
          </Text>
        </TouchableOpacity>
        <BottomCardComponent
          title={Language.singIn}
          onHandler={handleSubmit(onSubmit)}
          style={styles.buttonComponent}
          loading={loading}
          disabled={loading}
        />
        <View style={styles.orSignUpWithContainer}>
          <View style={styles.lineStyle} />
          <TextView
            title={Language.Singin_With}
            color={Color.black}
            style={[Styles.title_Regular]}
          />
          <View style={styles.lineStyle} />
        </View>

        <View style={[styles.socialLoginButtonsContainer, Styles.alignSelf]}>
          <AuthLogo onHandler={() => onSubmitGoogle()}>
            <Gmail />
          </AuthLogo>
          {Platform.OS === 'ios' && (
            <AuthLogo onHandler={() => onSubmitApple()}>
              <Apple />
            </AuthLogo>
          )}
        </View>
        <View style={styles.alreadyHaveAccountContainer}>
          <TextView
            title={'Don’t have an account?'}
            color={Color.black}
            style={[Styles.title_Regular]}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={onSubmitSignUp}>
            <TextView
              title={Language.singUp}
              color={Color.primary}
              style={[Styles.title_Regular, styles.signInText]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: '5%',
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
    marginTop: '15%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signInText: {
    marginLeft: 10,
  },
  socialLoginButtonsContainer: {
    width: '60%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  validationFeedbackContainer: {
    marginLeft: '5%',
    marginTop: 10,
  },
  scroll: {flex: 1},
  scrollContent: {paddingBottom: 80},
});
