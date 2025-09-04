import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../navigation/types';


export  function WellcomeLogic() {
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const onSubmit = (key:string) =>{
         key === 'signup'?
        navigation.navigate('Signup')
        :
        navigation.navigate('Signin')
    }

return{
    onSubmit
}

}