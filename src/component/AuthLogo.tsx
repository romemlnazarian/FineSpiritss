import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Color } from '../utiles/color';
interface Props {
children: any;
  style?: any;
  color?:string
  onHandler:()=>void
}


const AuthLogo = (props:Props) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.5}
        onPress={props.onHandler}
        style={[styles.container,props.style,{color:Color.white}]}>{props.children}</TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    textStyles: {
        textAlign: 'center',
    },
     container:{
        borderRadius:18,
        width:60,
        height:60
     }

});
export default AuthLogo;
