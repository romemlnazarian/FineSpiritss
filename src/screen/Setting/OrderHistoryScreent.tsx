import {View} from 'react-native';
import React, {useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogFilter from '../../component/CatalogComponent/CatalogFilter';
import CatalogList from '../../component/CatalogComponent/CatalogList';
import {BottomSheet} from '../../component/BottomSheet';
import Filter from '../../assets/svg/Filter.svg';
import OrderHistoryLogic from '../../logic/Setting/OrderHistoryLogic';
import ShowBySetting from '../../component/SettingComponent/ShowBySetting';
import StatusSetting from '../../component/SettingComponent/StatusSetting';
import PerioudSetting from '../../component/SettingComponent/PerioudSetting';

const defaultSortData = [
  {id: '1', title: <Filter />},
  {id: '2', title: 'Status'},
  {id: '3', title: 'Perioud'},
];

export default function OrderHistoryScreent() {
  const {
    onSubnmitFilter,
    filterVisible,
    setFilterVisible,
    onAddSelected,
    onHandlerDetail,
    title,
    showById,
    statusId,
    periodId,
  } = OrderHistoryLogic();
  const {Styles} = StyleComponent();
  const sortData = useMemo(
    () => [
      {
        id: '1',
        title: 'Popular',
        description: 'Popular',
        price: '100',
        originalPrice: '100',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        title: 'Newest',
        description: 'Newest',
        price: '100',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '3',
        title: 'Price Low to High',
        description: 'Price Low to High',
        price: '100',
        originalPrice: '100',
      },
      {
        id: '4',
        title: 'Price High to Low',
        description: 'Price High to Low',
        price: '100',
        originalPrice: '100',
      },
      {
        id: '5',
        title: 'Top Rated',
        description: 'Top Rated',
        price: '100',
        originalPrice: '100',
      },
    ],
    [],
  );

  return (
    <View style={[Styles.container]}>
      <CustomHeader
        showBack={true}
        subTitle="Order History"
        description="15 Orders"
      />
      <CatalogFilter
        onHandler={e => onSubnmitFilter(e)}
        sortData={defaultSortData}
        arrow={true}
      />
      <CatalogList
        item={sortData}
        onHandlerItem={onHandlerDetail}
        orderBottom={true}
      />
      <BottomSheet
        modalVisible={filterVisible}
        height={350}
        onClose={() => setFilterVisible(false)}>
        {title === 'filter' ? (
          <ShowBySetting onCallback={onAddSelected} selectedIds={showById} />
        ) : title.toLocaleLowerCase() === 'status' ? (
          <StatusSetting onCallback={onAddSelected} selectedIds={statusId} />
        ) : (
          <PerioudSetting onCallback={onAddSelected} selectedIds={periodId} />
        )}
      </BottomSheet>
    </View>
  );
}
