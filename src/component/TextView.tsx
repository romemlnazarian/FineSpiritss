import {Text, StyleSheet, View} from 'react-native';
import { Color } from '../utiles/color';

interface Props {
  title: string;
  style?: any;
  color?: string;
  icon?: any;
}

const TextView = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {props.icon}
      <Text style={[styles.textStyles, props.style, {color: props.color}]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    textAlign: 'center',
    color: Color.black,
  },
});
export default TextView;
