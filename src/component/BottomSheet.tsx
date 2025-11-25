import React, { FC, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { View } from "react-native";
import { Color } from "../utiles/color";

export const BottomSheet: FC<{
  children: any;
  modalVisible: boolean;
  height: number;
  onClose?: () => void;
}> = ({ children, height, modalVisible, onClose }) => {

  const refRBSheet = useRef<RBSheet>(null);
  const shouldTriggerClose = useRef(false); // جلوگیری از دوبار صدا شدن onClose

  useEffect(() => {
    if (modalVisible) {
      shouldTriggerClose.current = true; // اجازه بده فقط یکبار onClose اجرا بشه
      refRBSheet.current?.open();
    } else {
      // ❗ اینجا فقط sheet رو ببند
      // ❗ onClose را اینجا صدا نزن
      refRBSheet.current?.close();
    }
  }, [modalVisible]);

  return (
    <RBSheet
      ref={refRBSheet}
      height={height}
      closeOnPressMask={true}
      draggable={true}
      dragOnContent={false}
      onClose={() => {
        // ❗ onClose فقط وقتی اجرا بشه که modalVisible = false بوده
        if (shouldTriggerClose.current && !modalVisible) {
          onClose?.();
        }
        shouldTriggerClose.current = false;
      }}
      customStyles={{
        wrapper: { backgroundColor: "#C2C2BCE5" },
        draggableIcon: { backgroundColor: Color.white },
        container: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <View
        style={{
          width: 60,
          height: 2,
          borderRadius: 5,
          backgroundColor: "#2C2C2C",
          alignSelf: "center",
        }}
      />
      {children}
    </RBSheet>
  );
};
