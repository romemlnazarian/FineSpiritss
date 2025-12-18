import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import {Controller} from 'react-hook-form';
import TextView from '../../component/TextView';
import TextInputComponent from '../../component/TextInputComponent';
import BottomCardComponent from '../../component/BottomCard';
import ShippingAddressLogic from '../../logic/Setting/ShippingAddressLogic';

export default function ShippingAddress() {
  const {Styles} = StyleComponent();
  const {control, handleSubmit, errors, onSubmit, profile,loading} = ShippingAddressLogic();
  
  const keyboardVerticalOffset = 40
  return (
    <KeyboardAvoidingView style={Styles.container}
    behavior={'padding'} keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <CustomHeader showBack={true} title="Shipping Address" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={'Name Surname'}
          color={Color.black}
          style={[Styles.title_Regular, styles.textStyles]}
        />
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              placeholder={'Type your Name Surname'}
              handlePasswordIconClick={() => console.log()}
              value={`${profile?.first_name} ${profile?.last_name}`}
               showPass={true}
                edit={false}
            />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={'Street'}
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
              placeholder={'Street name,home number/appartments'}
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
          title={'Postal code'}
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
              placeholder={'XXXXX'}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.postalCode?.message}
              showPass={true}
              keyboard="numeric"
            />
          )}
        />
      </View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={'City'}
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
              placeholder={'Type Your City'}
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
          title={'Phone'}
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
              placeholder={'Enter you phone'}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.phone?.message}
              showPass={true}
              keyboard="numeric"
            />
          )}
        />
      </View>
      <BottomCardComponent
        title={'Save'}
        onHandler={handleSubmit(onSubmit)}
        // disabled={!isValid}
        style={styles.buttonComponent}
        disabled={loading}
        loading={loading}
      />
      </ScrollView>
    </KeyboardAvoidingView>
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
