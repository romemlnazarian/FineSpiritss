import { useState } from "react";
export default function SettingItemLogic() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
 const checkEmail = (email:string) => {
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
  return{
    modalVisible,
    setModalVisible,
    checkEmail,
    onSubmit,
    name
  }
}