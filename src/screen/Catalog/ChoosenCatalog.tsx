import {View} from 'react-native';
import React, {useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogFilter from '../../component/CatalogComponent/CatalogFilter';
import Search from '../../assets/svg/SearchBlack.svg';
import CatalogList from '../../component/CatalogComponent/CatalogList';
import ChoosenCatalogLogic from '../../Logic/Catalog/ChoosenCatalogLogic';
import {BottomSheet} from '../../component/BottomSheet';
import ButtonSheetFilter from '../../component/CatalogComponent/buttonSheetFilter';
import CatalogTabsFilter from '../../component/CatalogComponent/CatalogTabsFilter';
import CatalogKosher from '../../component/CatalogComponent/CatalogKosher';
export default function ChoosenCatalog() {
  const {
    onSearchHandler,
    onSubnmitFilter,
    filterVisible,
    setFilterVisible,
    title,
  } = ChoosenCatalogLogic();
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
        subTitle="All wines"
        icon={<Search />}
        onHandler={onSearchHandler}
      />
      <CatalogFilter onHandler={e => onSubnmitFilter(e)} />
      <CatalogList item={sortData} />
      <BottomSheet
        modalVisible={filterVisible}
        height={350}
        onClose={() => setFilterVisible(false)}>
          <CatalogKosher onHandler={function (): void {
          throw new Error('Function not implemented.');
        } }/>
        {/* {title === 'filter' ? <ButtonSheetFilter /> : <CatalogTabsFilter title={''} name={''} number={0} />} */}
      </BottomSheet>
    </View>
  );
}
