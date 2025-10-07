import { View, StyleSheet} from 'react-native'
import React from 'react'
import {ForgetPasswordLogic} from '../../logic/ForgetPasswordLogic'
import { StyleComponent } from '../../utiles/styles'
import LogoComponent from '../../component/LogoComponent'
import TextView from '../../component/TextView'
import { Language } from '../../utiles/Language/i18n'
import { Controller } from 'react-hook-form'
import TextInputComponent from '../../component/TextInputComponent'
import Email from '../../assets/svg/Email.svg';
import BottomCardComponent from '../../component/BottomCard'

export default function ForgetPasswordScreen() {
  const {Styles} = StyleComponent()
  const {control, handleSubmit, errors, onSubmit} = ForgetPasswordLogic();
  return (
    <View style={Styles.container}>
      <LogoComponent style={{marginTop:'15%'}}/>
      <TextView
        title={Language.Email_title}
        style={[Styles.h3_Bold, styles.titleStyle]}
      />
      <TextView
        title={Language.Email_description}
        style={[Styles.title_Regular, styles.subtitleStyle]}
      />
            <View style={styles.inputContainerSmallMargin}>

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputComponent
              containerStyle={styles.textInputContainer}
              onBlur={onBlur}
              placeholder={Language.Email_Placeholder}
              handlePasswordIconClick={() => console.log()}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              leftIcon={<Email width={25} height={25} />}
              showPass={true}
            />
          )}
        />
      </View>
      <BottomCardComponent
        title={Language.Sendcode}
        onHandler={handleSubmit(onSubmit)}
        style={styles.buttonComponent}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '10%',
  },
  subtitleStyle: {
    width:'90%',
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '2%',
  },
  inputContainerSmallMargin: {
    marginTop: '5%',
  },
  textStyles: {
    textAlign: 'left',
    marginLeft: '5%',
  },
  textInputContainer: {
    marginTop: 10,
  },
  buttonComponent: {
    marginTop: '10%',
  },
});
