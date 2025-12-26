import { useEffect, useState } from 'react';
import { CatalogScreenNavigationProp } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getOrderHistoryModel } from '../../model/Setting/SettingModel';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';

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
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [title, setTitle] = useState<string>('');
  const [showById, setShowById] = useState<number>(0);
  const [statusId, setStatusId] = useState<number>(0);
  const [periodId, setPeriodId] = useState<number>(0);
  const [orderHistory, setOrderHistory] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

useEffect(()=>{

  getOrderHistory();
},[]);

  const getOrderHistory = () => {
    setLoading(true);
    getOrderHistoryModel(token, (data) => {
      setOrderHistory(data.orders);
      setLoading(false);
    }, (error) => {
      setLoading(false);
      console.log(error);
    },()=>{
      refreshTokenModel(refreshToken, (data) => {
        setToken(data.access);
        setRefreshToken(data.refresh);
        getOrderHistoryModel(data.access,(data)=>{
          setOrderHistory(data.orders);
          setLoading(false);
        },()=>{},);
      }, (error) => {
        console.log(error);
        setLoading(false);
      });
    });
  }

  const onHandlerDetail = (id: number) => {
    navigation.navigate('MyOrder',{id:id});
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
    orderHistory,
    loading,
  };
}