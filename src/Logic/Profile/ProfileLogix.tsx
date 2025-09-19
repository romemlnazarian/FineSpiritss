import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function ProfileLogix() {
    const [isShowHistory, setIsShowHistory] = useState(false)
    const onHandlerShowHistory = () => {
        setIsShowHistory(prev => !prev)
    }
  return{
    onHandlerShowHistory,
  }
}