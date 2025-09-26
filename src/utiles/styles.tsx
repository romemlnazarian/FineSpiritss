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

    h1_Bold:{
      fontSize: 64,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
     h1_SemiBold:{
      fontSize: 64,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     h1_Medium:{
      fontSize: 64,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     h1_Regular:{
      fontSize: 64,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     h1_Light:{
      fontSize: 64,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },
     


     h2_Bold:{
      fontSize: 64,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
     h2_SemiBold:{
      fontSize: 40,
      fontFamily:'Satoshi-Bold',  
      color:Color.black,
     },

     h2_Medium:{
      fontSize: 40,
      fontFamily:'Satoshi-Medium',
      color:Color.black,

     },
    
     h2_Regular:{
      fontSize: 40,
      fontFamily:'Satoshi-Medium',
      color:Color.black,

     },
     
     h2_Light:{
      fontSize: 40,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },

     h3_Bold:{
      fontSize: 30,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
     h3_SemiBold:{
      fontSize: 30,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     h3_Medium:{
      fontSize: 30,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     h3_Regular:{
      fontSize: 30,
      fontFamily:'Satoshi-Medium',
     },
     
    
     h3_Light:{
      fontSize: 30,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },

     h4_Bold:{
      fontSize: 24,
      fontFamily:'Satoshi-Bold',
      color:Color.black,

    },
   
     h4_SemiBold:{
      fontSize: 24,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     h4_Medium:{
      fontSize: 24,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     h4_Regular:{
      fontSize: 24,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     h4_Light:{
      fontSize: 24,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },

     h5_Bold:{
      fontSize: 22,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
     h5_SemiBold:{
      fontSize: 22,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     h5_Medium:{
      fontSize: 22,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     h5_Regular:{
      fontSize: 22,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     h5_Light:{
      fontSize: 22,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },


     h6_Bold:{
      fontSize: 20,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
     h6_SemiBold:{
      fontSize: 20,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     h6_Medium:{
      fontSize: 20,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     h6_Regular:{
      fontSize: 20,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     h6_Light:{
      fontSize: 20,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },

     body_Bold:{
      fontSize: 18,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
      fontWeight:'bold',
    },
   
    body_SemiBold:{
      fontSize: 18,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     body_Medium:{
      fontSize: 18,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     body_Regular:{
      fontSize: 18,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     body_Light:{
      fontSize: 18,
      fontFamily:'Satoshi-Light', 
      color:Color.black,
     },


     title_Bold:{
      fontSize: 16,
      fontWeight:'bold',
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
    title_SemiBold:{
      fontSize: 16,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     title_Medium:{
      fontSize: 16,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     title_Regular:{
      fontSize: 16,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
     
     title_Light:{
      fontSize: 16,
      fontFamily:'Satoshi-Light',
      color:Color.black,
     },


     subtitle_Bold:{
      fontSize: 14,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
    },
   
    subtitle_SemiBold:{
      fontSize: 14,
      fontFamily:'Satoshi-Bold',
      color:Color.black,
     },

     subtitle_Medium:{
      fontSize: 14,
      fontFamily:'Satoshi-Medium',
      color:Color.black,
     },
    
     subtitle_Regular:{
      fontSize: 14,
      fontFamily:'Satoshi-Medium',
      color:Color.white,
     },
     
     subtitle_Light:{
      fontSize: 14,
      fontFamily:'Satoshi-Light',
      color:Color.black,
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
     alignCenter: {
      alignItems: 'center',
    },

    card:{
    width:'93%',
    padding:10,
    borderWidth:1,
    borderColor:Color.gray,
    borderRadius:14,alignSelf:'center',marginTop:10,flexDirection:'row'
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
