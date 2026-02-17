import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import {Color} from '../../utiles/color';
import Check from 'react-native-vector-icons/AntDesign';
import BottomCardComponent from '../../component/BottomCard';
import DeleteAccountLogic from '../../logic/Setting/DeleteAccountLogic';
import React from 'react';
import {Language} from '../../utiles/Language/i18n';
const data: {id: number; title: string}[] = [
  {id: 1, title: Language.delete_account_reason_1},
  {id: 2, title: Language.delete_account_reason_2},
  {id: 3, title: Language.delete_account_reason_3},
  {id: 4, title: Language.delete_account_reason_4},
  {id: 5, title: Language.delete_account_reason_5},
  {id: 6, title: Language.delete_account_reason_6},
  {id: 7, title: Language.delete_account_reason_7},
  {id: 8, title: Language.delete_account_reason_8},
  {id: 9, title: Language.delete_account_reason_9},
];

export default function DeleteAccountScreen() {
  const {Styles} = StyleComponent();
  const {toggleSelect, onSubmit, selectedId,otherText, setOtherText,loading} = DeleteAccountLogic();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={styles.flex1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.contentContainer}>
            <Text style={Styles.h4_Medium}>{Language.delete_account_title}</Text>
            <Text style={[Styles.title_Regular, styles.description]}>
              {Language.delete_account_description}
            </Text>
            {data.map(item => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => toggleSelect(item)}
                  style={[
                    Styles.justifyBetween,
                    styles.row,
                    item.id === 9 && styles.rowNoBorder,
                  ]}>
                  <Text style={[Styles.body_Regular]}>{item.title}</Text>
                  <View
                    style={[
                      Styles.justifyCenter,
                      selectedId === item.id
                        ? styles.checkboxSelected
                        : styles.checkbox,
                    ]}>
                    {selectedId === item.id && (
                      <Check name="check" size={18} color={Color.white} />
                    )}
                  </View>
                </TouchableOpacity>
                {item.id === 9 && selectedId === 9 && (
                  <TextInput
                    style={styles.textarea}
                    placeholder={Language.delete_account_other_placeholder}
                    placeholderTextColor={Color.gray}
                    multiline
                    value={otherText}
                    onChangeText={setOtherText}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
          <BottomCardComponent
            title={Language.Next}
            onHandler={onSubmit}
            style={styles.buttonSpacing}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  scrollContentContainer: {paddingBottom: 24},
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  description: {
    marginTop: '2%',
    lineHeight: 25,
  },
  row: {
    borderBottomColor: Color.lightGray,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  rowNoBorder: {
    borderBottomWidth: 0,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 4,
    backgroundColor: Color.primary,
  },
  textarea: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 8,
    padding: 10,
    minHeight: 150,
    color: Color.black,
    textAlignVertical: 'top',
  },
  buttonSpacing: {
    marginTop: '10%',
    marginBottom: '10%',
  },
});
