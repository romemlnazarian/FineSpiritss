import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CodeInput from '../../component/CodeInput';
import BottomCardComponent from '../../component/BottomCard';
import {BottomSheet} from '../../component/BottomSheet';
import DeleteAccountVerfyLogic from '../../logic/Setting/DeleteAccountVerfyLogic';
import Layer from '../../assets/svg/Layer.svg';
import TimerAndroid from '../../Helper/TimerAndroid';
import Warning from 'react-native-vector-icons/Ionicons';
import { Color } from '../../utiles/color';
export default function DeleteAccountVerifyScreen(route: any) {
  const {Styles} = StyleComponent();
  const {
    modalVisible,
    setModalVisible,
    restartKey,
    onSubmitConfirm,
    email,
    DisableTimer,
    onHandlerTimer,
    onHandler,
    codeValid,
    count,
    disable,
    onSubmitCancel,
    title,
    loading,
    onCountdownComplete,
  } = DeleteAccountVerfyLogic(route);
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} />
      <Text style={[Styles.h4_Medium, styles.title]}>
        Deleting Confirmation
      </Text>
      <Text style={[Styles.body_Regular, styles.description]}>
        Enter the code we’ve sent to your email ({email}) to confirm account
        deletion.
      </Text>
      <CodeInput isCodeValid={codeValid}  onCodePress={(e) => onHandler(e)} />
      <View style={[Styles.justifyCenter, styles.timerContainer]}>
        <TouchableOpacity disabled={DisableTimer} onPress={() => onHandlerTimer()}>
          <Text style={Styles.title_Medium}>Send Code Again</Text>
        </TouchableOpacity>
        <TimerAndroid
          restartKey={restartKey}
          onCountdownComplete={onCountdownComplete}
        />
      </View>

      {/* <BottomCardComponent
        title="Confirm"
        onHandler={onSubmitConfirm}
        countdown
        countdownStart={3}
      /> */}
      <BottomSheet
        modalVisible={modalVisible}
        height={400}
        onClose={() => setModalVisible(false)}>
        {/* <>...</> */}
        <>
        {title === 'deleteAccount' ? (
        <>
        <View style={styles.bottomSheetContainer}>
        <Warning name="warning" size={80} color={Color.primary} />
        <Text style={[Styles.h6_Medium, Styles.textAlign, styles.sheetTitle]}>
            Are you sure you want to delete your account?
          </Text>
          <Text
            style={[Styles.title_Regular, Styles.textAlign, styles.sheetSubtitle]}>
            This action is permanent and cannot be undone
          </Text>
        </View>
        <BottomCardComponent
          title="No"
          onHandler={onSubmitCancel}
          style={styles.sheetButtonPrimary}
        />
        <BottomCardComponent
          title={`Yes${(count) < 1 ? '' : `(${count})`}`}
          onHandler={onSubmitConfirm}
          disabled={disable}
          loading={loading}
          style={{
            ...styles.sheetButtonSecondary,
            backgroundColor: disable ? Color.lightBlack : Color.primary,
          }}
        />
        </>
        ) : (
          <View style={styles.bottomSheetContainer}>
            <Layer />
            <Text
              style={[Styles.h6_Medium, Styles.textAlign, styles.deletedTitle]}>
              Your account has been deleted
            </Text>
            <Text
              style={[
                Styles.title_Regular,
                Styles.textAlign,
                styles.deletedSubtitle,
              ]}>
              We’re truly sad to see you go, but we’ll always be here if you
              decide to come back.
            </Text>
            <BottomCardComponent
              title="Done"
              onHandler={() => console.log('done')}
              style={styles.deletedButton}
            />
          </View>
        )}
        </>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: '5%',
  },
  description: {
    marginTop: '2%',
    marginLeft: '5%',
  },
  timerContainer: {
    gap: 10,
  },
  bottomSheetContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
  },
  sheetTitle: {
    marginTop: '2%',
  },
  sheetSubtitle: {
    marginTop: '2%',
  },
  sheetButtonPrimary: {
    marginTop: '10%',
  },
  sheetButtonSecondary: {
    marginTop: '2%',
  },
  deletedTitle: {
    marginTop: '5%',
  },
  deletedSubtitle: {
    marginTop: '2%',
  },
  deletedButton: {
    marginTop: '5%',
  },
});
