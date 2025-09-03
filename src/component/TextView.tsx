import {
    Text,
    StyleSheet,
} from 'react-native';


interface Props {
  title: string;
  style?: any;
  color?:string
}


const TextView = (props:Props) => {
    return (
        <Text style={[styles.textStyles,props.style,{color:props.color}]}>{props.title}</Text>
    );
};


const styles = StyleSheet.create({
    textStyles: {
        textAlign: 'center',
    },

});
export default TextView;
