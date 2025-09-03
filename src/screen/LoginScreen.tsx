// import {View,StyleSheet, ScrollView} from 'react-native';
// import React from 'react';
// import { Controller } from "react-hook-form";
// import { StyleComponent } from '../utiles/styles';
// import TextInputComponent from '../component/TextInputComponent'
// import TextView from '../component/TextView';
//  export default function LoginScreen() {
//     const {Styles} = StyleComponent()
//         // const { control, handleSubmit, errors, onSubmit, showPass, setShowPass,
//     //     showConfirmPass, setShowConfirmPass, rule, setRule ,onSubmitRule} = SignupLogic(route)
//    return (
//     <View style={Styles.container}>
//     <ScrollView showsVerticalScrollIndicator={false}>
//     <View style={{ marginTop: '10%' }}>
//                     <TextView title="Name" color={black} style={[Styles.h3, styles.textStyles]} />
//                     <Controller
//                         control={control}
//                         name="username"
//                         render={({ field: { onChange, onBlur, value } }) => (
//                             <TextInputComponent containerStyle={{ marginTop: 10 }}
//                                 onBlur={onBlur}
//                                 handlePasswordIconClick={() => console.log()}
//                                 onChangeText={onChange}
//                                 value={value}
//                                 errorMessage={errors.username?.message}

//                             />
//                         )}
//                     />
//                 </View>
//      </ScrollView>
//      </View>

//    )
//  }

//  const styles = StyleSheet.create({
//     textStyles: {
//         textAlign: 'left',
//         marginLeft: 15
//     },
//     textBold: {
//         fontWeight: 'bold'
//     },
//     buttonComponent: {
//         marginTop: '10%'
//     },
//     check: {
//         width: 18, height: 18, borderRadius: 20, borderWidth: 1,
//     },
//     image: {
//         width: 50, height: 50, alignSelf: 'center', marginTop: 20
//     }
// });