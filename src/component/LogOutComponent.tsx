import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { shadow3, StyleComponent } from '../utiles/styles'
import BottomCardComponent from './BottomCard';
import { Color } from '../utiles/color';
export default function LogOutComponent({onClose,logOutModalVisible,setLogOutModalVisible}:{onClose:()=>void,logOutModalVisible:boolean,setLogOutModalVisible:()=>void}) {
  const {Styles} = StyleComponent();
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={logOutModalVisible}
    onRequestClose={() => setLogOutModalVisible()}
    >
       <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1} // Keep full opacity on overlay
        onPress={() => setLogOutModalVisible()} // Close modal when pressing outside
      >
        <View style={styles.cardContainer}>

         <Text style={[Styles.h6_Regular, Styles.textAlign, styles.modalTitleText]}>
         Are you sure you want
         to logout?
         </Text>
         <BottomCardComponent
        title={'Logout'}
        onHandler={()=>{
          onClose();
        }}
        style={[styles.buttonComponent, {backgroundColor: Color.white}]}
        textStyle={{color:Color.primary}}
      />
           <BottomCardComponent
        title={'Cancel'}
        onHandler={()=>setLogOutModalVisible(false)}
        style={{ ...styles.buttonComponent, ...styles.noButtonMarginTop }}
        textStyle={{color:Color.white}}
      />
        </View>

      </TouchableOpacity>
          </Modal>

  )
}
const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
    },
    cardContainer: {
      width: '90%',
      backgroundColor: Color.white,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      ...shadow3, // Apply shadow
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Color.black,
    },
    buttonComponent: {
      marginTop: '10%',
      width:'95%',
    },
    modalTitleText: {
        width:'70%',
      marginTop:'5%',
      color:Color.black,
    },
    modalAgeConfirmationText: {
      marginTop:'2%',
      color:Color.primary,
    },
    noButtonMarginTop: {
      marginTop: 10,
    },
    modalTermsAndConditionsText: {
      textAlign: 'center',
      marginTop: 10,
      color: Color.gray,
    },
  });
  