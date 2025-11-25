import { useEffect, useState } from "react";
import { ResendOtpModel } from "../../model/Auth/ResendOtpModel";
import { useToast } from "../../utiles/Toast/ToastProvider";
import { refreshTokenModel } from "../../model/Auth/RefreshTokenModel";
import useAuthStore from "../../zustland/AuthStore";
import { DeleteAccountVerifyModel } from "../../model/Setting/SettingModel";
 import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
 import useProfileStore from "../../zustland/ProfileStore";
import useDeleteAccountDoneStore from "../../zustland/deleteAccountDoneStore";

export default function DeleteAccountVerfyLogic(route: any) {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const {item,email} = route?.route?.params;
    const {show} = useToast();
     const {token,refreshToken, setToken, setRefreshToken, setIsLoggedIn, setUserData} = useAuthStore();
     const {resetProfile} = useProfileStore();
     const {setDeleteAccountDone} = useDeleteAccountDoneStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [restartKey, setRestartKey] = useState<boolean>(true);
    const [DisableTimer, setDisableTimer] = useState<boolean>(true);
    const [codeValid, setCodeValid] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [count, setCount] = useState<number>(3);
    const [disable, setDisable] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

   const onSubmitConfirm = () => {

    setLoading(true);
    console.log('value', value,item);
      DeleteAccountVerifyModel(
      token,
      value,
      item,
      (data) => {
         // Clear persisted app state in zustand after navigation
         try {
           setToken('');
           setRefreshToken('');
           setIsLoggedIn(false);
           setUserData(null);
           resetProfile();
         } catch (e) {
           // no-op
         }
         setLoading(false);
         setModalVisible(false);

         setDeleteAccountDone(true);
        //  show(data, {type: 'success'});
         navigation.navigate('Wellcome');

      },
      error => {
        setDisable(true);
              setModalVisible(false);
              setLoading(false);
             setError(error);
             show(error, {type: 'error'});
      },
      () => {
        refreshTokenModel(refreshToken, data => {
          setToken(data.access);
          setRefreshToken(data.refresh);
          DeleteAccountVerifyModel(
            token,
            value,
            item,
            (data) => {
              // show(data, {type: 'success'});
            },
            error => {
              setDisable(true);
              setModalVisible(false);
              setLoading(false);
              show(error, {type: 'error'});
            },
            () => {
            },
          );
        }, error => {
          setDisable(true);
          setModalVisible(false);
          setLoading(false);
          show(error, {type: 'error'});
        });
      },
    );
   }


  // Start 3 → 2 → 1 countdown when the confirmation modal opens
  useEffect(() => {
    if (!modalVisible) return;
    setDisable(true);
    setCount(3);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
      clearInterval(interval);
          setDisable(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [modalVisible]);

  const onSubmitCancel = () => {
    setModalVisible(false);
  }
  const onHandlerTimer = () => {
    if (DisableTimer) return;
    setDisableTimer(true);
    setRestartKey(true);
    console.log('email', email);
    ResendOtpModel(
      email,
      () => {
        show('Code sent again', {type: 'success'});
      },
      error => {
        refreshTokenModel(refreshToken, (data) => {
          setToken(data.access);
          setRefreshToken(data.refresh);
          ResendOtpModel(
            email,
            () => {
              show('Code sent again', {type: 'success'});
            },
            error => {
              show(String(error || 'Resend failed'), {type: 'error'});
            },
          );
        }, error => {
          show(String(error || 'Resend failed'), {type: 'error'});
        });
      },
    );
  }

const onHandler = (value: string) => {
  if (value.length === 5) {
    setValue(value);
     Keyboard.dismiss();
    setTimeout(() => {
      setModalVisible(true)
      setTitle('deleteAccount');    }, 400);
  } else {
   setCodeValid(true);
  }
}

const onSubmit = () => {
  setDisable(true);
  setCount(count + 1);
  setModalVisible(true);
}



 return{
    modalVisible,
    setModalVisible,
    restartKey,
    setRestartKey,
    onSubmitConfirm,
    onSubmitCancel,
    email,
    DisableTimer,
    setDisableTimer,
    onHandlerTimer,
    onHandler,
    codeValid,
    count,
    disable,
    onSubmit,
    title,
    loading
 }
}