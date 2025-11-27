import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../navigation/types';
import useDeleteAccountDoneStore from '../zustland/deleteAccountDoneStore';
import { useCallback } from 'react';


export  function WellcomeLogic() {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const {deleteAccountDone, resetDeleteAccountDone, setDeleteAccountDone} = useDeleteAccountDoneStore();
    const onSubmit = (key:string) =>{
         key === 'signup'?
        navigation.navigate('Signup')
        :
        navigation.navigate('Signin')
    }

    useFocusEffect(
      useCallback(() => {
        // هر بار که صفحه فوکوس شد deleteAccountDone صفر شود
        resetDeleteAccountDone();
    
        return () => {};
      }, [])
    );
  const onHandlerClose = () => {
    resetDeleteAccountDone();
  }

return{
    onSubmit,
    deleteAccountDone,
    resetDeleteAccountDone,
    onHandlerClose,
}

}