import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useProfileStore from '../../zustland/ProfileStore';
import {useToast} from '../../utiles/Toast/ToastProvider';
import {
  ChangeEmailModel,
  UpdateBirthdateModel,
} from '../../model/Setting/SettingModel';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
export default function SettingItemLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const {profile, setProfile} = useProfileStore();
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {show} = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [dataProfile, setDataProfile] = useState<{
    first_name: string;
    email: string;
    birthdate: string;
    full_name: string;
  }>({
    first_name: '',
    email: '',
    birthdate: '',
    full_name: '',
  });
  useEffect(() => {
    console.log('profile =>', profile);

    setDataProfile({
      first_name: profile?.first_name ?? '',
      email: profile?.email ?? '',
      birthdate: profile?.birthdate ?? '',
      full_name: profile?.full_name ?? '',
    });
  }, [profile]);

  const checkEmail = (email: string) => {
    setEmail(email);
    setModalVisible(false);
    ChangeEmailModel(
      token,
      email.toLocaleLowerCase(),
      data => {
        setModalVisible(true);
        setName('emailVerify');
      },
      () => {
        refreshTokenModel(
          refreshToken,
          data => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            ChangeEmailModel(
              token,
              email.toLocaleLowerCase(),
              data => {
                setModalVisible(true);
                setName('emailVerify');
              },
              error => {
                show(error, {type: 'error'});
              },
            );
          },
          error => {
            show(error, {type: 'error'});
          },
        );
      },
    );
  };

  const onSubmit = (key: string) => {
    switch (key) {
      case 'fullName':
        setModalVisible(true);
        setName('fullName');
        break;
      case 'emailAddress':
        setModalVisible(true);
        setName('emailAddress');
        break;
      case 'emailVerify':
        setModalVisible(true);
        setName('emailAddress');
        break;
      case 'changePassword':
        setModalVisible(true);
        setName('changePassword');
        break;
      case 'congratulationsEmail':
        setModalVisible(true);
        setName('congratulationsEmail');
        break;
      case 'congratulationsPassword':
        setModalVisible(true);
        setName('congratulationsPassword');
        break;
      case 'birthDate':
        setOpen(true);
        break;
    }
  };

  const onSubmitDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const result = `${year}-${month}-${day}`;
    // Age validation (must be 18+)
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const hasNotHadBirthdayThisYear =
      today.getMonth() < d.getMonth() ||
      (today.getMonth() === d.getMonth() && today.getDate() < d.getDate());
    if (hasNotHadBirthdayThisYear) {
      age -= 1;
    }
    if (age < 18) {
      show('Age must be 18 or above', {type: 'error'});
      return;
    }

    UpdateBirthdateModel(
      token,
      result,
      data => {
        setProfile({...profile, birthdate: data.new_birthdate});
        show(data?.detail, {type: 'success'});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          data => {
            setToken(data.access);
            setRefreshToken(data.refresh);
            UpdateBirthdateModel(
              token,
              result,
              data => {
                setProfile({...profile, birthdate: data.new_birthdate});
                show(data?.detail, {type: 'success'});
              },
              error => {},
            );
          },
          error => {},
        );
      },
    );
  };

  const callBackEmailVerify = () => {
    setModalVisible(false);
    onSubmit('congratulationsEmail');
  };
  const callBackChangePassword = () => {
    setModalVisible(false);
    onSubmit('congratulationsPassword');
  };
  return {
    modalVisible,
    setModalVisible,
    checkEmail,
    onSubmit,
    onSubmitDeleteAccount,
    name,
    dataProfile,
    date,
    setDate,
    open,
    setOpen,
    formatDate,
    email,
    callBackEmailVerify,
    callBackChangePassword,
  };
}
