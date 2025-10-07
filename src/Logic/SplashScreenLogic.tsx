import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Language } from '../utiles/Language/i18n';
import useLocalizationStore from '../zustland/localizationStore';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function SplashScreenLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {language} = useLocalizationStore();

    useEffect(()=>{
       // Directly call the localization function
       Language.setLanguage(language);
       const timer = setTimeout(() => {
        // navigation.navigate('AppTabs')
        navigation.navigate('Wellcome')
        
       }, 2000);
       return () => clearTimeout(timer);
    },[language, navigation]);

}