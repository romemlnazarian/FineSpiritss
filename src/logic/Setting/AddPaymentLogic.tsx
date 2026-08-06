import { useState } from "react";

export default function AddPaymentLogic() {
    const [modalVisible, setModalVisible] = useState(false);
    const onSubmitAddPayment = () => {
        setModalVisible(()=>false);
    }

 return{modalVisible,onSubmitAddPayment}
}