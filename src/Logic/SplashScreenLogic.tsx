import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Language } from '../utiles/Language/i18n';
import useLocalizationStore from '../zustland/localizationStore';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuthStore from '../zustland/AuthStore';
import { useToast } from '../utiles/Toast/ToastProvider';


export default function SplashScreenLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {language} = useLocalizationStore();
  const { isLoggedIn, token } = useAuthStore();
  useToast(); // keep hook initialized if needed elsewhere

    useEffect(()=>{
       Language.setLanguage(language);
       if (isLoggedIn) {
         navigation.navigate('AppTabs');
       } else {
         const timer = setTimeout(() => {
           navigation.navigate('Wellcome');
         }, 500);
         return () => clearTimeout(timer);
       }
       return;
   },[language, navigation, isLoggedIn, token]);

}
