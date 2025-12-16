import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Language } from '../utiles/Language/i18n';
import useLocalizationStore from '../zustland/localizationStore';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuthStore from '../zustland/AuthStore';
import {Linking} from 'react-native';


export default function SplashScreenLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {language} = useLocalizationStore();
  const { isLoggedIn, token } = useAuthStore();

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



   useEffect(() => {
     Linking.addEventListener('url', ({url}) => {
       handleGoogleRedirect(url);
     });
   
     Linking.getInitialURL().then(url => {
       if (url) handleGoogleRedirect(url);
     });
   }, []);
   
   function handleGoogleRedirect(url: string) {
     const [, queryString] = url.split('?');
     const params = Object.fromEntries(new URLSearchParams(queryString));
      console.log('==>', url);
     if (params.code) {
     }
   }
   

}
