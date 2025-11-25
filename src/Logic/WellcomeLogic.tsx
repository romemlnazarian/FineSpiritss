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
        // وقتی صفحه باز شد اگر deleteAccountDone = true بود، باید BottomSheet نمایش داده شود
        return () => {
          // وقتی صفحه unfocus شد مقدار پاک می‌شود
          resetDeleteAccountDone();
        };
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