import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useState } from "react"
import { BackHandler } from "react-native";


export default function NumberVerificationLogic() {

  const[check,setCheck] = useState(false)
  const[visible,setVisible] = useState(false)
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        subscription.remove();
      };
    }, []),
  );

const onSubmit = () =>{
  setVisible((prev)=>!prev)
}

const onHandler = () =>{

}

  return {
    check,
    onSubmit,
    visible,
    onHandler,
    setVisible
  }
}