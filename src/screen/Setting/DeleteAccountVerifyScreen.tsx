import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CodeInput from '../../component/CodeInput';
import BottomCardComponent from '../../component/BottomCard';
import Timer from '../../Helper/Timer';

export default function DeleteAccountVerifyScreen() {
  const {Styles} = StyleComponent();
  const [restartKey, setRestartKey] = useState<number>(0);
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <Text style={[Styles.h4_Medium,{marginLeft: '5%'}]}>Deleting Confirmation</Text>
      <Text style={[Styles.body_Regular,{marginTop: '2%',marginLeft:'5%'}]}>
        Enter the code we’ve sent to your email (newemail@gmail.com) to confirm
        account deletion.
      </Text>
      <CodeInput onCodePress={() => {}} />
      <View style={[Styles.justifyCenter,{gap: 10}]}>
        <TouchableOpacity
          onPress={() => setRestartKey(restartKey + 1)}>
          <Text style={Styles.title_Medium}>Send Code Again</Text>
        </TouchableOpacity>
        <Timer restartKey={restartKey} onCountdownComplete={() => {}} />
      </View>

      <BottomCardComponent title="Confirm" onHandler={() => {}} style={styles.buttonSpacing}/>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSpacing: {
    position: 'absolute',
    bottom: 20,
  },
});