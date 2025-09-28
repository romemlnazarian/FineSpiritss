import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
export default function SettingLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>(); 
    const [modalVisible, setModalVisible] = useState(false);
    const onSubmitPayment = () => {
        navigation.navigate('Payment');
    }

    const onSubmit = (key:string)=>{
          switch(key){
            case 'My addresses':
             setModalVisible((prev)=>!prev);
              break;
            case 'Setting':
              navigation.navigate('Setting');
              break;
            case 'Order History':
              navigation.navigate('OrderHistory');
              break;
            case 'Support service':
              navigation.navigate('SupportService');
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


 return{
    onSubmitPayment,
    onSubmit,
    modalVisible, setModalVisible,
    onSubmitAddress
 }
}