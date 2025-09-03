import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Language } from '../utiles/Language/i18n';
import useLocalizationStore from '../zustland/localizationStore';
import { AuthScreenNavigationProp } from '../navigation/types';


export default function SplashScreenLogic() {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const {language} = useLocalizationStore();

    useEffect(()=>{
       // Directly call the localization function
       Language.setLanguage(language);
       const timer = setTimeout(() => {
           navigation.navigate('Wellcome');
       }, 2000); // Navigate after 2 seconds
       return () => clearTimeout(timer);
    },[language, navigation]);

}