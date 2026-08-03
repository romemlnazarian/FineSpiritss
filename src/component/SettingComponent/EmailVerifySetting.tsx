import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import TextInputComponent from '../TextInputComponent';
import Email from '../../assets/svg/Email.svg';
import BottomCardComponent from '../BottomCard';
import {Color} from '../../utiles/color';
import {Language} from '../../utiles/Language/i18n';
export default function EmailVerifySetting({callBack}:{callBack:(value:string)=>void}) {
  const {Styles} = StyleComponent();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(Language.Email),
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',

    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = () => {
    callBack(getValues().email);
  };
  const isSaveDisabled = !isValid;
  return (
    <View style={[Styles.alignCenter, styles.container]}>
      <Text style={Styles.h5_Medium}>{Language.change_email_title}</Text>
      <Text style={[Styles.title_Regular, Styles.textAlign, styles.subtitle]}>
        {Language.change_email_subtitle}
      </Text>
      <View style={Styles.alignCenter}>
      <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.input}
              onBlur={onBlur}
              placeholder={Language.new_email_address}
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
        title={Language.Next}
        onHandler={handleSubmit(onSubmit)}
        disabled={isSaveDisabled}
        style={[
          styles.button,
          isSaveDisabled ? styles.buttonDisabled : null,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: '5%'},
  subtitle: {marginTop: '5%', width: '80%'},
  input: {marginTop: '5%',width: '100%'},
  button: {marginTop: '5%'},
  buttonDisabled: {backgroundColor: Color.lightBlack, borderColor: Color.lightBlack},
});
