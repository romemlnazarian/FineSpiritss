import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import {Controller} from 'react-hook-form';
import TextInputComponent from '../../component/TextInputComponent';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {StyleComponent} from '../../utiles/styles';
import BottomCardComponent from '../../component/BottomCard';
import {UpdateFullNameModel} from '../../model/Setting/SettingModel';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import {useToast} from '../../utiles/Toast/ToastProvider';
import useProfileStore from '../../zustland/ProfileStore';
export default function UpdateFullName({callBack}: {callBack: () => void}) {
  const {Styles} = StyleComponent();
  const {show} = useToast();
  const {refreshToken, setToken, setRefreshToken,token} = useAuthStore();
  const {profile, setProfile} = useProfileStore();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
  });

  const onSubmit = () => {
    setLoading(true);
    getValues().fullName;
    UpdateFullNameModel(
      token,
      getValues().fullName,
      data => {
        setLoading(false);
        console.log('data ========>=>', data);
        setProfile({
          ...profile,
          first_name: data.first_name,
          last_name: data.last_name,
          full_name: `${data.first_name} ${data.last_name}`,
        });
        show(data.detail);
        callBack();
      }, () => {
        setLoading(false);
        refreshTokenModel(
          refreshToken,
          data => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            UpdateFullNameModel(
              data.access,
              getValues().fullName,
              data => {
                setLoading(false);
                setProfile({
                  ...profile,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  full_name: `${data.first_name} ${data.last_name}`,
                });
                show(data.detail);
                callBack();
              },
              () => {
                setLoading(false);
                callBack();
              },
            );
          },
          () => {
            setLoading(false);
            callBack();
          },
        );
      },
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    defaultValues: {
      fullName: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  return (
    <View>
      <Text style={[Styles.h5_Medium, Styles.textAlign, {marginTop: '5%'}]}>
        Update Full Name
      </Text>

      <Controller
        control={control}
        name="fullName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInputComponent
            containerStyle={{marginTop: '5%'}}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Full name"
            errorMessage={errors.fullName?.message}
            showPass={true}
          />
        )}
      />
      <BottomCardComponent
        title={'Save'}
        onHandler={handleSubmit(onSubmit)}
        style={styles.buttonComponent}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonComponent: {
    marginTop: '5%',
  },
});
