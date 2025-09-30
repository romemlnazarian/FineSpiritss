import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CodeInput from '../../component/CodeInput';
import VerificationCodeLogic from '../../Logic/VerificationCodeLogic';
import CustomHeader from '../../navigation/CustomHeader';
import LogoComponent from '../../component/LogoComponent';
import TextView from '../../component/TextView';
import Counter from '../../component/Counter';
export default function VerificationCodeScreen() {
  const {onCodeHandle, codeValid, timer, setDisableTimer, setDisable, disable} =
    VerificationCodeLogic();
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <LogoComponent />
      <TextView
        title={'Please check your email'}
        style={[Styles.h3_Bold, styles.titleStyle]}
      />
      <TextView
        title={'We’ve sent a code to FineSpirits@gmail.com'}
        style={[Styles.title_Regular, styles.subtitleStyle]}
      />
      <CodeInput isCodeValid={codeValid} onCodePress={e => onCodeHandle(e)} />
      <View style={styles.counterContainer}>
        {!disable && (
          <Text style={[Styles.title_Medium, styles.sendCodeAgainText]}>
            send code againe
          </Text>
        )}

        <Counter
          key={timer}
          onValueChange={() => {
            setDisable(true);
            setDisableTimer(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '10%',
  },
  subtitleStyle: {
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '2%',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  sendCodeAgainText: {
    marginRight: 10,
  },
});
