import { useEffect, useState } from "react";


export default function DeleteAccountVerfyLogic() {
    const [modalVisible, setModalVisible] = useState(true);
    const [restartKey, setRestartKey] = useState<number>(0);
    const [disable, setDisable] = useState(true);
    const [count, setCount] = useState(3);

  // Start 3 → 2 → 1 countdown when the confirmation modal opens
  useEffect(() => {
    if (!modalVisible) return;
    setDisable(true);
    setCount(3);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < 1) {
          clearInterval(interval);
          setDisable(false);
          return 0; // stop at 1 (no further changes)
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [modalVisible]);

   const onSubmitConfirm = () => {
    setModalVisible(true);
   }
  const onSubmitCancel = () => {
    setModalVisible(false);
  }
 return{
    modalVisible,
    setModalVisible,
    restartKey,
    setRestartKey,
    onSubmitConfirm,
    onSubmitCancel,
    disable,
    count
 }
}