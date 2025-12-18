import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import useProfileStore from '../../zustland/ProfileStore';
import useAuthStore from '../../zustland/AuthStore';
import { Linking } from 'react-native';
import useDeleteAccountDoneStore from '../../zustland/deleteAccountDoneStore';
import GetAddressStore from '../../zustland/GetAddressStore';
export default function SettingLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>(); 
    const [modalVisible, setModalVisible] = useState(false);
    const [logOutModalVisible, setLogOutModalVisible] = useState(false);
    const {setToken,setRefreshToken,setIsLoggedIn} = useAuthStore();
    const{profile} = useProfileStore();
    const {setDeleteAccountDone} = useDeleteAccountDoneStore();
    const {address} = GetAddressStore()

    const onSubmitPayment = () => {
        navigation.navigate('Payment');
    }

    const onSubmit = (key:string)=>{
          switch(key){
            case 'Privacy Policy':
              Linking.openURL('https://finespirits.pl/privacy-policy/');
              break;
            case 'My addresses':
              navigation.navigate('ShippingAddress')
              break;
            case 'Order History':
              navigation.navigate('OrderHistory');
              break;
            case 'Support service':
              navigation.navigate('SupportService');
              break;
            case 'Setting':
              navigation.navigate('SettingItem');
              break;
          }
    }

    const onSubmitAddress = (key:string)=>{
        setModalVisible((prev)=>!prev)
        key === 'BillingAddress'?
        navigation.navigate('BillingAddress')
        :
        navigation.navigate('ShippingAddress')
    }

    const onSubmitLogout = () => {
        setDeleteAccountDone(false);
        setToken('');
        setRefreshToken('');
        setIsLoggedIn(false);
        setLogOutModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Wellcome' }],
        });
    }
 return{
    onSubmitPayment,
    onSubmit,
    modalVisible, setModalVisible,
    onSubmitAddress,
    profile,
    logOutModalVisible,
    setLogOutModalVisible,
    onSubmitLogout,
    address
 }
}