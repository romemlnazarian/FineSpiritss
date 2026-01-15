import React, {FC, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleSheet, View} from 'react-native';
import {Color} from '../utiles/color';

export const BottomSheet: FC<{
  children: React.ReactNode;
  modalVisible: boolean;
  height: number;
  onClose?: () => void;
  keyboardAvoidingViewEnabled?: boolean;
}> = ({children, height, modalVisible, onClose, keyboardAvoidingViewEnabled = true}) => {
  const refRBSheet = useRef<any>(null);

  useEffect(() => {
    if (modalVisible) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [modalVisible]);

  return (
    <RBSheet
      ref={refRBSheet}
      height={height}
      closeOnPressMask={true}
      draggable={true}
      // Important: allow gestures inside content (e.g. Slider). Dragging should be from handle only.
      dragOnContent={false}
      onClose={() => {
        onClose?.();
      }}
      customStyles={{
        wrapper: {backgroundColor: '#C2C2BCE5'},
        draggableIcon: {backgroundColor: Color.white},
        container: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <View style={styles.handle} />
      {children}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  handle: {
    width: 60,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
    alignSelf: 'center',
  },
});


