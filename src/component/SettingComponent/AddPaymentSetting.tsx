import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
export default function AddPaymentSetting({
  logo,
  title,
  check,
  onPress,
  style,
}: {
  logo: React.ReactNode;
  title: string;
  check: boolean;
  onPress: (check: boolean) => void;
  style?: StyleProp<ViewStyle>;
}) {
  const {Styles} = StyleComponent();
  return (
    <TouchableOpacity style={styles.row}
    activeOpacity={0.5}
    onPress={()=>onPress(check)}
    >
      <View style={[styles.logoBox,style]}>
        {check ? logo : <Icon name="plus" size={20} color={Color.black} />}
      </View>
      <Text style={Styles.title_Medium}>{title}</Text>
      {check ? (
        <View style={styles.checkBadge}>
          <Icon name="check" size={18} color={Color.white} />
        </View>
      ) : (
        <Arrow
          name="arrow-forward-ios"
          size={20}
          color={Color.black}
          style={styles.iconRight10}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    marginLeft: '2%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: '5%',
  },
  logoBox: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  iconRight10: {
    position: 'absolute',
    right: 10,
  },
});
