import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../navigation/types';
import useDeleteAccountDoneStore from '../zustland/deleteAccountDoneStore';
import {useCallback} from 'react';
import useLocalizationStore, {
  normalizeAppLanguage,
  type AppLanguage,
} from '../zustland/localizationStore';
import {Language} from '../utiles/Language/i18n';

export function WellcomeLogic() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {deleteAccountDone, resetDeleteAccountDone, setDeleteAccountDone} =
    useDeleteAccountDoneStore();
  const language = useLocalizationStore(state => state.language);
  const setLanguage = useLocalizationStore(state => state.setLanguage);
  const currentLanguage = normalizeAppLanguage(language);

  const onSubmit = (key: string) => {
    key === 'signup'
      ? navigation.navigate('Signup')
      : navigation.navigate('Signin');
  };

  const selectLanguage = useCallback(
    (lang: AppLanguage) => {
      if (lang === currentLanguage) {
        return;
      }
      setLanguage(lang);
      Language.setLanguage(lang);
    },
    [currentLanguage, setLanguage],
  );

  const onHandlerClose = () => {
    resetDeleteAccountDone();
    setDeleteAccountDone(false);
  };

  return {
    onSubmit,
    deleteAccountDone,
    resetDeleteAccountDone,
    onHandlerClose,
    currentLanguage,
    selectLanguage,
  };
}
