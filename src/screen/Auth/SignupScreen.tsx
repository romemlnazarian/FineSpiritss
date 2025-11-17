import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
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
import Facebook from '../../assets/svg/facebook.svg';
import AuthLogo from '../../component/AuthLogo';
import Calender from '../../assets/svg/Calendar.svg';
import DatePicker from 'react-native-date-picker';
export default function SignupScreen() {
  const {Styles} = StyleComponent();
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
    formatDate,onSubmitSignIn
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
          <Text style={[Styles.title_Regular, styles.dobPlaceholderText]}>
            {selectedDate === '' ? Language.DOB_Placeholder : selectedDate}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomCardComponent
        title={Language.singUp}
        onHandler={handleSubmit(onSubmit)}
        style={styles.buttonComponent}
        loading={loading}
        disabled={loading}
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


      <View
        style={[
          styles.socialLoginButtonsContainer,
          Styles.justifyBetween,
          Styles.alignSelf,
        ]}>
        <AuthLogo onHandler={() => console.log()}>
          <Gmail />
        </AuthLogo>
        <AuthLogo onHandler={() => console.log()}>
          <Facebook />
        </AuthLogo>
        <AuthLogo onHandler={() => console.log()}>
          <Apple />
        </AuthLogo>
      </View>
      <TouchableOpacity onPress={() =>console.log()} style={styles.businessClientContainer}>
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
            style={[Styles.title_Regular, styles.signInText]}
          />
        </TouchableOpacity>
      </View>
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
  businessClientContainer: {
    marginTop: '5%',
    alignSelf: 'center',
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
    marginTop: '5%',
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
  dateContainer: {
    width: '90%',
    height: 64,
    marginLeft: '2%',
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
    color: Color.gray,
    marginLeft: '2%',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 80 },
});
