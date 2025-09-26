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


  const onSubnmitFilter = (filterTitle: string) => {
    setTitle(filterTitle);
    setFilterVisible(true);
  };

  const onAddSelected = (product: SelectedProduct, quantity: number) => {

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
    onHandlerDetail,
  };
}