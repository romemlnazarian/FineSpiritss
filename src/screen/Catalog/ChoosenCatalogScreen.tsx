import {View} from 'react-native';
import React, {useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogFilter from '../../component/CatalogComponent/CatalogFilter';
import CatalogList from '../../component/CatalogComponent/CatalogList';
import ChoosenCatalogLogic from '../../logic/Catalog/ChoosenCatalogLogic';
import {BottomSheet} from '../../component/BottomSheet';
import Search from '../../assets/svg/SearchBlack.svg';
import ButtonSheetFilter from '../../component/CatalogComponent/buttonSheetFilter';
import CatalogTabsFilter from '../../component/CatalogComponent/CatalogTabsFilter';



export default function ChoosenCatalog(route: any) {
  const {
    onSubnmitFilter,
    filterVisible,
    setFilterVisible,
    onAddSelected,
    onHandlerDetail,
    products,
    loadMore,
    isLoadingMore,
    isInitialLoading,
    filterData,
    title,
    onHandlerFilter,
    countries,
    brands,
    volumes,
    onSearchHandler
  } = ChoosenCatalogLogic(route);
  const {Styles} = StyleComponent();
  const sortData = useMemo(
    () => [
      {
        id: '1',
        title: 'Filter',
      },
      {
        id: '2',
        title: 'Country',
      },
      {
        id: '3',
        title: 'Brand',
      },
      {
        id: '4',
        title: 'Capacity',
      },
    ],
    [],
  );

  return (
    <View style={[Styles.container]}>
      <CustomHeader
        showBack={true}
        title="All wines"
        icon={<Search />}
        onHandler={() => onSearchHandler()}
      />
      <CatalogFilter onHandler={e => onSubnmitFilter(e)} sortData={sortData}/>
      <CatalogList
        item={products}
        onAddSelected={onAddSelected}
        onHandlerItem={onHandlerDetail}
        orderBottom={true}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        isInitialLoading={isInitialLoading}
      />
      <BottomSheet
        modalVisible={filterVisible}
        height={350}
        onClose={() => setFilterVisible(false)}>
        {title === 'filter' ? (
          <ButtonSheetFilter />
        ) : (
          <CatalogTabsFilter
            title={title}
            data={filterData}
            onHandler={onHandlerFilter}
            selectedCountries={countries}
            selectedBrands={brands}
            selectedVolumes={volumes}
          />
        )}
      </BottomSheet>
    </View>
  );
}
