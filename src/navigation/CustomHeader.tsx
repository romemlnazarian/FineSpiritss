// src/components/CustomHeader.js
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utiles/color';
import Arrow from '../assets/svg/Arrows.svg';
import {StyleComponent} from '../utiles/styles';
import {Language} from '../utiles/Language/i18n';

type CustomHeaderProps = {
  title?: string;
  showBack?: boolean;
  subTitle?: string;
  icon?: React.ReactNode;
  onHandler?: () => void;
  description?: string;
  onSubmitBack?: () => void;
  style?: ViewStyle;
  countProduct?: number;
};

export default function CustomHeader({
  title,
  showBack = false,
  icon,
  onHandler,
  subTitle,
  onSubmitBack,
  style,
  countProduct,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const {Styles} = StyleComponent();

  return (
    <View style={[styles.header, style]}>
      <View style={styles.sideSlot}>
        {showBack ? (
          <TouchableOpacity
            onPress={onSubmitBack ? onSubmitBack : () => navigation.goBack()}
            style={styles.iconButton}>
            <Arrow width={32} height={32} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View pointerEvents="none" style={styles.centerSlot}>
        {title ? (
          <Text
            style={[styles.centerText, Styles.body_Medium]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
        ) : null}
        {subTitle ? (
          <Text
            style={[styles.centerText, Styles.body_Medium]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {subTitle}
          </Text>
        ) : null}
        {typeof countProduct === 'number' && countProduct > 0 ? (
          <Text
            style={[styles.centerText, styles.countText, Styles.subtitle_Regular]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {countProduct} {Language.Products}
          </Text>
        ) : null}
      </View>

      <View style={styles.sideSlot}>
        {icon ? (
          <TouchableOpacity onPress={onHandler} style={styles.iconButton}>
            {icon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.background,
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 70 : 70,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  sideSlot: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  centerText: {
    color: Color.black,
    textAlign: 'center',
    width: '100%',
  },
  countText: {
    marginTop: 2,
  },
});
