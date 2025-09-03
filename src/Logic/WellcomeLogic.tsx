import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../navigation/types';


export  function WellcomeLogic() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const onSubmit = () =>{
        navigation.navigate('Signup');
    }

return{
    onSubmit
}

}