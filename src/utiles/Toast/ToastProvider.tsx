import React, {createContext, useCallback, useContext, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {Color} from '../color';

type ToastType = 'success' | 'error' | 'info';

type ToastOptions = {
  type?: ToastType;
  durationMs?: number;
};

type ToastContextValue = {
  show: (message: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<ToastType>('info');
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -80,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const show = useCallback(
    (msg: string, options?: ToastOptions) => {
      const durationMs = options?.durationMs ?? 2500;
      setMessage(msg);
      setType(options?.type ?? 'info');
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        hideTimeout.current = setTimeout(hide, durationMs);
      });
    },
    [hide, opacity, translateY],
  );

  const bg = type === 'success' ? Color.primary : type === 'error' ? '#E11D48' : '#111827';

  return (
    <ToastContext.Provider value={{show}}>
      <View style={styles.container} pointerEvents="box-none">
        {children}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            {backgroundColor: bg, transform: [{translateY}], opacity},
          ]}>
          <Text style={styles.text} numberOfLines={2}>
            {message}
          </Text>
        </Animated.View>
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};

const styles = StyleSheet.create({
  container: {flex: 1},
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: '5%',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
});

export default ToastProvider;


