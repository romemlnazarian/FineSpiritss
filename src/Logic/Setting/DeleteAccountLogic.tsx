import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { DeleteAccountModel } from '../../model/Setting/SettingModel';
import useAuthStore from '../../zustland/AuthStore';
import { useToast } from '../../utiles/Toast/ToastProvider';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useProfileStore from '../../zustland/ProfileStore';
export default function DeleteAccountLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {token,refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {profile} = useProfileStore();
  const {show} = useToast();
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [otherText, setOtherText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const toggleSelect = useCallback(
    (item: {id: number; title: string}) => {
      setSelectedId(prev => (prev === item.id ? null : item.id));
      setSelectedTitle(selectedId === item.id ? '' : item.title);
    },
    [selectedId],
  );

  const onSubmit = () => {
    setLoading(true);
    DeleteAccountModel(token, otherText ? otherText : selectedTitle, (data) => {
      setLoading(false);
      navigation.navigate('DeleteAccountVerify', {
      item: otherText ? otherText : selectedTitle,
      email: profile.email,
    });
    }, (error) => {
     refreshTokenModel(refreshToken, (data) => {
      setToken(data.access);
      setRefreshToken(data.refresh);
      DeleteAccountModel(token, otherText ? otherText : selectedTitle, (data) => {
        setLoading(false);
        navigation.navigate('DeleteAccountVerify', {
          item: otherText ? otherText : selectedTitle,
          email: profile.email,
        });
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
  };
  return {
    toggleSelect,
    onSubmit,
    selectedId,
    selectedTitle,
    otherText,
    setOtherText,
    loading
  };
}
