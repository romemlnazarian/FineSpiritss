import React, {FC, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  EmitterSubscription,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Color} from '../utiles/color';

export const BottomModal: FC<{
  children: React.ReactNode;
  modalVisible: boolean;
  height: number;
  onClose?: () => void;
}> = ({children, modalVisible, height, onClose}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const isKeyboardVisibleRef = useRef(false);

  const combinedTranslateY = useMemo(
    () => Animated.add(translateY, Animated.multiply(keyboardOffset, -1)),
    [keyboardOffset, translateY],
  );

  const containerStyle = useMemo(
    () => [styles.container, {height, transform: [{translateY: combinedTranslateY}]}],
    [combinedTranslateY, height],
  );

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: modalVisible ? 0 : height,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [height, modalVisible, translateY]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      isKeyboardVisibleRef.current = true;
      const h = Number(e?.endCoordinates?.height ?? 0);
      Animated.timing(keyboardOffset, {
        toValue: h,
        duration: typeof e?.duration === 'number' ? e.duration : 220,
        useNativeDriver: true,
      }).start();
    };

    const onHide = (e: any) => {
      isKeyboardVisibleRef.current = false;
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: typeof e?.duration === 'number' ? e.duration : 220,
        useNativeDriver: true,
      }).start();
    };

    const subs: EmitterSubscription[] = [
      Keyboard.addListener(showEvent, onShow),
      Keyboard.addListener(hideEvent, onHide),
    ];

    return () => subs.forEach(s => s.remove());
  }, [keyboardOffset]);

  const onBackdropPress = () => {
    if (isKeyboardVisibleRef.current) {
      Keyboard.dismiss();
      return;
    }
    onClose?.();
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      statusBarTranslucent
      animationType="slide"
      onRequestClose={() => onClose?.()}>
      <Pressable style={styles.wrapper} onPress={onBackdropPress}>
        <TouchableWithoutFeedback>
          <Animated.View style={containerStyle}>
            <View style={styles.handle} />
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#C2C2BCE5',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handle: {
    width: 60,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});


