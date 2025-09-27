import { useState } from 'react';
import { CatalogScreenNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

export interface SelectedProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
}

export default function OrderHistoryLogic() {
  const navigation = useNavigation<CatalogScreenNavigationProp>();
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [showById, setShowById] = useState<number>(0);
  const [statusId, setStatusId] = useState<number>(0);
  const [periodId, setPeriodId] = useState<number>(0);


  const onSubnmitFilter = (filterTitle: string) => {
    setTitle(filterTitle);
    setFilterVisible(true);
  };

  const onAddSelected = (valueTitle: string, id: number) => {
    setFilterVisible((prev)=>!prev);
    console.log( title,id);
    if (title === 'filter') {
      setShowById(id);
    } else if (title.toLocaleLowerCase() === 'status') {
      setStatusId(id);
    } else if (title.toLocaleLowerCase() === 'perioud') {
      setPeriodId(id);
    }
  };

  const onHandlerDetail = (product: any) => {
    // navigation.navigate('CatalogDetail', {product:product, quantity:selectedQuantity});
  };

  return {
    onSubnmitFilter,
    filterVisible,
    setFilterVisible,
    title,
    setTitle,
    onAddSelected,
    showById,
    statusId,
    periodId,
    onHandlerDetail,
  };
}