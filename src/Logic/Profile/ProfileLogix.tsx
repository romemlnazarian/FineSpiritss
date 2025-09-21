import  { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ProfileScreenNavigationProp } from '../../navigation/types'
export default function ProfileLogix() {
    const navigation = useNavigation<ProfileScreenNavigationProp>()
    const [isShowHistory, setIsShowHistory] = useState(false)
    const onHandlerShowHistory = () => {
        setIsShowHistory(prev => !prev)
    }

    const onSubmitMyOrder = () =>{
        navigation.navigate('MyOrder')
    }
  return{
    onHandlerShowHistory,
    onSubmitMyOrder,
  }
}