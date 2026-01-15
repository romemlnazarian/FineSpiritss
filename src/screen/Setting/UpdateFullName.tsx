import {Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
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
import {Color} from '../../utiles/color';
export default function UpdateFullName({callBack}: {callBack: () => void}) {
  const {Styles} = StyleComponent();
  const {show} = useToast();
  const {refreshToken, setToken, setRefreshToken,token} = useAuthStore();
  const {updateProfile} = useProfileStore();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Full name is required'),
  });

  const onSubmit = () => {
    setLoading(true);
    UpdateFullNameModel(
      token,
      getValues().fullName,
      (res) => {
        setLoading(false);
        console.log('data ========>=>', res);
        updateProfile({
          first_name: res.first_name,
          last_name: res.last_name,
          full_name: `${res.first_name} ${res.last_name}`,
        });
        show(res.detail);
        callBack();
      }, () => {
        setLoading(false);
        refreshTokenModel(
          refreshToken,
          (refreshRes) => {
            setToken(refreshRes.access);
            setRefreshToken(refreshRes.refresh);
            UpdateFullNameModel(
              refreshRes.access,
              getValues().fullName,
              (res) => {
                setLoading(false);
                updateProfile({
                  first_name: res.first_name,
                  last_name: res.last_name,
                  full_name: `${res.first_name} ${res.last_name}`,
                });
                show(res.detail);
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

  const isSaveDisabled = loading || !isValid;
  return (
    <KeyboardAvoidingView behavior="padding">
      <Text style={[Styles.h5_Medium, Styles.textAlign, styles.title]}>
        Update Full Name
      </Text>

      <Controller
        control={control}
        name="fullName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInputComponent
            containerStyle={styles.inputContainer}
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
        disabled={isSaveDisabled}
        style={[
          styles.buttonComponent,
          isSaveDisabled ? styles.buttonDisabled : null,
        ]}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {marginTop: '5%'},
  inputContainer: {marginTop: '5%'},
  buttonComponent: {
    marginTop: '5%',
  },
  buttonDisabled: {backgroundColor: Color.lightBlack, borderColor: Color.lightBlack},
});
