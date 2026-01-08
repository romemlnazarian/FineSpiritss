import { Modal, StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { StyleComponent } from '../utiles/styles'; // Assuming shadow3 is defined here
import { Color } from '../utiles/color';
import { Text } from 'react-native-gesture-handler';
interface ModalCardProps {
  isVisible: boolean;
}

export default function LoadingModal({ isVisible}: ModalCardProps) {
 const {Styles} = StyleComponent();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View
        style={styles.modalOverlay}
      >
        <View style={[Styles.card,Styles.justifyCenter,{flexDirection:'column',borderColor:Color.white, backgroundColor:Color.white,height:150,width:'50%'}]}>
        <Text style={Styles.h6_Medium}>Please Wait</Text>
        <ActivityIndicator size='large' color={Color.primary} style={{marginTop:'10%'}}/>
        </View>
     
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
  },

});
