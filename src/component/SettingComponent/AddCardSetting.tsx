import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import TextView from '../TextView';
import {Controller} from 'react-hook-form';
import TextInputComponent from '../TextInputComponent';
import AddCardLogic from '../../Logic/Setting/AddCardLogic';
import Wallet from '../../assets/svg/wallet.svg';
import BottomCardComponent from '../BottomCard';

export default function AddCardSetting() {
  const {Styles} = StyleComponent();
  const {control, errors, handleSubmit} = AddCardLogic();
  return (
    <View
      style={[
        Styles.alignCenter,
        Styles.alignSelf,
        {width: '93%', marginTop: '5%'},
      ]}>
      <Text style={Styles.h5_Medium}>Add Card</Text>
      <View
        style={[
          Styles.alignCenter,
          Styles.alignSelf,
          {
            width: '93%',
            marginTop: '5%',
            height: 150,
            backgroundColor: Color.lightGray,
            borderRadius: 10,
          },
        ]}></View>
      <View style={styles.inputContainerSmallMargin}>
        <TextView
          title={'Card Number'}
          color={Color.gray}
          style={[Styles.title_Regular, styles.textStyles]}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={'xxxx xxxx xxxx xxxx'}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              leftIcon={<Wallet width={25} height={25} />}
              showPass={true}
            />
          )}
        />
      </View>
      <View
        style={{
          marginTop: '5%',
          flexDirection: 'row',
          width: '93%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '48%'}}>
          <TextView
            title={'Card Number'}
            color={Color.gray}
            style={[Styles.title_Regular, styles.textStyles]}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComponent
                containerStyle={{width: '100%', marginTop: '5%'}}
                onBlur={onBlur}
                placeholder={'xxxx xxxx xxxx xxxx'}
                handlePasswordIconClick={() => console.log()}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </View>
        <View style={{width: '48%'}}>
          <TextView
            title={'Card Number'}
            color={Color.gray}
            style={[Styles.title_Regular, styles.textStyles]}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComponent
                containerStyle={{width: '100%', marginTop: '5%'}}
                onBlur={onBlur}
                placeholder={'xxxx xxxx xxxx xxxx'}
                handlePasswordIconClick={() => console.log()}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                leftIcon={<Wallet width={25} height={25} />}
                showPass={true}
              />
            )}
          />
        </View>
      </View>
      <BottomCardComponent
        title={'Add Card'}
        style={{marginTop:'5%',backgroundColor:Color.lightBlack}}
        onHandler={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textStyles: {
    textAlign: 'left',
  },
  inputContainerSmallMargin: {
    marginTop: '5%',
  },
  textInputContainer: {
    marginTop: 10,
    width: '100%',
  },
});
