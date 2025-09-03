import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ViewStyle,
    TextStyle
} from "react-native";
import { Color } from "../utiles/color";
import { StyleComponent } from "../utiles/styles";
type Props = {
    dark?: boolean,
    style?: ViewStyle,
    textStyle?:TextStyle
    title:string
    onHandler:()=>void,
}

const BottomCardComponent = (props: Props) => {
   const {Styles} = StyleComponent()
    return (
        <TouchableOpacity 
        activeOpacity={0.5}
         onPress={()=>props.onHandler()}
        style={[styles.container, props.style]}>
        <Text style={[styles.text,props.textStyle,Styles.h3]}>{props.title}</Text>
        </TouchableOpacity>
    );
};
//
const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 54,
        borderRadius: 16,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:Color.primary,
        padding: 12,
        backgroundColor:Color.primary
    },
    text:{
        fontFamily:'Satoshi-Regular',
        color:Color.white,
    }
})

export default BottomCardComponent;
