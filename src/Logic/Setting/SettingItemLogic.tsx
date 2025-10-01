import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export default function SettingItemLogic() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const checkEmail = (email: string) => {
    console.log(email);
  }
 

  const onSubmit = (key:string) => {
    setModalVisible(true);
    switch(key){
      case 'Email Address':
        setName('Email Address');
        break;
      case 'Change Password':
        setName('Change Password');
        break;
      case 'Birth date':
        setName('Birth date');
        break;
    }
  }

  const onSubmitDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  }
  return{
    modalVisible,
    setModalVisible,
    checkEmail,
    onSubmit,
    name,
    onSubmitDeleteAccount
  }
}