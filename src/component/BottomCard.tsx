import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import {Color} from '../utiles/color';
import {StyleComponent} from '../utiles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  dark?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onHandler: () => void;
  icon?: ReactNode; // Added icon prop
  disabled?: boolean;
  showArrow?: boolean;
  arrowColor?: string;
  countdown?: boolean; // enable 3-2-1 countdown on press
  countdownStart?: number; // defaults to 3
  loading?: boolean;
};

const BottomCardComponent = (props: Props) => {
  const {Styles} = StyleComponent();
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState<number>(props.countdownStart ?? 3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const effectiveStart = useMemo(() => (props.countdownStart && props.countdownStart > 0 ? props.countdownStart : 3), [props.countdownStart]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  useEffect(() => {
    if (!isCounting) {
      return;
    }
    clearTimer();
    setCount(effectiveStart);
    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearTimer();
          setIsCounting(false);
          // call handler when countdown completes
          props.onHandler();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCounting, effectiveStart]);

  const isDisabled = (props.disabled === true) || isCounting;
  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.5}
      disabled={isDisabled}
      onPress={() => {
        if (isDisabled) {
          return;
        }
        if (props.countdown) {
          setIsCounting(true);
        } else {
          props.onHandler();
        }
      }}
      style={[
        styles.container,
        props.loading ? styles.containerEnabled : (isDisabled ? styles.containerDisabled : styles.containerEnabled),
        props.style,
      ]}>
      <View style={styles.contentContainer}>
        {props.loading ? (
          <ActivityIndicator color={Color.white} />
        ) : (
          <Text
            style={[
              styles.text,
              Styles.title_Regular,
              isDisabled ? styles.textDisabled : styles.textEnabled,
              props.textStyle,
            ]}>
            {props.countdown && isCounting ? String(count) : props.title}
          </Text>
        )}
        {props.icon && !isCounting ? (
          <View style={styles.iconContainer}>{props.icon}</View>
        ) : props.showArrow && !isCounting ? (
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={props.arrowColor || (isDisabled ? '#FFFFFF' : '#FFFFFF')}
            />
          </View>
        ) : null}
      </View>
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
    justifyContent: 'center',
    borderWidth: 2,
    padding: 12,
  },
  containerEnabled: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  containerDisabled: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'rgba(0,0,0,0.25)',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 5, // Adjust spacing between icon and text
  },
  text: {
    fontFamily: 'Satoshi-Regular',
  },
  textEnabled: { color: Color.white },
  textDisabled: { color: Color.white },
});

export default BottomCardComponent;
