import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import BilingAddressLogic from '../../logic/Setting/BilingAddressLogic';
import {Controller} from 'react-hook-form';
import TextView from '../../component/TextView';
import TextInputComponent from '../../component/TextInputComponent';
import {Language} from '../../utiles/Language/i18n';
import BottomCardComponent from '../../component/BottomCard';

export default function BillingAddressScreen() {
  const {Styles} = StyleComponent();
  const {control, handleSubmit, errors, onSubmit, isValid} = BilingAddressLogic();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} title={Language.setting_billing_address_title} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.Name_Surname}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.Name_Surname_Placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
                showPass={true}
            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.setting_street}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="street"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.street_address_placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.street?.message}
              showPass={true}
            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.Postal_code}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="postalCode"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.postal_code_placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.postalCode?.message}
              showPass={true}

            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.City}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="city"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.city_placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.city?.message}
              showPass={true}
            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.setting_phone_optional}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={'+48 XX XXX XX XX'}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.phone?.message}
              showPass={true}
            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={Language.setting_email_address}
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
              showPass={true}
            />
          )}
        />
      </View>
      <BottomCardComponent
        title={Language.Save}
        onHandler={handleSubmit(onSubmit)}
        disabled={!isValid}
        style={styles.buttonComponent}
      />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: '5%',
  },
  textInputContainer: {
    marginTop: 10,
  },
  textStyles: {
    textAlign: 'left',
    marginLeft: '5%',
  },
  inputContainerSmallMargin: {
    marginTop: '5%',
  },
  buttonComponent: {
    marginTop: '10%',
    marginBottom: '10%',
  },
});
