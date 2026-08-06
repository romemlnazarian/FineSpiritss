import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useState} from 'react';
import useProfileStore from '../../zustland/ProfileStore';
import useAuthStore from '../../zustland/AuthStore';
import {Linking} from 'react-native';
import useDeleteAccountDoneStore from '../../zustland/deleteAccountDoneStore';
import GetAddressStore from '../../zustland/GetAddressStore';
import {ProfileStackParamList} from '../../navigation/types';
import useLocalizationStore, {
  normalizeAppLanguage,
  type AppLanguage,
} from '../../zustland/localizationStore';
import {Language} from '../../utiles/Language/i18n';

export type {AppLanguage};
export {normalizeAppLanguage};

export default function SettingLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const {setToken, setRefreshToken, setIsLoggedIn} = useAuthStore();
  const {profile} = useProfileStore();
  const {setDeleteAccountDone} = useDeleteAccountDoneStore();
  const {address, resetAddress} = GetAddressStore();
  const language = useLocalizationStore(state => state.language);
  const setLanguage = useLocalizationStore(state => state.setLanguage);
  const currentLanguage = normalizeAppLanguage(language);

  const selectLanguage = useCallback(
    (lang: AppLanguage) => {
      if (lang === currentLanguage) {
        return;
      }
      setLanguage(lang);
      Language.setLanguage(lang);
    },
    [currentLanguage, setLanguage],
  );



  const onSubmitPayment = () => {
    navigation.navigate('Payment');
  };

  const onSubmit = (key: string) => {
    switch (key) {
      case 'privacy_policy':
        Linking.openURL('https://finespirits.pl/privacy-policy/');
        break;
      case 'shipping_address':
        navigation.navigate('ShippingAddress');
        break;
      case 'order_history':
        navigation.navigate('OrderHistory');
        break;
      case 'support_service':
        navigation.navigate('SupportService');
        break;
      case 'settings':
        navigation.navigate('SettingItem');
        break;
    }
  };

  const onSubmitAddress = (key: string) => {
    setModalVisible(prev => !prev);
    key === 'BillingAddress'
      ? navigation.navigate('BillingAddress')
      : navigation.navigate('ShippingAddress');
  };

  const onSubmitLogout = () => {
    setDeleteAccountDone(false);
    setToken('');
    setRefreshToken('');
    setIsLoggedIn(false);
    setLogOutModalVisible(false);
    resetAddress();
    navigation.reset({
      index: 0,
      routes: [{name: 'Wellcome'}],
    });
  };

  return {
    onSubmitPayment,
    onSubmit,
    modalVisible,
    setModalVisible,
    onSubmitAddress,
    profile,
    logOutModalVisible,
    setLogOutModalVisible,
    onSubmitLogout,
    address,
    currentLanguage,
    selectLanguage,
  };
}
