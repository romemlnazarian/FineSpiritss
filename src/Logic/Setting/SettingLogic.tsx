import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import useProfileStore from '../../zustland/ProfileStore';
import useAuthStore from '../../zustland/AuthStore';
import {Linking} from 'react-native';
import useDeleteAccountDoneStore from '../../zustland/deleteAccountDoneStore';
import GetAddressStore from '../../zustland/GetAddressStore';
import {ProfileStackParamList} from '../../navigation/types';
import useLocalizationStore from '../../zustland/localizationStore';
export default function SettingLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const {setToken, setRefreshToken, setIsLoggedIn} = useAuthStore();
  const {profile} = useProfileStore();
  const {setDeleteAccountDone} = useDeleteAccountDoneStore();
  const {address, resetAddress} = GetAddressStore();
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const {setLanguage} = useLocalizationStore();



  
const toggleSwitch = (value: boolean) => {
setIsEnabled(() => value);
setLanguage(value ? 'PL' : 'EN');
};



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
    isEnabled,
    toggleSwitch,
  };
}
