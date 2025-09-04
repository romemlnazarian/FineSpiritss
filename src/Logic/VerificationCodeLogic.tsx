import { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../navigation/types';

export default function VerificationCodeLogic() {
const navigation = useNavigation<AuthScreenNavigationProp>();
   
useEffect(()=>{
   navigation.navigate('PasswordVerification')
},[])
  

    const [timer, setTimer] = useState<number>(0)
    const [DisableTimer, setDisableTimer] = useState<boolean>(false)
    const [disablebutton, setDisablebutton] = useState<boolean>(true)
    const [codeValid, setCodeValid] = useState<boolean>(true)
    const [disable, setDisable] = useState<boolean>(false)

    const onCodeHandle = (value: string) => {
        if (value.length === 6) {
          setCodeValid(true)
          setDisablebutton(false)
        } else {
          setDisablebutton(true)
          setCodeValid(true)
        }
      }
    return{
        onCodeHandle,
        codeValid,
        timer,
        DisableTimer, setDisableTimer,
        setDisable,
        disable
    }

}