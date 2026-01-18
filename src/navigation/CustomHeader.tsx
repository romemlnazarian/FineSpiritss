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
type CustomHeaderProps = {
  title?: string;
  showBack?: boolean;
  subTitle?: string;
  icon?: React.ReactNode;
  onHandler?: () => void;
  description?: string;
  onSubmitBack?: () => void;
  style?: ViewStyle;
};

export default function CustomHeader({
  title,
  showBack = false,
  icon,
  onHandler,
  subTitle,
  description,
  onSubmitBack,
  style,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const {Styles} = StyleComponent();
  return (
    <View style={[styles.header, style]}>
      {showBack && (
        <TouchableOpacity
          onPress={onSubmitBack ? onSubmitBack : () => navigation.goBack()} style={styles.arrowContainer}>
          <Arrow width={30} height={30} />
        </TouchableOpacity>
      )}
      {title && (
        <View pointerEvents="none" style={styles.titleContainer}>
          <Text
            style={[styles.title, Styles.h6_Medium]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title || ''}
          </Text>
        </View>
      )}
      {subTitle && (
        <View pointerEvents="none" style={styles.subTitleContainer}>
          <Text
            style={[styles.title, Styles.h6_Medium, Styles.textAlign]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {subTitle || ''}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onHandler} style={styles.arrowContainer}>
        <View>{icon}</View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.background,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Platform.OS === 'ios' ? 70 : 70,
    paddingHorizontal: 16,
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    color: Color.black,
  },
  titleContainer: {
    width: '80%',
  },
  subTitleContainer: {
    width: '60%',
  },
  arrowContainer: {
    width:'10%',
  },
});
