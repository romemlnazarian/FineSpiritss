import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogDetailLogic from '../../logic/Catalog/CatalogDetailLogic';
import Slider from '../../component/HomeCamponent/Slider';
import Heart from '../../assets/svg/Heart.svg';
import CatalogFilter from '../../component/CatalogComponent/CatalogFilter';
import Delivery from '../../assets/svg/Delivery.svg';
import ArrwoDown from '../../assets/svg/ArrowsDown.svg';
import ProductCard from '../../component/HomeCamponent/ProductCard';
const data = [
  {
    id: '1',
    title: '25 ml',
  },
  {
    id: '2',
    title: '50 ml',
  },
  {
    id: '3',
    title: '100l',
  },
  {
    id: '4',
    title: '200 ml',
  },
  {
    id: '5',
    title: '300 ml',
  },
];
interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
}
export default function CatalogDetailScreen(route: any) {
  const {Styles} = StyleComponent();
  const {product} = CatalogDetailLogic(route);
  const productData = useMemo((): ProductItem[] => [
    {
      id: 'p1',
      title: 'Cognac Hennessy1',
      description: 'France ABV 40%',
      price: '$199.99',
      originalPrice: '$250.00',
    },
    {
      id: 'p2',
      title: 'Whiskey Jameson2',
      description: 'Ireland ABV 40%',
      price: '$49.99',
      originalPrice: '$60.00',
    },
    {
      id: 'p3',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
    {
      id: 'p4',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
    {
      id: 'p5',
      title: 'Vodka Absolut',
      description: 'Sweden ABV 40%',
      price: '$29.99',
      originalPrice: '$35.00',
    },
  ], []);



  const renderProductItem = useCallback(({item}: {item: ProductItem}) => (
    <ProductItemRenderer item={item} />
  ), []);
// Memoized product item renderer
const ProductItemRenderer = memo(({item}: {item: ProductItem}) => (
  <ProductCard item={item} cardStyle={styles.productCardContainer} />
));


  // Memoized key extractors
  const productKeyExtractor = useCallback((item: ProductItem) => item.id, []);
  return (
    <View style={[Styles.container]}>
      <ScrollView>
        <CustomHeader showBack={true} title={product?.title || ''} />
        <Slider />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: Color.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            marginTop: '5%',
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Text style={[Styles.h3_Bold]}>{product?.title}</Text>
            <TouchableOpacity>
              <Heart width={24} height={24} fill={Color.primary} />
            </TouchableOpacity>
          </View>
          <Text
            style={[Styles.title_Regular, {marginLeft: '5%', marginTop: 10}]}>
            {product?.description}
          </Text>
          <CatalogFilter
            onHandler={e => console.log(e)}
            sortData={data}
            sortItemContainerStyle={styles.sortItemContainer}
          />
          <View
            style={{
              marginLeft: '5%',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[Styles.h3_Bold]}>$47.99</Text>
            <Text
              style={[
                Styles.body_Regular,
                {marginLeft: '5%', color: Color.gray},
              ]}>
              $65.99
            </Text>
            
          </View>
          <View
            style={{
              width: '93%',
              height:50,
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius:10,
              backgroundColor:Color.background,
              justifyContent:'space-between',
            }}>
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:'5%'}}>
              <Delivery />
              <Text style={[Styles.body_Regular,{marginLeft:'5%'}]}>Delevery Sept. 7</Text>
              </View>
             <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={[Styles.title_Regular,{marginLeft:'5%'}]}>Warsaw</Text>
              <ArrwoDown />
             </TouchableOpacity>
            </View>
            <View style={{width:'93%', alignSelf:'center',marginTop: 10, height:1, backgroundColor:Color.lineGray}}/>
       
           <Text style={[Styles.h6_Medium,{marginLeft:'5%',marginTop:10,}]}>Specifications</Text>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Country:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10}]}>Germany</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Manufacturer:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10}]}>Mast-Jägermeister</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Alc By Vol:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10}]}>35%</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Gift Package:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10}]}>35%</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Raw materials:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10,width:'45%'}]}>ginger, cinnamon, star anise, and citrus peel</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[Styles.title_Regular,{marginLeft:'5%',marginTop:10,color:Color.gray}]}>Serving Temperature:</Text>
            <Text style={[Styles.title_Regular,{marginLeft:'15%',marginTop:10,width:'45%'}]}>-18°C</Text>
           </View>
        </View>
        <Text style={[Styles.h6_Medium,{marginLeft:'5%',marginTop:10}]}>
        With this also watching
        </Text>
        <FlatList
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={productKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productFlatListContainer}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        updateCellsBatchingPeriod={50}
        getItemLayout={(data, index) => ({
          length: 255,
          offset: 255 * index,
          index,
        })}
      />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  sortItemContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.primary,
  },
  productCardContainer: {
    marginRight: 8, 
    width: 240,
  },
  productFlatListContainer: {
    marginTop: '5%',
  },
});
