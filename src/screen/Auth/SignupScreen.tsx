import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
  Linking,
} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleComponent} from '../../utiles/styles';
import TextInputComponent from '../../component/TextInputComponent';
import TextView from '../../component/TextView';
import {SignupLogic} from '../../logic/SignupLogic';
import {Color} from '../../utiles/color';
import BottomCardComponent from '../../component/BottomCard';
import {Language} from '../../utiles/Language/i18n';
import LogoComponent from '../../component/LogoComponent';
import User from '../../assets/svg/User.svg';
import Email from '../../assets/svg/Email.svg';
import Gmail from '../../assets/svg/gmail.svg';
import Apple from '../../assets/svg/apple.svg';
import AuthLogo from '../../component/AuthLogo';
import Calender from '../../assets/svg/Calendar.svg';
import DatePicker from 'react-native-date-picker';
import useLocalizationStore from '../../zustland/localizationStore';

const TERMS_URL = 'https://finespirits.pl/terms-and-conditions/';

export default function SignupScreen() {
  const {Styles} = StyleComponent();
  const language = useLocalizationStore(state => state.language);
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    date,
    setDate,
    open,
    setOpen,
    loading,
    selectedDate,
    formatDate,
    onSubmitSignIn,
    onSubmitGoogle,
    onSubmitApple,
    showPass,
    setShowPass,
    privacyAgreed,
    setPrivacyAgreed,
  } = SignupLogic();

  return (
    <View style={Styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
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
                placeholder={Language.Name_Surname_Placeholder}
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
                handlePasswordIconClick={() => setShowPass(!showPass)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                leftIcon={<Email width={25} height={25} />}
                showPass={true}
              />
            )}
          />
        </View>


        <View style={styles.inputContainerSmallMargin}>
          <TextView
            title={Language.Date_of_birth}
            color={Color.black}
            style={[Styles.title_Regular, styles.textStyles]}
          />
          <TouchableOpacity
            onPress={() => setOpen(true)}
            activeOpacity={0.5}
            style={styles.dateContainer}>
            <Calender width={25} height={25} />
            <Text style={[Styles.subtitle_Medium, styles.dobPlaceholderText]}>
              {selectedDate === '' ? Language.DOB_Placeholder : selectedDate}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPrivacyAgreed(prev => !prev)}
          style={styles.privacyRow}>
          <View
            style={[styles.checkbox, privacyAgreed && styles.checkboxSelected]}>
            {privacyAgreed ? <Text style={styles.checkboxMark}>✓</Text> : null}
          </View>
          <Text style={[Styles.title_Regular, styles.privacyText]}>
            {Language.signup_agree_prefix}
            <Text
              style={styles.privacyLink}
              onPress={() => Linking.openURL(TERMS_URL)}>
              {Language.signup_terms_conditions}
            </Text>
          </Text>
        </TouchableOpacity>

        <BottomCardComponent
          title={Language.singUp}
          onHandler={handleSubmit(onSubmit)}
          style={[
            styles.buttonComponent,
            !privacyAgreed && styles.buttonDisabled,
          ]}
          textStyle={!privacyAgreed ? styles.buttonDisabledText : undefined}
          loading={loading}
          disabled={loading || !privacyAgreed}
        />
        <View style={styles.orSignUpWithContainer}>
          <View style={styles.lineStyle} />
          <TextView
            title={Language.Singup_With}
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
        <TouchableOpacity
          onPress={() => console.log()}
          style={styles.businessClientContainer}>
          <Text style={Styles.title_Regular}>{Language.Business_client}</Text>
        </TouchableOpacity>
        <View style={styles.alreadyHaveAccountContainer}>
          <TextView
            title={Language.Acount_title}
            color={Color.black}
            style={[Styles.title_Regular]}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={onSubmitSignIn}>
            <TextView
              title={Language.singIn}
              color={Color.primary}
              style={[Styles.title_Medium, styles.signInText]}
            />
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          locale={language === 'pl' ? 'pl' : 'en'}
          title={Language.Date_of_birth}
          confirmText={Language.Done}
          cancelText={Language.Cancel}
          onConfirm={pickedDate => {
            setOpen(false);
            setDate(pickedDate);
            formatDate(pickedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    textAlign: 'left',
    marginLeft: '5%',
  },
  businessClientContainer: {
    marginTop: '5%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.black,
  },
  buttonComponent: {
    marginTop: '8%',
  },
  buttonDisabled: {
    opacity: 1,
    backgroundColor: Color.white,
    borderColor: Color.primary,
  },
  buttonDisabledText: {
    color: Color.primary,
  },
  logoComponentStyle: {
    marginTop: '12%',
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
  privacyRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
    marginLeft:5
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  checkboxSelected: {
    backgroundColor: Color.primary,
  },
  checkboxMark: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  privacyText: {
    flex: 1,
    color: Color.black,
  },
  privacyLink: {
    color: Color.black,
    textDecorationLine: 'underline',
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
    width: 65,
    height: 1,
    backgroundColor: Color.lightGray,
  },
  alreadyHaveAccountContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signInText: {
    marginLeft: 5,
  },
  socialLoginButtonsContainer: {
    width: '60%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateContainer: {
    width: '90%',
    height: 64,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dobPlaceholderText: {
    color: 'gray',
    marginLeft: '2%',
  },
  scroll: {flex: 1},
  scrollContent: {paddingBottom: 80},
});
