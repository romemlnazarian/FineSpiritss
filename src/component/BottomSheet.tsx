import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  EmitterSubscription,
  Keyboard,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type {NavigationProp} from '@react-navigation/native';
// import CloseIcon from 'react-native-vector-icons/AntDesign';
import {Color} from '../utiles/color';

export function useBottomSheetBackHandler(
  visible: boolean,
  onClose: () => void,
  navigation?: NavigationProp<any>,
) {
  const handleBack = useCallback(() => {
    if (visible) {
      onClose();
      return;
    }
    navigation?.goBack();
  }, [navigation, onClose, visible]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const onHardwareBackPress = () => {
      onClose();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress,
    );
    return () => subscription.remove();
  }, [onClose, visible]);

  useEffect(() => {
    if (!navigation) {
      return undefined;
    }

    const unsubscribe = navigation.addListener(
      'beforeRemove',
      (e: {preventDefault: () => void}) => {
        if (!visible) {
          return;
        }
        e.preventDefault();
        onClose();
      },
    );
    return unsubscribe;
  }, [navigation, onClose, visible]);

  return handleBack;
}

export const BottomSheet: FC<{
  children: React.ReactNode;
  modalVisible: boolean;
  height: number;
  onClose?: () => void;
  keyboardAvoidingViewEnabled?: boolean;
  // showCloseButton?: boolean;
}> = ({
  children,
  height,
  modalVisible,
  onClose,
  keyboardAvoidingViewEnabled = true,
  // showCloseButton = true,
}) => {
  const [isRendered, setIsRendered] = useState(modalVisible);
  const translateY = useRef(new Animated.Value(height)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const isKeyboardVisibleRef = useRef(false);

  const combinedTranslateY = useMemo(() => {
    const base = Animated.add(translateY, dragY);
    return keyboardAvoidingViewEnabled
      ? Animated.add(base, Animated.multiply(keyboardOffset, -1))
      : base;
  }, [dragY, keyboardAvoidingViewEnabled, keyboardOffset, translateY]);

  const containerStyle = useMemo(
    () => [styles.container, {height, transform: [{translateY: combinedTranslateY}]}],
    [combinedTranslateY, height],
  );

  const animateTo = (toValue: number, cb?: () => void) => {
    Animated.timing(translateY, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        cb?.();
      }
    });
  };

  useEffect(() => {
    if (modalVisible) {
      setIsRendered(true);
      dragY.setValue(0);
      animateTo(0);
      return;
    }
    // close animation, then unmount Modal
    dragY.setValue(0);
    animateTo(height, () => setIsRendered(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible, height]);

  useEffect(() => {
    if (!keyboardAvoidingViewEnabled) {
      return () => {};
    }
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
  }, [keyboardAvoidingViewEnabled, keyboardOffset]);

  const closeSheet = useCallback(() => {
    if (isKeyboardVisibleRef.current) {
      Keyboard.dismiss();
      return;
    }
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!modalVisible) {
      return undefined;
    }

    const onBackPress = () => {
      closeSheet();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, [closeSheet, modalVisible]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, gesture) => Math.abs(gesture.dy) > 3,
        onPanResponderMove: (_evt, gesture) => {
          // allow only dragging down
          const next = Math.max(0, gesture.dy);
          dragY.setValue(next);
        },
        onPanResponderRelease: (_evt, gesture) => {
          const shouldClose = gesture.dy > height * 0.25 || gesture.vy > 1.2;
          if (shouldClose) {
            dragY.setValue(0);
            closeSheet();
            return;
          }
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
            speed: 20,
            bounciness: 0,
          }).start();
        },
      }),
    [closeSheet, dragY, height],
  );

  if (!isRendered) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={isRendered}
      statusBarTranslucent
      animationType="none"
      onRequestClose={closeSheet}
      >
      <GestureHandlerRootView style={styles.wrapper}>
        <Pressable style={styles.backdrop} onPress={closeSheet} />
        <TouchableWithoutFeedback>
          <Animated.View style={containerStyle}>
            <View style={styles.headerRow}>
              <View
                style={styles.handleHitArea}
                {...panResponder.panHandlers}>
                <View style={styles.handle} />
              </View>
              {/* {showCloseButton ? (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeSheet}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  accessibilityRole="button"
                  accessibilityLabel="Close">
                  <CloseIcon name="close" size={20} color={Color.black} />
                </TouchableOpacity>
              ) : null} */}
            </View>
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#C2C2BCE5',
  },
  container: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    minHeight: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  handleHitArea: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  // closeButton: {
  //   position: 'absolute',
  //   right: 12,
  //   top: 8,
  //   width: 32,
  //   height: 32,
  //   borderRadius: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: Color.background,
  // },
  handle: {
    width: 60,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
  },
});
