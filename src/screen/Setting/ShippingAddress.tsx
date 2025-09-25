import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import {Controller} from 'react-hook-form';
import TextView from '../../component/TextView';
import TextInputComponent from '../../component/TextInputComponent';
import {Language} from '../../utiles/Language/i18n';
import BottomCardComponent from '../../component/BottomCard';
import ShippingAddressLogic from '../../Logic/Setting/ShippingAddressLogic';

export default function ShippingAddress() {
  const {Styles} = StyleComponent();
  const {control, handleSubmit, errors, onSubmit, isValid} = ShippingAddressLogic();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} title="Shipping Address" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={'Name Surname'}
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
              placeholder={'Type your Name Surname'}
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
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.city?.message}
              showPass={true}
            />
          )}
        />
      </View>
     
    
      <BottomCardComponent
        title={'Save'}
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
