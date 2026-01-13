import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import OrderHistoryLogic from '../../logic/Setting/OrderHistoryLogic';
import {Color} from '../../utiles/color';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Vector from '../../assets/svg/Vector.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import { useNavigation } from '@react-navigation/native';
const toDateOnly = (value: unknown): string => {
  if (value == null) {
    return '';
  }
  const s = String(value).trim();
  if (!s) {
    return '';
  }
  // Handles: "2025-12-23T10:20:30Z" or "2025-12-23 10:20:30"
  return s.split('T')[0].split(' ')[0];
};

export default function OrderHistoryScreent() {
  const {
    onHandlerDetail,
    orderHistory,
    loading,
    recommended,
    refreshAll,
  } = OrderHistoryLogic();
  const {Styles, Height} = StyleComponent();
  const navigation = useNavigation<any>();

  return (
    <View style={[Styles.container]}>
      <CustomHeader showBack={true} title="Order History" />
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Color.primary}
            style={{marginTop: Height / 2.5}}
          />
        ) : orderHistory.length === 0 ? (
          <View
            style={[
              Styles.container,
            ]}>
      
            <View style={[Styles.alignCenter,Styles.alignSelf,{width:'93%',marginTop:'12%'}]}>
            <Vector fill={Color.black} />
            <Text style={[Styles.h5_Bold,{marginTop:'5%'}]}>You don’t have any orders yet!</Text>
            <Text style={[Styles.body_Regular,Styles.textAlign,{width:'58%'}]}>Once you place an order
            it will appear here</Text>
           </View>
           <View style={[Styles.alignSelf,{width:'93%',marginTop:'10%'}]}>

          
             <HorizontalFlatList
              callback={e =>

                navigation.navigate('CatalogScreen', {

                  screen: 'CatalogDetail',

                  params: {product: e, fromSetting: true},

                })

              }

              products={recommended}

              onFavoriteToggled={(_id: string, _isFavorite: boolean) =>

                refreshAll()

              }

            />
             </View>
          </View>
        ) : (
          orderHistory.map((item: any) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={item.order_number}
              style={[Styles.card, Styles.justifyBetween, styles.cardItem]}
              onPress={() => onHandlerDetail(item.order_number)}>
              <View style={styles.columnGap}>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    Date:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {toDateOnly(item.date)}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    Status:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {item.status}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    Total price:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {item.total} zł
                  </Text>
                </View>
              </View>
              <Arrow
                name="keyboard-arrow-right"
                size={30}
                color={Color.black}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {/* <CatalogFilter
        onHandler={e => onSubnmitFilter(e)}
        sortData={defaultSortData}
        arrow={true}
      />
      <CatalogList
        item={sortData}
        onHandlerItem={onHandlerDetail}
        orderBottom={true}
      /> */}
      {/* <BottomSheet
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
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {marginBottom: 10},
  columnGap: {flexDirection: 'column' as const, gap: 10},
  rowGap: {flexDirection: 'row' as const, gap: 10},
});
