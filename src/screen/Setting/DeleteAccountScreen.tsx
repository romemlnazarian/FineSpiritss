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
const data: {id: number; title: string}[] = [
  {id: 1, title: 'Found a better service'},
  {id: 2, title: 'Too expensive'},
  {id: 3, title: 'Limited selection'},
  {id: 4, title: 'Delivery issues'},
  {id: 5, title: 'Poor customer service'},
  {id: 6, title: 'Complicated app experience'},
  {id: 7, title: 'Not using anymore'},
  {id: 8, title: 'Payment problems'},
  {id: 9, title: 'Other'},
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
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 24}}>
          <View style={styles.contentContainer}>
            <Text style={Styles.h4_Medium}>Delete Account</Text>
            <Text style={[Styles.title_Regular, styles.description]}>
              We're really sorry to see you go. Are you sure you want to delete
              your account? Once you confirm, your data will gone.
            </Text>
            {data.map(item => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => toggleSelect(item)}
                  style={[Styles.justifyBetween, styles.row, item.id === 9 && {borderBottomWidth: 0}]}>
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
                    placeholder="Please describe..."
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
            title="Delete Account"
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
