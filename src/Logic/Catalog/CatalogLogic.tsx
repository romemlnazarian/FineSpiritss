import { useNavigation } from '@react-navigation/native'
import { CatalogScreenNavigationProp } from '../../navigation/types'
export default function CatalogLogic() {
const navigation = useNavigation<CatalogScreenNavigationProp>()

const unSubmit = () => {
  console.warn('unSubmit')
    navigation.navigate('ChoosenCatalog')
}
  return {
    unSubmit,
  }
}