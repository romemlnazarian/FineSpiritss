import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import useProfileStore from '../../zustland/ProfileStore';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import { addAddressModel, updateAddressModel} from '../../model/Setting/SettingModel';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GetAddressStore from '../../zustland/GetAddressStore';
import { useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
interface AddressData {
  street: string;
  postal_code: string;
  city: string;
  phone: string;
}

export default function ShippingAddressLogic(route:any) {
   const {profile}  = useProfileStore()
   const {token,setToken,refreshToken,setRefreshToken} = useAuthStore();
   const {setAddress, address} = GetAddressStore()
   const [loading,setLoading] = useState(false)
   const navigation = useNavigation<any>()
    const validationSchema = Yup.object().shape({
      street: Yup.string().trim().required('Required'),
      postalCode: Yup.string().trim().required('Required'),
      city: Yup.string().trim().required('Required'),
      phone: Yup.string().trim(),

      });
      const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        getValues,
        setValue,
      } = useForm({
        defaultValues: {
          street: '',
          postalCode: '',
          city: '',
          phone:'',
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
      })



      // Populate form fields when address data is available
      useEffect(() => {
        if (address && typeof address === 'object') {
          const addr = address as AddressData;
          setValue('street', addr.street || '');
          setValue('postalCode', addr.postal_code || '');
          setValue('city', addr.city || '');
          setValue('phone', addr.phone || '');
        }
      }, [address, setValue]);

      
      const onSubmit = () => {
        setLoading(true)
        const data: {
          street: string;
          postal_code: string;
          city: string;
          phone: string;
        } = {
          street: getValues('street') || '',
          postal_code: getValues('postalCode') || '',
          city: getValues('city') || '',
          phone: getValues('phone') || '',
        };
      address ?addAddress(data):updateAddress(data)
  
      }


    const addAddress = (data:{
      street: string;
      postal_code: string;
      city: string;
      phone: string;
    } ) =>{
      addAddressModel(
        token,
        data,
        () => {
          setAddress(data);
          console.log('okkkk');
          setLoading(false);
          navigation.goBack();
        },
        (err: string) => {
          console.log(err);
          setLoading(false);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              addAddressModel(
                refreshedTokens.access,
                data,
                () => {
                  setAddress(data);
                  console.log('okkkk');
                  setLoading(false);
                  navigation.goBack();
                },
                (err: string) => {
                  console.log(err);
                },
                () => {
                  setLoading(false);
                },
              );
            },
            () => {
              setLoading(false);
            },
          );
        }
      );
    }
 
    const updateAddress = (data:{
      street: string;
      postal_code: string;
      city: string;
      phone: string;
    } ) =>{
      updateAddressModel(
        token,
        data,
        () => {
          setAddress(data);
          console.log('okkkk');
          setLoading(false);
          navigation.goBack();
        },
        (err: string) => {
          console.log(err);
          setLoading(false);
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateAddressModel(
                refreshedTokens.access,
                data,
                () => {
                  setAddress(data);
                  console.log('okkkk');
                  setLoading(false);
                  navigation.goBack();
                },
                (err: string) => {
                  console.log(err);
                },
                () => {
                  setLoading(false);
                },
              );
            },
            () => {
              setLoading(false);
            },
          );
        }
      );
    }

  return {
    control,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    profile,
    address,
    loading,
    getValues
  };
}
