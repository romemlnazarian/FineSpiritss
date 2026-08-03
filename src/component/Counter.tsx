import React, {ReactNode, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Color} from '../utiles/color';
import {StyleComponent} from '../utiles/styles';
import Mines from '../assets/svg/mines.svg';
import Plus from '../assets/svg/plus.svg';

interface CounterProps {
  initialValue?: number;
  stylesContainer?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onValueChange?: (value: number, type: string) => void;
  dark?: boolean;
  compact?: boolean;
  label?: string;
  icon?: ReactNode;
}

const Counter = ({
  initialValue = 0,
  onValueChange,
  stylesContainer,
  textStyle,
  dark = false,
  compact = false,
  label,
  icon,
}: CounterProps) => {
  const {Styles} = StyleComponent();
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const increment = () => {
    onValueChange?.(count + 1, 'inc');
  };

  const decrement = () => {
    onValueChange?.(count - 1, 'dec');
  };

  return (
    <View
      style={[
        styles.counterContainer,
        compact && styles.counterContainerCompact,
        stylesContainer,
      ]}>
      <TouchableOpacity
        onPress={decrement}
        style={[styles.button, compact && styles.buttonCompact]}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        {dark ? (
          <Text style={[styles.darkIcon, compact && styles.darkIconCompact]}>
            −
          </Text>
        ) : (
          <Mines width={compact ? 18 : 24} height={compact ? 18 : 24} />
        )}
      </TouchableOpacity>

      <View style={[styles.center, compact && styles.centerCompact]}>
        <Text
          style={[
            Styles.title_Regular,
            styles.countText,
            compact && styles.countTextCompact,
            dark && styles.darkText,
            textStyle,
          ]}>
          {count}
        </Text>
        {label || icon ? (
          <View style={styles.labelRow}>
            {icon ? <View style={styles.icon}>{icon}</View> : null}
            {label ? (
              <Text
                style={[
                  Styles.subtitle_Regular,
                  styles.labelText,
                  dark && styles.darkText,
                ]}>
                {label}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={increment}
        style={[styles.button, compact && styles.buttonCompact]}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        {dark ? (
          <Text style={[styles.darkIcon, compact && styles.darkIconCompact]}>
            +
          </Text>
        ) : (
          <Plus width={compact ? 18 : 24} height={compact ? 18 : 24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  counterContainerCompact: {
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 12,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCompact: {
    paddingHorizontal: 4,
    minWidth: 28,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
  },
  centerCompact: {
    minWidth: 24,
    flexShrink: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: -2,
  },
  icon: {
    marginRight: 2,
  },
  countText: {
    color: Color.black,
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  countTextCompact: {
    fontSize: 15,
    marginHorizontal: 2,
  },
  labelText: {
    color: Color.black,
    textAlign: 'center',
    fontSize: 13,
  },
  darkText: {
    color: Color.white,
  },
  darkIcon: {
    color: Color.white,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
  darkIconCompact: {
    fontSize: 20,
    lineHeight: 22,
  },
});

export default Counter;
