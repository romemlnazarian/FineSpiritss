import {View, Text, StyleSheet, BackHandler} from 'react-native';
import React from 'react';
import LogoComponent from '../component/LogoComponent';
import {StyleComponent} from '../utiles/styles';
import BottomCardComponent from '../component/BottomCard';
import {Color} from '../utiles/color';
import {Language} from '../utiles/Language/i18n';
import {WellcomeLogic} from '../logic/WellcomeLogic';
import {Image} from 'react-native';
import Layer from '../assets/svg/Layer.svg';
import { BottomSheet } from '../component/BottomSheet';
import {useFocusEffect} from '@react-navigation/native';
 
export default function WellcomeScreen() {
  const {Styles} = StyleComponent();
  const {onSubmit, deleteAccountDone, onHandlerClose} = WellcomeLogic();

  // Exit app on Android hardware back from Wellcome screen
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        subscription.remove();
      };
    }, []),
  );
  return (
    <View style={Styles.container}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={require('../assets/images/background.png')}
          style={{width:'100%',height:'100%',opacity:0.5}}
        />
      </View>
      <LogoComponent width={300} style={styles.margintop} />
      <Text
        style={[
          styles.width,
          Styles.h3_Bold,
          Styles.textAlign,
          Styles.alignSelf,
          styles.margintopTitle,
        ]}>
        {Language.wellcomTitle}
      </Text>
      <Text
        style={[
          Styles.body_Regular,
          Styles.fontFamily,
          Styles.textAlign,
          Styles.alignSelf,
          styles.margintopTwo,
          styles.width,
        ]}>
        {Language.wellcomeText}
      </Text>
      <View style={styles.bottomStyles}>
        <BottomCardComponent
          title={Language.singUp}
          onHandler={() => onSubmit('signup')}
          style={styles.marginBottom}
        />
        <BottomCardComponent
          title={Language.singIn}
          onHandler={() => onSubmit('signin')}
          style={{backgroundColor: 'transparent'}}
          textStyle={{color: Color.primary}}
        />
      </View>
      {deleteAccountDone && (
      <BottomSheet
        modalVisible={deleteAccountDone}
        height={350}
        onClose={()=>onHandlerClose()}>
          <View style={styles.bottomSheetContainer}>
            <Layer />
            <Text
              style={[Styles.h6_Medium, Styles.textAlign, {marginTop: '5%'}]}>
              Your account has been deleted
            </Text>
            <Text
              style={[
                Styles.title_Regular,
                Styles.textAlign,
                {marginTop: '2%'},
              ]}>
              We’re truly sad to see you go, but we’ll always be here if you
              decide to come back.
            </Text>
            <BottomCardComponent
              title="Done"
              onHandler={()=>onHandlerClose()}
              style={{marginTop: '5%'}}
            />
          </View>
        
        
      </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  margintop: {
    marginTop: '30%',
  },
  width: {
    width: '80%',
  },
  margintopTitle: {
    marginTop: '20%',
  },
  margintopTwo: {
    marginTop: '5%',
  },
  bottomStyles: {
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
  marginBottom: {
    marginBottom: 10,
  },
  bottomSheetContainer: {
    width: '93%',
    alignSelf: 'center',
    marginTop: '2%',
    alignItems: 'center',
  },
});
