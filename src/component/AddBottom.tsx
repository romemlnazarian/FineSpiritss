import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  StyleProp,
} from 'react-native';
import {Color} from '../utiles/color';
import Counter from './Counter';

type Props = {
  dark?: boolean;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  count?: number;
  stylesContainer?: StyleProp<ViewStyle>;
  onQuantityChange?: (value: number, type: string) => void;
  label?: string;
  icon?: ReactNode;
};

const AddBottom = (props: Props) => {
  const isDark = props.dark === true;
  const isCompact = props.compact === true;

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
        isCompact && styles.containerCompact,
        props.style,
      ]}>
      <View
        style={[
          styles.contentContainer,
          isCompact && styles.contentContainerCompact,
        ]}>
        <Counter
          initialValue={props.count}
          onValueChange={props.onQuantityChange}
          stylesContainer={props.stylesContainer ?? {}}
          dark={isDark}
          compact={isCompact}
          label={props.label}
          icon={props.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 54,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCompact: {
    width: 112,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 4,
  },
  containerLight: {
    borderWidth: 2,
    borderColor: Color.primary,
    backgroundColor: Color.white,
  },
  containerDark: {
    borderWidth: 0,
    backgroundColor: Color.primary,
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  contentContainerCompact: {
    paddingHorizontal: 0,
  },
});

export default AddBottom;
