import {Color} from './color';
import { Dimensions, StyleSheet } from 'react-native';
export const Height = Dimensions.get('screen').height;
export const Width = Dimensions.get('screen').width;




export const shadow3 = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};
export const StyleComponent = () => {
  const Styles = StyleSheet.create({
    //-----------------GLOBAL-----------------//
    container: {
      flex: 1,
      backgroundColor: Color.background,
    },
    
    fullWidth:{
      width:'90%',
    },
     
     fontFamily:{
      fontFamily:'Satoshi-Regular',
     },

    h1:{
      fontSize: 20,
    },

    h2:{
      fontSize: 40,
    },

    h3:{
      fontSize: 16,
      fontFamily:'Satoshi-Regular',
    },

    h4:{
      fontSize: 18,
      fontFamily:'Satoshi-Regular',
    },
    
     bold:{
      fontWeight:'bold',
     },

    caption:{
      fontSize: 10,
    },

    displayRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    justifyCenter:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    justifyBetween:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    spaceCenterBetween: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    textAlign: {
    //   color:CustomColor( Color.Brand2.brand2_900,Color.Brand2.darkBrand2_900),
      textAlign: 'center',
    },

    headline: {
      fontSize: 12,
      fontFamily: 'DMSans-Regular',
    //   color:CustomColor(Color.Neutral.neutral_400,Color.Neutral.darkNeutral_400) 
    },

    minimizeSpace: {
      marginHorizontal: 15,
    },

    marginVertical: {
      marginVertical: 24,
    },
    alignSelf:{
            alignSelf:'center',
    },
    flexStart: {
      alignSelf: 'flex-start',
    },


    image:{
      width:'100%',
      height:'100%',
    },

  });
   
  return {
    Styles,
    Width,
    Height,
  };
};
