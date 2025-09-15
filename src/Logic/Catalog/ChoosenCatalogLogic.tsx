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

export default function ChoosenCatalogLogic() {
  const navigation = useNavigation<CatalogScreenNavigationProp>();
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  const onSearchHandler = () => {
    navigation.navigate('CatalogSearch');
  };

  const onSubnmitFilter = (filterTitle: string) => {
    setTitle(filterTitle);
    setFilterVisible(true);
  };

  const onAddSelected = (product: SelectedProduct, quantity: number) => {
    setSelectedProduct(product);
    setSelectedQuantity(quantity);
  };

  const onHandlerDetail = (product: any) => {
    navigation.navigate('CatalogDetail', {product:product, quantity:selectedQuantity});
  };

  return {
    onSearchHandler,
    onSubnmitFilter,
    filterVisible,
    setFilterVisible,
    title,
    setTitle,
    onAddSelected,
    selectedProduct,
    selectedQuantity,
    onHandlerDetail,
  };
}