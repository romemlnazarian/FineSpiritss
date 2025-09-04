import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LogoComponent from '../component/LogoComponent';
import {StyleComponent} from '../utiles/styles';
import BottomCardComponent from '../component/BottomCard';
import { Color } from '../utiles/color';
import { Language } from '../utiles/Language/i18n';
import { WellcomeLogic } from '../Logic/WellcomeLogic';

export default function WellcomeScreen() {
  const {Styles} = StyleComponent();
   const {onSubmit} = WellcomeLogic()
  return (
    <View style={Styles.container}>
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
          ]}
          >
            {Language.wellcomeText}

      </Text>
      <View style={styles.bottomStyles}>
        <BottomCardComponent
          title={Language.singUp}
          onHandler={()=>onSubmit('signup')}
          style={styles.marginBottom}
        />
        <BottomCardComponent
          title={Language.singIn}
          onHandler={() => onSubmit('signin')}
          style={{backgroundColor: Color.white}}
          textStyle={{color: Color.primary}}
        />
      </View>
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
  margintopTitle:{
    marginTop:'20%'
  },
  margintopTwo:{
    marginTop:'5%'
  },
  bottomStyles:{
    position: 'absolute', width: '100%', bottom: 15
  },
  marginBottom:{
    marginBottom: 10
  }
});
