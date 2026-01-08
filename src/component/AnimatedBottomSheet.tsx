import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../utiles/color';

type Props = {
  children: React.ReactNode;
  modalVisible: boolean;
  height: number;
  onClose?: () => void;
  containerStyle?: ViewStyle;
};

export const AnimatedBottomSheet: FC<Props> = ({
  children,
  modalVisible,
  height,
  onClose,
  containerStyle,
}) => {
  const [mounted, setMounted] = useState(modalVisible);
  const translateY = useRef(new Animated.Value(height)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  const open = () => {
    setMounted(true);
    Animated.parallel([
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const close = () => {
    Animated.parallel([
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setMounted(false);
        onClose?.();
      }
    });
  };

  useEffect(() => {
    if (modalVisible) {
      open();
    } else if (mounted) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  const sheetStyle = useMemo(
    () => [
      styles.sheet,
      {height},
      containerStyle,
      {transform: [{translateY}]},
    ],
    [containerStyle, height, translateY],
  );

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={close}>
      <Pressable style={styles.wrapper} onPress={close}>
        <Animated.View style={[styles.backdrop, {opacity: backdrop}]} />
      </Pressable>
      <Animated.View style={sheetStyle}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#C2C2BCE5',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  handle: {
    width: 60,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
    alignSelf: 'center',
    marginBottom: 8,
  },
});


