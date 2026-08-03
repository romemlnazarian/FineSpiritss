import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import React from 'react';
import {shadow3, StyleComponent} from '../utiles/styles';
import LogoComponent from './LogoComponent';
import {Color} from '../utiles/color';
import {Language} from '../utiles/Language/i18n';
import BottomCardComponent from './BottomCard';
import useAuthStore from '../zustland/AuthStore';

interface ModalCardProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PRIVACY_URL = 'https://finespirits.pl/privacy-policy/';
const TERMS_URL = 'https://finespirits.pl/terms-and-conditions/';

export default function ModalCard({
  isVisible,
  onClose,
  onConfirm,
}: ModalCardProps) {
  const {Styles} = StyleComponent();
  const {setAgeGateAcknowledged} = useAuthStore();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.log('open link error =>', err);
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      style={styles.modalContainer}>
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.cardContainer}>
          <LogoComponent width={189} height={68} />
          <Text
            style={[
              Styles.title_Regular,
              Styles.textAlign,
              styles.modalTitleText,
              {width: '85%'},
            ]}>
            {Language.modal_title}
          </Text>
          <Text
            style={[
              Styles.h6_Medium,
              Styles.textAlign,
              styles.modalAgeConfirmationText,
            ]}>
            {Language.modal_age_confirmation}?
          </Text>
          <BottomCardComponent
            title={Language.modal_enter_button}
            onHandler={() => {
              setAgeGateAcknowledged(true);
              onConfirm();
            }}
            style={styles.buttonComponent}
            textStyle={{color: Color.white}}
          />
          <BottomCardComponent
            title={Language.modal_no_button}
            onHandler={() => onClose()}
            style={{...styles.buttonComponent, ...styles.noButtonMarginTop}}
            textStyle={{color: Color.primary}}
          />
          <Text
            style={[Styles.subtitle_Regular, styles.modalTermsAndConditionsText]}>
            {Language.modal_terms_prefix}
            <Text
              style={styles.linkText}
              onPress={() => openLink(TERMS_URL)}>
              {Language.modal_terms_link}
            </Text>
            {Language.modal_terms_middle}
            <Text
              style={styles.linkText}
              onPress={() => openLink(PRIVACY_URL)}>
              {Language.modal_privacy_link}
            </Text>
            {Language.modal_terms_suffix}
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    ...shadow3,
  },
  buttonComponent: {
    marginTop: '8%',
    width: '95%',
  },
  modalTitleText: {
    marginTop: '5%',
    color: Color.black,
  },
  modalAgeConfirmationText: {
    marginTop: '2%',
    color: Color.black,
  },
  noButtonMarginTop: {
    backgroundColor: Color.white,
    marginTop: 10,
  },
  modalTermsAndConditionsText: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    color: Color.gray,
  },
  linkText: {
    color: Color.gray,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 8)',
  },
});
