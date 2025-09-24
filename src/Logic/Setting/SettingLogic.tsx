import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
export default function SettingLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>(); 
    const onSubmitPayment = () => {
        navigation.navigate('Payment');
    }

    const onSubmit = (key:string)=>{
        key === 'payment'?
        navigation.navigate('Payment')
        :
        navigation.navigate('Setting')
    }
 return{
    onSubmitPayment,
    onSubmit
 }
}