import {StyleSheet, Text, View} from 'react-native';
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
import ActiveFiltersChips from '../../component/CatalogComponent/ActiveFiltersChips';
import {Language} from '../../utiles/Language/i18n';


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
    onSearchHandler,
    titleHeader,
    onRemoveActiveFilter,
    priceMinBound,
    priceMaxBound,
    selectedMinPrice,
    selectedMaxPrice,
    onPriceChange,
    countProduct,
  } = ChoosenCatalogLogic(route);
  const {Styles} = StyleComponent();

  const sortData = useMemo(
    () => [
      {
        id: '1',
        title: Language.filter_price,
      },
      {
        id: '2',
        key: 'country',
        title: Language.filter_country,
      },
      {
        id: '3',
        key: 'brand',
        title: Language.filter_brand,
      },
      {
        id: '4',
        key: 'capacity',
        title: Language.filter_capacity,
      },
    ],
    [],
  );
  return (
    <View style={[Styles.container]}>
      <CustomHeader
        showBack={true}
        subTitle={titleHeader}
        icon={<Search />}
        onHandler={() => onSearchHandler()}
      />
      {countProduct > 0 && (
        <View style={styles.countContainer}>
          <Text style={[Styles.title_Regular]}>
            {countProduct} {Language.Products}
          </Text>
        </View>
      )}
      <CatalogFilter onHandler={e => onSubnmitFilter(e)} sortData={sortData}/>

      <ActiveFiltersChips
        countries={countries}
        brands={brands}
        volumes={volumes}
        minPrice={selectedMinPrice}
        maxPrice={selectedMaxPrice}
        minPriceBound={priceMinBound}
        maxPriceBound={priceMaxBound}
        onRemove={onRemoveActiveFilter}
      />
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
        height={400}
        onClose={() => setFilterVisible(false)}>
        {title === 'filter' ? (
          <ButtonSheetFilter
            minPrice={priceMinBound}
            maxPrice={priceMaxBound}
            currentMinPrice={selectedMinPrice}
            currentMaxPrice={selectedMaxPrice}
            onPriceChange={onPriceChange}
          />
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

const styles = StyleSheet.create({
  countContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
