import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { shadow3, StyleComponent } from '../utiles/styles'; // Assuming shadow3 is defined here
import LogoComponent from './LogoComponent';
import { Color } from '../utiles/color';
import { Language } from '../utiles/Language/i18n';
import BottomCardComponent from './BottomCard';
interface ModalCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ModalCard({ isVisible, onClose }: ModalCardProps) {
 const {Styles} = StyleComponent()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1} // Keep full opacity on overlay
        onPress={onClose} // Close modal when pressing outside
      >
        <View style={styles.cardContainer}>

        <LogoComponent width={189} height={68}/>
         <Text style={[Styles.title_Regular, Styles.textAlign, styles.modalTitleText]}>
         {Language.modal_title}
         </Text>
         <Text style={[Styles.h6_Medium, Styles.textAlign, styles.modalAgeConfirmationText]}>
         {Language.modal_age_confirmation}
         </Text>
         <BottomCardComponent
        title={Language.modal_enter_button}
        onHandler={()=>onClose()}
        style={styles.buttonComponent}
      />
           <BottomCardComponent
        title={Language.modal_no_button}
        onHandler={()=>onClose()}
        style={{ ...styles.buttonComponent, ...styles.noButtonMarginTop }}
      />
         <Text style={[Styles.subtitle_Regular, styles.modalTermsAndConditionsText]}>
         {Language.modal_terms_and_conditions}
         </Text>
        </View>

      </TouchableOpacity>
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
    width:'95%'
  },
  modalTitleText: {
    marginTop:'5%',
    color:Color.black
  },
  modalAgeConfirmationText: {
    marginTop:'2%',
    color:Color.primary
  },
  noButtonMarginTop: {
    marginTop: 10,
  },
  modalTermsAndConditionsText: {
    textAlign: 'center',
    marginTop: 10,
    color: Color.gray
  }
});