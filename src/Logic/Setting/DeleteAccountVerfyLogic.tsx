import { useEffect, useRef, useState } from "react";
import { ResendOtpModel } from "../../model/Auth/ResendOtpModel";
import { useToast } from "../../utiles/Toast/ToastProvider";
import { refreshTokenModel } from "../../model/Auth/RefreshTokenModel";
import useAuthStore from "../../zustland/AuthStore";
import { DeleteAccountModel, DeleteAccountVerifyModel } from "../../model/Setting/SettingModel";
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
    const isOtpExpiredRef = useRef<boolean>(false);

    const markOtpExpired = () => {
      isOtpExpiredRef.current = true;
      setCodeValid(false);
    };

    const resetOtpExpired = () => {
      isOtpExpiredRef.current = false;
    };

    const onCountdownComplete = () => {
      setDisableTimer(false);
      setRestartKey(false);
      markOtpExpired();
    };

   const onSubmitConfirm = () => {

    setLoading(true);
    console.log('value', value,item);
      DeleteAccountVerifyModel(
      token,
      value,
      item,
      () => {
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
        refreshTokenModel(refreshToken, refreshedTokens => {
          setToken(refreshedTokens.access);
          setRefreshToken(refreshedTokens.refresh);
          DeleteAccountVerifyModel(
            refreshedTokens.access,
            value,
            item,
            () => {
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
              show(error, {type: 'error'});
            },
            () => {
            },
          );
        }, err => {
          setDisable(true);
          setModalVisible(false);
          setLoading(false);
          show(err, {type: 'error'});
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
    if (DisableTimer) {
      return;
    }
    setDisableTimer(true);
    setRestartKey(true);
    resetOtpExpired();
    setCodeValid(true);
    console.log('email', email);
    DeleteAccountModel(token, item, () => {
      setLoading(false);
      show('Code sent again', {type: 'success'});
    }, () => {
     refreshTokenModel(refreshToken, (data) => {
      setToken(data.access);
      setRefreshToken(data.refresh);
      DeleteAccountModel(token, item, () => {
        setLoading(false);
        show('Code sent again', {type: 'success'});
      }, (error) => { 
        setLoading(false);
        show(error, {type: 'error'});
      });
     }, (error) => {
      setLoading(false);
      show(error, {type: 'error'});
    });
    }
    );
  }

const onHandler = (value: string) => {
  if (isOtpExpiredRef.current) {
    setCodeValid(false);
    show('Code expired', {type: 'error'});
    return;
  }
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
    loading,
    onCountdownComplete,
 }
}