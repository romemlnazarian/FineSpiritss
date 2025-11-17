import React, { FC, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { View } from "react-native";
import { Color } from "../utiles/color";



export const BottomSheet: FC<{
  children: any;
  modalVisible: boolean;
  hasBack?: boolean;
  height: number;
  drog?: boolean;
  DarkMode?: string;
  onClose?: () => void;
}> = ({ children, height, modalVisible, onClose }) => {

  const refRBSheet = useRef<RBSheet>(null);

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
      dragOnContent={false}
      onClose={() => onClose?.()}
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


