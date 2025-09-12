import { useState } from 'react'
import { CatalogScreenNavigationProp } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native'

export default function ChoosenCatalogLogic() {
  const navigation = useNavigation<CatalogScreenNavigationProp>()
   const [filterVisible,setFilterVisible] = useState<boolean>(false)
  const [title,setTitle] = useState<string>('')
  const onSearchHandler = () => {
    navigation.navigate('CatalogSearch')
  }

 const onSubnmitFilter = (title: string) => {
     setTitle(title)
    setFilterVisible(true)
 }

  return{onSearchHandler,onSubnmitFilter,filterVisible,setFilterVisible,title,setTitle}
}