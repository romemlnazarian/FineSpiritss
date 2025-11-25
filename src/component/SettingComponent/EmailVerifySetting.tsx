import {View, Text} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import TextInputComponent from '../TextInputComponent';
import Email from '../../assets/svg/Email.svg';
import BottomCardComponent from '../BottomCard';
import { Color } from '../../utiles/color';
export default function EmailVerifySetting({callBack}:{callBack:(value:string)=>void}) {
  const {Styles} = StyleComponent();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Email is required')
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      email: '',

    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = () => {
    callBack(getValues().email);
  }
  return (
    <View style={[Styles.alignCenter,{marginTop:'5%'}]}>
      <Text style={Styles.h5_Medium}>Change Email address</Text>
      <Text style={[Styles.title_Regular,Styles.textAlign,{marginTop:'5%',width:'80%'}]}>
        We’ll send you a code to verify your new email address
      </Text>
      <View style={Styles.alignCenter}>
      <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={{marginTop:'5%'}}
              onBlur={onBlur}
              placeholder={'New Email Address'}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              leftIcon={<Email/>}
              showPass={true}
            />
          )}
        />
      </View>
      <BottomCardComponent
        title={'Save'}
        onHandler={handleSubmit(onSubmit)}
        style={{marginTop:'5%'}}
      />
    </View>
  );
}
