import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import BarCode from '../../assets/svg/barcode.svg';
interface ModalCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function BarCodeModal({isVisible, onClose}: ModalCardProps) {
  const {Styles} = StyleComponent();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
      <View style={styles.cardContainer}>
       <Text style={[Styles.h5_Medium,Styles.textAlign,{width:'70%'}]}>
       Scan at checkout to 
       get a discount
       </Text>
       <View style={{marginTop:'5%'}}>
       <BarCode width={200} height={50}/>
       </View>
       <Text style={[Styles.body_Regular,Styles.textAlign,{marginTop:'2%'}]}>
      Or use the code 562636856714524
      </Text>
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
  cardContainer: {
    width: '90%',
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

});
