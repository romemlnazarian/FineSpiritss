import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function DeleteAccountLogic() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [otherText, setOtherText] = useState<string>('');
  
    const toggleSelect = useCallback((id: number) => {
      setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
      );
    }, []);
  
  
    const onSubmit = () => {
      console.log(selectedIds);
      console.log(otherText);
      navigation.navigate('DeleteAccountVerify');
    }
 return{
    toggleSelect,
    onSubmit,
    selectedIds,
    otherText,
    setOtherText
 }
}